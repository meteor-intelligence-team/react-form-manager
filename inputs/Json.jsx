import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import ValidationError from '../ValidationError';
import autobind from 'react-autobind';

export default class Json extends React.Component {
    constructor(props, context) {
        super(props, context);
        autobind( this );

        const myOptions = [...this.props.options];
        const alreadyAdded = [];
        const list = myOptions.map(item => {
            item.value = (props.value[item.name]) ? props.value[item.name] : '';
            alreadyAdded.push(item.name);

            return item;
        });

        Object.keys(this.props.value).map(name => {
            if (!~alreadyAdded.indexOf(name)) {
                const element = {
                    name,
                    value: this.props.value[name]
                };

                list.push(element);
            }
        });

        this.state = {
            value: props.value || '',
            error: false,
            errorMsg: '',
            newVarName: '',
            list
        }
    }

    validate() {
        const {
            name,
            required, requiredMsg
        } = this.props;
        const value = this.state.list;

        // Normalize value
        if (value.length === 0 && required === true) return new ValidationError(this, name, requiredMsg || "Almost one value must be insert");
        if (value !== null && typeof value === 'object') {
            let errorMsg = '';

            const values = Object.values( value );

            values.forEach( propertyOpts => {
                if ( propertyOpts.required === true && ( propertyOpts.value === undefined || propertyOpts.value === "") ) {
                    errorMsg += propertyOpts.name + " must have value. ";
                }
                if (propertyOpts.regexp && !propertyOpts.regexp.test( propertyOpts.value ) ) {
                    errorMsg += `${propertyOpts.regexpMsg || "Invalid Regexp"} on properties ${propertyOpts.name} `;
                }
            } );

            if (errorMsg !== '') return new ValidationError(this, name, requiredMsg || errorMsg);
        }

        return true;
    }

    handleNewVarNameChange( event, newVarName ){
        this.setState({ newVarName });
    }

    handleAddEnvVar( event ){
        event.stopPropagation();
        event.preventDefault();

        const list = [...this.state.list, {
            value 	: "",
            name 	: this.state.newVarName,
        }];

        this.setState({ list, newVarName: "" });
    }

    handleEnvVarChange( index ){
        return ( ( event, value ) => {
            const list = [...this.state.list];

            // store into object
            list[ index ].value = value;

            // convert as Json
            let json = {};
            list.forEach((item) => {
                json[item.name] = item.value;
            });

            this.setState({ list, value: json });
        });
    }

    handleRemoveVar( index ){
        return ( () => {
            const list = [...this.state.list].filter( ( a, thisIndex ) => thisIndex !== index );

            // convert as Json
            let json = {};
            list.forEach((item) => {
                json[item.name] = item.value;
            });

            this.setState({ list, value: json });
        });
    }

    isRequired( name ) {
        const list = this.state.list;

        if (list !== null && typeof list === 'object') {
            for(let index in list) {
                if (name === list[index].name && list[index].required) return true;
            }

            return false;
        }

        return false;
    }

    render() {
        const { material, locked } = this.props;

        if (material) {
            const list = this.state.list;

            return (<table style={{width:'100%'}}><tbody>
                        {list.map(({name, value, placeholder, readOnly}, index) =>
                            <tr key={index}>
                                <td style={{width:'100%'}}>

                                    <TextField
                                        floatingLabelText={name}
                                        value={ (value) ? value : '' }
                                        hintText={placeholder}
                                        fullWidth
                                        disabled={readOnly}
                                        onChange={this.handleEnvVarChange( index )}
                                    />
                                </td>
                                {(locked || readOnly) ? null :
                                    <td>
                                        <FlatButton
                                            secondary
                                            onClick={this.handleRemoveVar( index )}
                                            icon={<Cancel />}
                                            disabled={this.isRequired(name)}
                                        />
                                    </td>
                                }
                            </tr>
                        )}
                        {locked ? null :
                            <tr>
                                <td>
                                    <TextField
                                        floatingLabelText={"Variable name"}
                                        value={this.state.newVarName}
                                        onChange={this.handleNewVarNameChange}
                                        hintText={"MY_VAR_NAME"}
                                        fullWidth
                                    />
                                </td>
                                    <td>
                                        <FlatButton
                                            primary
                                            icon={<AddIcon />}
                                            onClick={this.handleAddEnvVar}
                                            disabled={!this.state.newVarName}
                                        />
                                    </td>
                            </tr>
                        }
                </tbody></table>
            );
        }

        // @TODO SEMANTIC VERSION
        return <div>TODO... json input isn't ready to use in semantic-ui. Please code me !</div>;
    }
}
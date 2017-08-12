import React from 'react';
import { Grid } from 'semantic-ui-react';
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

        const list = this.props.options.map(item => {
            if (props.value) item.value = props.value[item.name];

            return item;
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
            required, requiredMsg,
        } = this.props;
        const value = this.state.list;

        // Normalize valuee
        if (value.length === 0 && required === true) return new ValidationError(this, name, requiredMsg || "Almost one value must be insert");
        if (value !== null && typeof value === 'object') {
            let errorMsg = '';

            const values = Object.values( value );

            values.forEach( propertyOpts => {
                if ( propertyOpts.required === true && ( propertyOpts.value === undefined || propertyOpts.value === "") ) {
                    errorMsg = errorMsg + propertyOpts.name + " must have value. ";
                }

                const testRes = !propertyOpts.regexp.test( propertyOpts.value );

                if (propertyOpts.regexp && testRes ) {
                    console.log("______");
                    errorMsg = errorMsg + `${propertyOpts.regexpMsg || "Invalid Regexp"} on properties ${propertyOpts.name} `;
                }

                console.log(testRes);

                // Because fuck you, it's needed. Otherwise, the .test return false one time out of of 2 after a first truthy test
                propertyOpts.regexp.test( propertyOpts.value );
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
            value 		: "",
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

            this.setState({ list });
            this.setState({ value: json });
        });
    }

    handleRemoveVar( index ){
        return ( ( event ) => {
            const list = [...this.state.list].filter( ( a, thisIndex ) => thisIndex !== index );

            this.setState({ list });
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

            return (<div>
                {list.map(({name, value, placeholder}, index) =>
                    <Grid
                        verticalAlign="middle"
                        columns={16}
                        key={index}
                    >
                        <Grid.Column width={15}>
                            <TextField
                                floatingLabelText={name}
                                value={ (value) ? value : (this.props.value !== undefined) ? this.props.value[name] : '' }
                                hintText={placeholder}
                                fullWidth
                                onChange={this.handleEnvVarChange( index )}
                            />
                        </Grid.Column>
                        {locked ? null :
                            <Grid.Column width={1}>
                                <FlatButton
                                    secondary
                                    onClick={this.handleRemoveVar( index )}
                                    icon={<Cancel />}
                                    disabled={this.isRequired(name)}
                                />
                            </Grid.Column>
                        }
                    </Grid>
                )}
                {locked ? null :
                    <Grid
                        verticalAlign="middle"
                        columns={16}
                    >
                        <Grid.Column width={15}>
                            <TextField
                                floatingLabelText={"Variable name"}
                                value={this.state.newVarName}
                                onChange={this.handleNewVarNameChange}
                                hintText={"MY_VAR_NAME"}
                                fullWidth
                            />
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <FlatButton
                                primary
                                icon={<AddIcon />}
                                onClick={this.handleAddEnvVar}
                                disabled={!this.state.newVarName}
                            />
                        </Grid.Column>
                    </Grid>
                }
                </div>
            );
        }

        // @TODO SEMANTIC VERSION
        return <div>TODO... json input isn't ready to use in semantic-ui. Please code me !</div>;
    }
}
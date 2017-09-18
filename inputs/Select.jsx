import React from 'react';
import ValidationError from '../ValidationError';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Form } from 'semantic-ui-react';

export default class Select extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value || undefined,
            error: false,
            errorMsg: '',
            results: [],
        }
    }

    validate() {
        const { required, requiredMsg, label } = this.props;
        const value = this.state.value;

        // Normalize value
        if ((value === "" || value === undefined || value === null) && required) return new ValidationError(this, label, requiredMsg || "Value is required");

        return true;
    }

    componentDidMount(){
        if ( typeof this.props.options === 'function' ) this.props.options( "", results => this.setState({ results }) );
    }

    _onChange(event, data, valueMaterial) {
        if ( typeof this.props.options === 'function' )
            this.props.options( ( this.props.material ? valueMaterial : data.value ), results => this.setState({ results }) );

        if ( this.props.material ){
            this.setState({value: valueMaterial});
        } else {
            this.setState({value: data.value});
        }
    }

    menuItems(options) {
        if ( typeof this.props.options === 'function' )
            return ( this.state.results.map( value => (
                <MenuItem
                    key={value.value}
                    insetChildren={true}
                    value={value.value}
                    primaryText={value.text}
                />
            ) ) );

        return options.map((value) => (
            <MenuItem
                key={value.value}
                insetChildren={true}
                value={value.value}
                primaryText={value.text}
            />
        ));
    }

    render() {
        const myValue = this.props.multiple ? this.state.value ? this.state.value : [] : this.state.value;
        const { material, ...other } = this.props;

        if (material) {
            const { options, search, material, ...other } = this.props;

            const nullable = (!this.props.required) ? <MenuItem value={null} primaryText="" /> : '';

            return (
                <SelectField {...other}
                    errorText={this.state.errorMsg}
                    floatingLabelText={this.props.label}
                    value={myValue}
                    onChange={this._onChange.bind(this)}
                    required={this.props.required}
                >
                    {nullable}
                    {this.menuItems( this.props.options )}
                </SelectField>
            );
        }
        return (
                <Form.Dropdown {...other} error={this.state.error} value={myValue} onChange={this._onChange.bind(this)} selection required={this.props.required} />
        );
    }
}
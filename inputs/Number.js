import React from 'react';
import { Form } from 'semantic-ui-react';
import TextField from 'material-ui/TextField';
import ValidationError from '../ValidationError';

export default class Number extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: parseFloat(props.value) || '',
            error: false,
            errorMsg: ''
        }
    }

    validate() {
        const {label, min, minMsg, max, maxMsg, required} = this.props;
        const num = parseFloat(this.state.value);

        if (isNaN(num) && required) return new ValidationError(this, label, "Value is not a number");
        if (min !== undefined && num < min) return new ValidationError(this, label, minMsg || ("Value must be greater than or equals to " + min));
        if (max !== undefined && num > max) return new ValidationError(this, label, maxMsg || ("Value must be less than or equals to " + max));

        return true;
    }

    _onChange(event) {
        const myNumber = parseFloat(event.target.value);

        this.setState({value: myNumber});
    }

    render() {
        const { value, material, ...other } = this.props;

        if (material) {
            const { label, placeholder, ...rest } = other;

            return <TextField floatingLabelText={label} hintText={placeholder} errorText={this.state.errorMsg} {...rest} defaultValue={this.state.value} type="number" onChange={this._onChange.bind(this)} required={this.props.required}/>
        }

        return (
            <Form.Input error={this.state.error} type="number" value={this.state.value} onChange={this._onChange.bind(this)} {...other} required={this.props.required} />
        )
    }
}
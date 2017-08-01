import React from 'react';
import ValidationError from '../ValidationError';
import { Form } from 'semantic-ui-react';
import TextField from 'material-ui/TextField';

export default class Text extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value || '',
            error: false,
            errorMsg: ''
        }
    }

    validate() {
        const {
            label,
            required, requiredMsg,
            minLength, minLengthMsg,
            maxLength, maxLengthMsg,
            regex, regexMsg
        } = this.props;
        const value = this.state.value;

        // Normalize value
        if ((value === "" || value === undefined || value === null) && required) return new ValidationError(this, label, requiredMsg || "Value is required");
        if (minLength && value.length < minLength) return new ValidationError(this, label, minLengthMsg || ("Value must be at least " + minLength + " characters"));
        if (maxLength && value.length > maxLength) return new ValidationError(this, label, maxLengthMsg || ("Value cannot be more than " + maxLength + " characters"));
        if (regex && !regex.test(value)) return new ValidationError(this, label, regexMsg || ("Value must be of the given format"));

        return true;
    }

    _onChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        const { value, required, material, ...other } = this.props;

        if (material) {
            const { label, placeholder, ...rest } = other;

            return <TextField floatingLabelText={label} hintText={placeholder} errorText={this.state.errorMsg} {...rest} fullWidth={true} defaultValue={this.state.value} type="text" onChange={this._onChange.bind(this)} required={required}/>
        }
        return (
            <Form.Input error={this.state.error} value={this.state.value} {...other} type="text" onChange={this._onChange.bind(this)} required={required}/>
        );
    }
}
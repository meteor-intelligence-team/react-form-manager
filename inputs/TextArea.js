import React from 'react';
import { Form } from 'semantic-ui-react';
import TextField from 'material-ui/TextField';
import ValidationError from '../ValidationError';

export default class TextArea extends React.Component {
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
            name,
            required, requiredMsg,
            minLength, minLengthMsg,
            maxLength, maxLengthMsg,
            regex, regexMsg
        } = this.props;
        const value = this.state.value;

        // Normalize value
        if ((value === "" || value === undefined || value === null) && required) return new ValidationError(this, name, requiredMsg || "Value is required");
        if (minLength && value.length < minLength) return new ValidationError(this, name, minLengthMsg || ("Value must be at least " + minLength + " characters"));
        if (maxLength && value.length > maxLength) return new ValidationError(this, name, maxLengthMsg || ("Value cannot be more than " + maxLength + " characters"));
        if (regex && !regex.test(value)) return new ValidationError(this, name, regexMsg || ("Value must be of the given format"));

        return true;
    }

    _onChange(event) {
        this.setState({value: event.target.value});
    }

    _onKeyDown(event) {
        event.stopPropagation();
    }

    render() {
        const { value, required, material, ...other } = this.props;

        if (material) {
            const { label, placeholder, ...rest } = other;

            return <TextField floatingLabelText={label} hintText={placeholder} errorText={this.state.errorMsg} {...rest} defaultValue={this.state.value} fullWidth={true} type="text" multiLine={true} onChange={this._onChange.bind(this)} required={required}/>
        }

        return (
            <Form.TextArea error={this.state.error} value={this.state.value} {...other} onChange={this._onChange.bind(this)} onKeyDown={this._onKeyDown.bind(this)} required={required}/>
        );
    }
}
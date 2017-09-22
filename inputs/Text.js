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
            errorMsg: '',
        }
    }

    validate() {
        const {
            label,
            required, requiredMsg,
            minLength, minLengthMsg,
            maxLength, maxLengthMsg,
            regexp, regexpMsg
        } = this.props;
        const value = this.state.value;

        // Normalize value
        if ((value === "" || value === undefined || value === null) && required) return new ValidationError(this, label, requiredMsg || "Value is required");
        if (minLength && value.length < minLength && value.length > 0) return new ValidationError(this, label, minLengthMsg || ("Value must be at least " + minLength + " characters"));
        if (maxLength && value.length > maxLength) return new ValidationError(this, label, maxLengthMsg || ("Value cannot be more than " + maxLength + " characters"));
        if (regexp && !regexp.test(value)) return new ValidationError(this, label, regexpMsg || ("Value must be of the given format: "+regexp));

        return true;
    }

    _onChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        const { value, required, material, disabledOnEdit, regexp, regexpMsg, ...other } = this.props;

        if (material) {
            const { label, placeholder, ...rest } = other;

            return (
                <TextField
                    type="text"
                    floatingLabelText={label}
                    hintText={placeholder}
                    errorText={this.state.errorMsg}
                    fullWidth={true}
                    defaultValue={this.state.value}
                    onChange={this._onChange.bind(this)}
                    required={required}
                    disabled={!!(disabledOnEdit && this.props.value)}
                    {...rest}
                />
            );
        }

        return (
            <Form.Input
                error={this.state.error}
                value={this.state.value}
                type="text"
                onChange={this._onChange.bind(this)}
                required={required}
                disabled={!!(disabledOnEdit && this.props.value)}
                {...other}
            />
        );
    }
}
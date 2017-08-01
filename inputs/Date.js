import React from 'react';
import { Form } from 'semantic-ui-react';
import DatePicker from 'material-ui/DatePicker';
import ValidationError from '../ValidationError';

export default class DateInput extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: props.value || '',
            error: false,
            errorMsg: ''
        }


    }

    validate() {
        const { label, required, requiredMsg } = this.props;
        const value = this.state.value;

        // Normalize value
        if ((value === "" || value === undefined || value === null) && required) return new ValidationError(this, label, requiredMsg || "Value is required");

        return true;
    }

    _onChange(event, dateObject) {
        // @TODO @FIXME difference entre semantic et material
        if (this.props.material) {
            this.setState({value: dateObject});
        } else {
            this.setState({value: event.target.value});
        }
    }

    render() {
        const { value, material, ...other } = this.props;

        if (material) {
            const { label, placeholder, ...rest } = other;

            let minDate, maxDate, defaultDate;
            if (this.props.min) {
                const dateStringMin = this.props.min.match(/^(\d{4})-(\d{2})-(\d{2})$/);
                minDate = new Date(dateStringMin[1], dateStringMin[2] - 1, dateStringMin[3]);
            } else {
                minDate = undefined;
            }

            if (this.props.max) {
                const dateStringMax = this.props.max.match(/^(\d{4})-(\d{2})-(\d{2})$/);
                maxDate = new Date(dateStringMax[1], dateStringMax[2] - 1, dateStringMax[3]);
            } else {
                maxDate = undefined;
            }

            if (value) {
                const dateStringDefault = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
                defaultDate = new Date(dateStringDefault[1], dateStringDefault[2] - 1, dateStringDefault[3]);
            } else {
                defaultDate = undefined;
            }

            return <DatePicker floatingLabelText={label} autoOk={true} hintText={placeholder} defaultDate={defaultDate} minDate={minDate} maxDate={maxDate} {...rest} onChange={this._onChange.bind(this)} required={this.props.required} />
        }

        return <Form.Input error={this.state.error} {...other} value={this.state.value} type="date" onChange={this._onChange.bind(this)} required={this.props.required} />
    }
}
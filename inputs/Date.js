import React from 'react';
import { DatePicker as DatePickerMaterial } from 'material-ui';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
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
        if (this.props.material) {
            this.setState({value: dateObject});
        } else {
            this.setState({ value: event.toDate() });
        }
    }

    render() {
        const { value, material, ...other } = this.props;

        if (material) {
            const { label, placeholder, ...rest } = other;

            let minDate, maxDate;
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

            return <DatePickerMaterial floatingLabelText={label} autoOk={true} hintText={placeholder} defaultDate={value} minDate={minDate} maxDate={maxDate} {...rest} onChange={this._onChange.bind(this)} required={this.props.required} />
        }

        //moment.locale('fr');

        const { label, placeholder, ...rest } = other;

        const valueByMoment = (this.state.value !== '') ? moment(this.state.value) : '';
        const minByMoment = (this.props.min !== '' && this.props.min !== undefined) ? moment(this.props.min) : '';
        const maxByMoment = (this.props.max !== '' && this.props.min !== undefined) ? moment(this.props.max) : '';
        const required = (this.props.required) ? 'required' : '';

        return <div className={`field ${required}`}>
                    <label>{this.props.label}</label>
                    <DatePicker
                        selected={valueByMoment}
                        onChange={this._onChange.bind(this)}
                        required={this.props.required}
                        placeholderText={placeholder}
                        minDate={minByMoment}
                        maxDate={maxByMoment}
                        {...rest}
                    />
        </div>;
    }
}
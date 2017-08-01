import React from 'react';
import { Form } from 'semantic-ui-react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ValidationError from '../ValidationError';

export default class Radio extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value || undefined,
            error: false
        }
    }

    handleChange = (event, data) => {
        this.props.onFocus();

        if (this.props.material) {
            this.setState({value: data});
        } else {
            this.setState({value: data.value});
        }
    }

    validate() {
        const {
            label,
            required, requiredMsg,
        } = this.props;
        const value = this.state.value;

        if ((value === "" || value === undefined || value === null) && required) return new ValidationError(this, label, requiredMsg || "Choice is required");

        return true;
    }

    render() {
        const {label, options, name, material } = this.props;

        if (material) {
            return (<div>
                <label>{label}</label>
                <RadioButtonGroup name={name} onChange={this.handleChange} >
                    {options.map((oneOption) => (
                        <RadioButton key={oneOption.value} value={oneOption.value} label={oneOption.text} />
                    ))}
                </RadioButtonGroup>
                </div>
            );
        }

        return (
            <Form.Field required={this.props.required} error={this.state.error}>
                <label>{label}</label>
                <Form.Group>
                    {options.map((oneOption) => (
                        <Form.Field key={oneOption.text}>
                            <Form.Checkbox radio checked={this.state.value === oneOption.value} name={name} onClick={this.handleChange} label={oneOption.text} value={oneOption.value} />
                        </Form.Field>
                    ))}
                </Form.Group>
            </Form.Field>
        );
    }
}
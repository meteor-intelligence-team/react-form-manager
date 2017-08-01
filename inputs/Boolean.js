import React from 'react';
import ValidationError from '../ValidationError';
import Checkbox from 'material-ui/Checkbox';
import { Form } from 'semantic-ui-react';

export default class Boolean extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: props.value || undefined,
            error: false
        }
    }

    validate() {
        const { required, requiredMsg, label } = this.props;
        const value = this.state.value;

        if (value === undefined && required) return new ValidationError(this, label, requiredMsg || "Must be checked");

        return true;
    }

    _onClick(event, data) {
        this.props.onFocus();

        if (this.props.material) {
            this.setState({value: !!data});
        } else {
            this.setState({value: !data.checked});
        }
    }

    render() {
        if (this.props.material) {
            return <Checkbox checked={this.state.value} onCheck={this._onClick.bind(this)} label={this.props.label} />
        }

        return <Form.Checkbox error={this.state.error} checked={this.state.value} onClick={this._onClick.bind(this)} label={this.props.label}/>
    }
}
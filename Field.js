import React from 'react';
import PropTypes from 'prop-types';
import * as inputs from './inputs/index';

export default class Field extends React.Component {
    componentDidMount() {
        this.context.fieldset.registerInput(this.props.name, this);
    }

    componentWillUnmount() {
        this.context.fieldset.unregisterInput(this.props.name, this);
    }

    getValue() {
        if (this.inp !== null && this.inp.state.value !== undefined) return this.inp.state.value;
    }

    validate() {
        return (!this.inp) ? true : (!this.inp.validate) ? true : this.inp.validate();
    }

    resetError() {
        if (this.inp !== null) this.inp.setState({ error: false, errorMsg: '' });
    }

    handleFocus() {
        this.context.fieldset.hideAllErrors();
    }

    render() {
        const {type, name, ...other} = this.props;
        const Input = (typeof type === "string") ? (inputs.hasOwnProperty(type) ? inputs[type] : inputs.Text) : type;

        return <Input ref={input => this.inp = input} name={name} {...other} onFocus={this.handleFocus.bind(this)}/>;
    }
}

Field.contextTypes = {
    fieldset: PropTypes.object
};
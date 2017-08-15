import React from 'react';
import Fieldset from './Fieldset';


export default class Form extends React.Component {
    submit() {
        this.formRef._handleSubmit(null);
    }

    render() {
        const {children, ...other} = this.props;

        return (
            <Fieldset ref={input => this.formRef = input} {...other}>
                {children}
            </Fieldset>
        );
    }
}
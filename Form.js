import React from 'react';
import Fieldset from './Fieldset';


export default class Form extends React.Component {
    render() {
        const {children, ...other} = this.props;

        return (
            <Fieldset {...other}>
                {children}
            </Fieldset>
        );
    }
}
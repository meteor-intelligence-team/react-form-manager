import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Form } from 'semantic-ui-react';

export default class Submit extends React.Component {
    getValue() {
        return;
    }

    render() {
        const { label, material, ...other } = this.props;

        if (material) {
            return <RaisedButton type="submit" label={label} primary={true} {...other} />
        }

        return <Form.Button content={label} {...other} />
    }
}
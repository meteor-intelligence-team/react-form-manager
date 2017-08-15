import React from 'react';
import Field from './Field';
import { Message, Grid } from 'semantic-ui-react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';

export default class Fieldset extends React.Component {
    constructor( props, context ) {
        super( props, context );
        autobind( this );

        this.inputs = {};

        this.state = {
            errorMsg: [],
            errorHeader: props.errorHeader || 'Error occurred',
        };
    }

    getChildContext() {
        return {
            fieldset: this
        }
    }

    registerInput(name, component) {
        if (this.inputs[name] === undefined) {
            this.inputs[name] = component;
            return;
        }

        console.error(`Cannot register more than one input with the same name '${name}'.`);
    }

    unregisterInput(name, component) {
        const inp = this.inputs[name];
        if (inp === undefined) {
            console.error(`Trying to unregister a component named '${name}' which was not registered. Should be a bug.`);
            return;
        }

        if (component !== inp) {
            console.warn(`Trying to unregister the component with name '${name}' but something else was registered on that name. Should be a bug.`);
        } else {
            delete this.inputs[name];
        }
    }

    getDefaultValue(name) {
        return this.props.value && this.props.value[name];
    }

    componentDidMount() {
        this.registerInput(this.props.name, this);
    }

    componentWillUnmount() {
        this.unregisterInput(this.props.name, this);
    }

    getFirstInput() {
        for (let name in this.inputs) {
            return this.inputs[name];
        }

        return null;
    }

    getValue() {
        const value = {...this.props.values};

        for (const name in this.inputs) {
            if (name !== this.props.name) {
                value[name] = this.inputs[name].getValue();
            }
        }

        return value;
    }

    validate() {
        let boolean = true;

        for (const name in this.inputs) {
            if (name !== this.props.name) {
                const resultValidation = this.inputs[name].validate();

                if (resultValidation !== true) {
                    boolean = false;

                    if (this.state)
                    this.setState((prevState) => {
                        const errorMsg = [...prevState.errorMsg, `${resultValidation.name}: ${resultValidation.toString()}`];

                        return { errorMsg }
                    });
                }
            }
        }

        return boolean;
    }

    generate(attributes, value) {
        return attributes.map((attr, index) => {
            if (attr instanceof Array) {
                const fields = [];
                attr.forEach((element, index) => {
                    const { textAlign, verticalAlign, ...other } = element;
                    const defaultValue = value && value[element.name];

                    const key = (element.name === undefined) ? index : element.name;

                    fields.push(<Grid.Column verticalAlign={verticalAlign} textAlign={textAlign} key={key}><Field {...other} material={this.props.material} value={defaultValue}/></Grid.Column>);
                });

                return <Grid key={index} columns={attr.length}>{fields}</Grid>;
            } else {
                const { textAlign, verticalAlign, ...other } = attr;
                const defaultValue = value && value[attr.name];
                const key = (attr.name === undefined) ? index : attr.name;

                return <Grid verticalAlign="middle" columns={16} key={key}><Grid.Column verticalAlign={verticalAlign} textAlign={textAlign} width={16}><Field material={this.props.material} {...other} value={defaultValue}/></Grid.Column></Grid>
            }
        })
    }

    _handleSubmit = (e) => {
        this.hideAllErrors();

        if ( !this.props.onSubmit ) return ;

        if (this.validate() === true) this.props.onSubmit(e, this.getValue());
        else if (e !== null) e.preventDefault();
    };

    hideAllErrors() {
        this.setState({ errorMsg: [] });

        for (const name in this.inputs) {
            if (name !== this.props.name) {
                this.inputs[name].resetError();
            }
        }
    }

    render() {
        const {children, values, attributes, onSubmit, material, ...other} = this.props;
        const autoChildren = attributes ? this.generate(attributes, values) : false;
        const error = (this.state.errorMsg.length > 0);

        return (
            <form onSubmit={this._handleSubmit} {...other} noValidate>
                {(!error) ? null :
                    <Message
                        error
                        visible={error}
                        header={this.state.errorHeader}
                        onDismiss={this.hideAllErrors}
                        list={this.state.errorMsg || ['Sorry, something went wrong.']}
                    />
                }
                { children }
                { autoChildren }
                {(!error) ? null :
                    <Message
                        error
                        visible={error}
                        header={this.state.errorHeader}
                        onDismiss={this.hideAllErrors}
                        list={this.state.errorMsg || ['Sorry, something went wrong.']}
                    />
                }
            </form>
        );
    }
}

Fieldset.contextTypes = {
    fieldset: PropTypes.object
};

Fieldset.childContextTypes = {
    fieldset: PropTypes.object
};

const checkObject = PropTypes.oneOfType([
    PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        required: PropTypes.bool,
        multiple: PropTypes.bool,
        search: PropTypes.bool,
        placeholder: PropTypes.string,
        textAlign: PropTypes.string,
        verticalAlign: PropTypes.string,
        min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        minLength: PropTypes.number,
        options: PropTypes.oneOfType([
            PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.string.isRequired,
                    text: PropTypes.string.isRequired,
                })
            ),
            PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    required: PropTypes.bool,
                    placeholder: PropTypes.string,
                    regexp: PropTypes.string,
                    regexpMsg: PropTypes.string
                })
            ),
        ]),
    }),
    PropTypes.element
]);

Fieldset.propTypes = {
    name: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    material: PropTypes.bool.isRequired,
    attributes: PropTypes.arrayOf(
                    PropTypes.oneOfType([
                        PropTypes.arrayOf(checkObject),
                        checkObject,
                    ])
    ).isRequired,
};
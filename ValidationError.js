class ValidationError {
    constructor(element, name, message) {
        element.setState({error:true});

        if (element.props.material) {
            element.setState({errorMsg:message});
        }

        Object.defineProperties(this, {
            name: {value: name},
            message: {value: message},
            element: {value: element}
        })
    }

    toString() {
        return this.message;
    }
}

export default ValidationError;
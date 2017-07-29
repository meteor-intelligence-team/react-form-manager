'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _semanticUiReact = require('semantic-ui-react');

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fieldset = function (_React$Component) {
    _inherits(Fieldset, _React$Component);

    function Fieldset(props, context) {
        _classCallCheck(this, Fieldset);

        var _this = _possibleConstructorReturn(this, (Fieldset.__proto__ || Object.getPrototypeOf(Fieldset)).call(this, props, context));

        _this._handleSubmit = function (e) {
            if (!_this.props.onSubmit) {
                return;
            }

            if (_this.validate() === true) _this.props.onSubmit(e, _this.getValue());else e.preventDefault();
        };

        (0, _reactTapEventPlugin2.default)();

        _this.inputs = {};

        _this.state = {
            errorMsg: [],
            errorHeader: props.errorHeader || 'Error occurred'
        };

        (0, _reactAutobind2.default)(_this);
        return _this;
    }

    _createClass(Fieldset, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                fieldset: this
            };
        }
    }, {
        key: 'registerInput',
        value: function registerInput(name, component) {
            if (this.inputs[name] === undefined) {
                this.inputs[name] = component;
                return;
            }

            console.error('Cannot register more than one input with the same name \'' + name + '\'.');
            return;
        }
    }, {
        key: 'unregisterInput',
        value: function unregisterInput(name, component) {
            var inp = this.inputs[name];
            if (inp === undefined) {
                console.error('Trying to unregister a component named \'' + name + '\' which was not registered. Should be a bug.');
                return;
            }

            if (component !== inp) {
                console.warn('Trying to unregister the component with name \'' + name + '\' but something else was registered on that name. Should be a bug.');
                return;
            } else {
                delete this.inputs[name];
            }
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue(name) {
            return this.props.value && this.props.value[name];
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.registerInput(this.props.name, this);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unregisterInput(this.props.name, this);
        }
    }, {
        key: 'getFirstInput',
        value: function getFirstInput() {
            for (var name in this.inputs) {
                return this.inputs[name];
            }

            return null;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            var value = _extends({}, this.props.values);

            for (var name in this.inputs) {
                if (name !== this.props.name) {
                    value[name] = this.inputs[name].getValue();
                }
            }

            return value;
        }
    }, {
        key: 'validate',
        value: function validate() {
            var _this2 = this;

            var boolean = true;

            for (var name in this.inputs) {
                if (name !== this.props.name) {
                    (function () {
                        var resultValidation = _this2.inputs[name].validate();

                        if (resultValidation !== true) {
                            boolean = false;
                            _this2.setState(function (prevState) {
                                var errorMsg = [].concat(_toConsumableArray(prevState.errorMsg), [resultValidation.name + ': ' + resultValidation.toString()]);

                                return { errorMsg: errorMsg };
                            });
                        }
                    })();
                }
            }

            return boolean;
        }
    }, {
        key: 'generate',
        value: function generate(attributes, value) {
            var _this3 = this;

            return attributes.map(function (attr, index) {
                if (attr instanceof Array) {
                    var fields = [];
                    attr.forEach(function (element) {
                        var textAlign = element.textAlign,
                            verticalAlign = element.verticalAlign,
                            other = _objectWithoutProperties(element, ['textAlign', 'verticalAlign']);

                        var defaultValue = value && value[element.name];

                        fields.push(_react2.default.createElement(
                            _semanticUiReact.Grid.Column,
                            { verticalAlign: verticalAlign, textAlign: textAlign, key: element.name },
                            _react2.default.createElement(_Field2.default, _extends({}, other, { material: _this3.props.material, value: defaultValue }))
                        ));
                    });

                    return _react2.default.createElement(
                        _semanticUiReact.Grid,
                        { key: index, columns: attr.length },
                        fields
                    );
                } else {
                    var textAlign = attr.textAlign,
                        verticalAlign = attr.verticalAlign,
                        other = _objectWithoutProperties(attr, ['textAlign', 'verticalAlign']);

                    var defaultValue = value && value[attr.name];

                    return _react2.default.createElement(
                        _semanticUiReact.Grid,
                        { verticalAlign: 'middle', columns: 16, key: attr.name },
                        _react2.default.createElement(
                            _semanticUiReact.Grid.Column,
                            { verticalAlign: verticalAlign, textAlign: textAlign, width: 16 },
                            _react2.default.createElement(_Field2.default, _extends({ material: _this3.props.material }, other, { value: defaultValue }))
                        )
                    );
                }
            });
        }
    }, {
        key: 'hideAllErrors',
        value: function hideAllErrors() {
            this.setState({ errorMsg: [] });

            for (var name in this.inputs) {
                if (name !== this.props.name) {
                    this.inputs[name].resetError();
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                values = _props.values,
                attributes = _props.attributes,
                onSubmit = _props.onSubmit,
                material = _props.material,
                other = _objectWithoutProperties(_props, ['children', 'values', 'attributes', 'onSubmit', 'material']);

            var autoChildren = attributes ? this.generate(attributes, values) : false;
            var error = this.state.errorMsg.length > 0 ? true : false;

            return _react2.default.createElement(
                _semanticUiReact.Form,
                _extends({ error: error, onSubmit: this._handleSubmit }, other, { noValidate: true }),
                _react2.default.createElement(_semanticUiReact.Message, {
                    error: true,
                    header: this.state.errorHeader,
                    onDismiss: this.hideAllErrors,
                    list: this.state.errorMsg || ['Sorry, something went wrong.']
                }),
                children,
                autoChildren
            );
        }
    }]);

    return Fieldset;
}(_react2.default.Component);

exports.default = Fieldset;


Fieldset.contextTypes = {
    fieldset: _propTypes2.default.object
};

Fieldset.childContextTypes = {
    fieldset: _propTypes2.default.object
};

var checkObject = _propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.string.isRequired,
    required: _propTypes2.default.bool,
    multiple: _propTypes2.default.bool,
    search: _propTypes2.default.bool,
    placeholder: _propTypes2.default.string,
    textAlign: _propTypes2.default.string,
    verticalAlign: _propTypes2.default.string,
    min: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    max: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    minLength: _propTypes2.default.number,
    options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        value: _propTypes2.default.string.isRequired,
        text: _propTypes2.default.string.isRequired
    }))
});

Fieldset.propTypes = {
    name: _propTypes2.default.string.isRequired,
    values: _propTypes2.default.object.isRequired,
    material: _propTypes2.default.bool.isRequired,
    attributes: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.arrayOf(checkObject), checkObject])).isRequired
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _RadioButton = require('material-ui/RadioButton');

var _ValidationError = require('../ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Radio = function (_React$Component) {
    _inherits(Radio, _React$Component);

    function Radio(props, context) {
        _classCallCheck(this, Radio);

        var _this = _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, props, context));

        _this.handleChange = function (event, data) {
            _this.props.onFocus();

            if (_this.props.material) {
                _this.setState({ value: data });
            } else {
                _this.setState({ value: data.value });
            }
        };

        _this.state = {
            value: props.value || undefined,
            error: false
        };
        return _this;
    }

    _createClass(Radio, [{
        key: 'validate',
        value: function validate() {
            var _props = this.props,
                label = _props.label,
                required = _props.required,
                requiredMsg = _props.requiredMsg;

            var value = this.state.value;

            if ((value === "" || value === undefined || value === null) && required) return new _ValidationError2.default(this, label, requiredMsg || "Choice is required");

            return true;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                label = _props2.label,
                options = _props2.options,
                name = _props2.name,
                material = _props2.material;


            if (material) {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        label
                    ),
                    _react2.default.createElement(
                        _RadioButton.RadioButtonGroup,
                        { name: name, onChange: this.handleChange },
                        options.map(function (oneOption) {
                            return _react2.default.createElement(_RadioButton.RadioButton, { key: oneOption.value, value: oneOption.value, label: oneOption.text });
                        })
                    )
                );
            }

            return _react2.default.createElement(
                _semanticUiReact.Form.Field,
                { required: this.props.required, error: this.state.error },
                _react2.default.createElement(
                    'label',
                    null,
                    label
                ),
                _react2.default.createElement(
                    _semanticUiReact.Form.Group,
                    null,
                    options.map(function (oneOption) {
                        return _react2.default.createElement(
                            _semanticUiReact.Form.Field,
                            { key: oneOption.text },
                            _react2.default.createElement(_semanticUiReact.Form.Checkbox, { radio: true, checked: _this2.state.value === oneOption.value, name: name, onClick: _this2.handleChange, label: oneOption.text, value: oneOption.value })
                        );
                    })
                )
            );
        }
    }]);

    return Radio;
}(_react2.default.Component);

exports.default = Radio;
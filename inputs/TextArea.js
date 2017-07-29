'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _ValidationError = require('../ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextArea = function (_React$Component) {
    _inherits(TextArea, _React$Component);

    function TextArea(props, context) {
        _classCallCheck(this, TextArea);

        var _this = _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props, context));

        _this.state = {
            value: props.value || '',
            error: false,
            errorMsg: ''
        };
        return _this;
    }

    _createClass(TextArea, [{
        key: 'validate',
        value: function validate() {
            var _props = this.props,
                name = _props.name,
                required = _props.required,
                requiredMsg = _props.requiredMsg,
                minLength = _props.minLength,
                minLengthMsg = _props.minLengthMsg,
                maxLength = _props.maxLength,
                maxLengthMsg = _props.maxLengthMsg,
                regex = _props.regex,
                regexMsg = _props.regexMsg;

            var value = this.state.value;

            // Normalize value
            if ((value === "" || value === undefined || value === null) && required) return new _ValidationError2.default(this, name, requiredMsg || "Value is required");
            if (minLength && value.length < minLength) return new _ValidationError2.default(this, name, minLengthMsg || "Value must be at least " + minLength + " characters");
            if (maxLength && value.length > maxLength) return new _ValidationError2.default(this, name, maxLengthMsg || "Value cannot be more than " + maxLength + " characters");
            if (regex && !regex.test(value)) return new _ValidationError2.default(this, name, regexMsg || "Value must be of the given format");

            return true;
        }
    }, {
        key: '_onChange',
        value: function _onChange(event) {
            this.setState({ value: event.target.value });
        }
    }, {
        key: '_onKeyDown',
        value: function _onKeyDown(event) {
            event.stopPropagation();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                value = _props2.value,
                required = _props2.required,
                material = _props2.material,
                other = _objectWithoutProperties(_props2, ['value', 'required', 'material']);

            if (material) {
                var label = other.label,
                    placeholder = other.placeholder,
                    rest = _objectWithoutProperties(other, ['label', 'placeholder']);

                return _react2.default.createElement(_TextField2.default, _extends({ floatingLabelText: label, hintText: placeholder, errorText: this.state.errorMsg }, rest, { defaultValue: this.state.value, fullWidth: true, type: 'text', multiLine: true, onChange: this._onChange.bind(this), required: required }));
            }

            return _react2.default.createElement(_semanticUiReact.Form.TextArea, _extends({ error: this.state.error, value: this.state.value }, other, { onChange: this._onChange.bind(this), onKeyDown: this._onKeyDown.bind(this), required: required }));
        }
    }]);

    return TextArea;
}(_react2.default.Component);

exports.default = TextArea;
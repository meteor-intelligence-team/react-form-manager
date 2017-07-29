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

var Number = function (_React$Component) {
    _inherits(Number, _React$Component);

    function Number(props, context) {
        _classCallCheck(this, Number);

        var _this = _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).call(this, props, context));

        _this.state = {
            value: props.value || '',
            error: false,
            errorMsg: ''
        };
        return _this;
    }

    _createClass(Number, [{
        key: 'validate',
        value: function validate() {
            var _props = this.props,
                label = _props.label,
                min = _props.min,
                minMsg = _props.minMsg,
                max = _props.max,
                maxMsg = _props.maxMsg,
                required = _props.required;

            var num = parseFloat(this.state.value);

            if (isNaN(num) && required) return new _ValidationError2.default(this, label, "Value is not a number");
            if (min !== undefined && num < min) return new _ValidationError2.default(this, label, minMsg || "Value must be greater than or equals to " + min);
            if (max !== undefined && num > max) return new _ValidationError2.default(this, label, maxMsg || "Value must be less than or equals to " + max);

            return true;
        }
    }, {
        key: '_onChange',
        value: function _onChange(event) {
            this.setState({ value: event.target.value });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                value = _props2.value,
                material = _props2.material,
                other = _objectWithoutProperties(_props2, ['value', 'material']);

            if (material) {
                var label = other.label,
                    placeholder = other.placeholder,
                    rest = _objectWithoutProperties(other, ['label', 'placeholder']);

                return _react2.default.createElement(_TextField2.default, _extends({ floatingLabelText: label, hintText: placeholder, errorText: this.state.errorMsg }, rest, { defaultValue: this.state.value, type: 'number', onChange: this._onChange.bind(this), required: this.props.required }));
            }

            return _react2.default.createElement(_semanticUiReact.Form.Input, _extends({ error: this.state.error, type: 'number', value: this.state.value, onChange: this._onChange.bind(this) }, other, { required: this.props.required }));
        }
    }]);

    return Number;
}(_react2.default.Component);

exports.default = Number;
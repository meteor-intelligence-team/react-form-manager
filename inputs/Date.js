'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _DatePicker = require('material-ui/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _ValidationError = require('../ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateInput = function (_React$Component) {
    _inherits(DateInput, _React$Component);

    function DateInput(props, context) {
        _classCallCheck(this, DateInput);

        var _this = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props, context));

        _this.state = {
            value: props.value || '',
            error: false,
            errorMsg: ''
        };

        return _this;
    }

    _createClass(DateInput, [{
        key: 'validate',
        value: function validate() {
            var _props = this.props,
                label = _props.label,
                required = _props.required,
                requiredMsg = _props.requiredMsg;

            var value = this.state.value;

            // Normalize value
            if ((value === "" || value === undefined || value === null) && required) return new _ValidationError2.default(this, label, requiredMsg || "Value is required");

            return true;
        }
    }, {
        key: '_onChange',
        value: function _onChange(event, dateObject) {
            // @TODO @FIXME difference entre semantic et material
            if (this.props.material) {
                this.setState({ value: dateObject });
            } else {
                this.setState({ value: event.target.value });
            }
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

                var minDate = void 0,
                    maxDate = void 0,
                    defaultDate = void 0;
                if (this.props.min) {
                    var dateStringMin = this.props.min.match(/^(\d{4})-(\d{2})-(\d{2})$/);
                    minDate = new Date(dateStringMin[1], dateStringMin[2] - 1, dateStringMin[3]);
                } else {
                    minDate = null;
                }

                if (this.props.max) {
                    var dateStringMax = this.props.max.match(/^(\d{4})-(\d{2})-(\d{2})$/);
                    maxDate = new Date(dateStringMax[1], dateStringMax[2] - 1, dateStringMax[3]);
                } else {
                    maxDate = null;
                }

                if (value) {
                    var dateStringDefault = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
                    defaultDate = new Date(dateStringDefault[1], dateStringDefault[2] - 1, dateStringDefault[3]);
                } else {
                    defaultDate = null;
                }

                return _react2.default.createElement(_DatePicker2.default, _extends({ floatingLabelText: label, autoOk: true, hintText: placeholder, defaultDate: defaultDate, minDate: minDate, maxDate: maxDate }, rest, { onChange: this._onChange.bind(this), required: this.props.required }));
            }

            return _react2.default.createElement(_semanticUiReact.Form.Input, _extends({ error: this.state.error }, other, { value: this.state.value, type: 'date', onChange: this._onChange.bind(this), required: this.props.required }));
        }
    }]);

    return DateInput;
}(_react2.default.Component);

exports.default = DateInput;
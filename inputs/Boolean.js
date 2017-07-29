'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ValidationError = require('../ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Boolean = function (_React$Component) {
    _inherits(Boolean, _React$Component);

    function Boolean(props, context) {
        _classCallCheck(this, Boolean);

        var _this = _possibleConstructorReturn(this, (Boolean.__proto__ || Object.getPrototypeOf(Boolean)).call(this, props, context));

        _this.state = {
            value: props.value || undefined,
            error: false
        };
        return _this;
    }

    _createClass(Boolean, [{
        key: 'validate',
        value: function validate() {
            var _props = this.props,
                required = _props.required,
                requiredMsg = _props.requiredMsg,
                label = _props.label;

            var value = this.state.value;

            if (value === undefined && required) return new _ValidationError2.default(this, label, requiredMsg || "Must be checked");

            return true;
        }
    }, {
        key: '_onClick',
        value: function _onClick(event, data) {
            this.props.onFocus();

            if (this.props.material) {
                this.setState({ value: !!data });
            } else {
                this.setState({ value: !data.checked });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.material) {
                return _react2.default.createElement(_Checkbox2.default, { checked: this.state.value, onCheck: this._onClick.bind(this), label: this.props.label });
            }

            return _react2.default.createElement(_semanticUiReact.Form.Checkbox, { error: this.state.error, checked: this.state.value, onClick: this._onClick.bind(this), label: this.props.label });
        }
    }]);

    return Boolean;
}(_react2.default.Component);

exports.default = Boolean;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactSemanticForm = require('react-semantic-form');

var _reactSemanticForm2 = _interopRequireDefault(_reactSemanticForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var modelAttributes = [{ name: "name", type: "Text", label: "Name", description: "Enter your name", required: true }, { name: "title", type: "Deferred", label: "Title", required: true, minLength: 3 }, { name: "sex", type: "Radio", label: "Sex", required: true, options: { male: "Male", female: "Female" }, optionClass: "radio-inline" }, { name: "sn", type: "Integer", label: "SN", description: "Your Serial Number", max: 999, min: 100 }, { name: "dob", type: "Date", label: "Date of Birth", description: "The day you were born", format: "YYYY-MM-DD", suffix: "A.D." }, { name: "human", type: "Boolean", label: "Is Human", defaultValue: true }, { name: "hobbies", type: "Select", label: "Hobbies", placeholder: "Choose a hobby", options: [{ value: 'foot', text: 'Football' }, { value: 'base', text: 'Baseball' }, { value: 'rug', text: 'Rugby' }, { value: 'dev', text: 'Code' }], minSelection: 2, maxSelection: 4 }, { name: "select", type: "Select", label: "Select One", placeholder: "Options", options: [{ value: "one", text: "Option 1" }, { value: "two", text: "Option 2" }, { value: "three", text: "Option 3" }], required: true, searchable: true, multiple: true }, { name: "description", type: "TextArea", label: "Description" }, { name: "file", type: "File", label: "Attach File" }];

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactSemanticForm2.default, { name: 'semantic', attributes: modelAttributes, suppress: { sex: "female" }, onSuccess: function onSuccess(res) {
          return console.log(res);
        } });
    }
  }]);

  return App;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(App, null), document.getElementById('example'));
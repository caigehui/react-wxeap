'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _constants = require('../../constants');

var COLORS = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var colors = [COLORS.BLUE_COLOR, COLORS.RED_COLOR, COLORS.GREEN_COLOR, COLORS.YELLOW_COLOR];

var DefaultAvatar = (_temp = _class = function (_React$Component) {
    _inherits(DefaultAvatar, _React$Component);

    function DefaultAvatar() {
        _classCallCheck(this, DefaultAvatar);

        return _possibleConstructorReturn(this, (DefaultAvatar.__proto__ || Object.getPrototypeOf(DefaultAvatar)).apply(this, arguments));
    }

    _createClass(DefaultAvatar, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                radius = _props.radius,
                id = _props.id,
                name = _props.name,
                style = _props.style;

            var containerStyle = {
                width: radius * 2,
                height: radius * 2,
                borderRadius: '50%',
                fontSize: radius - 14,
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                backgroundColor: colors[id % colors.length]
            };
            return _react2.default.createElement(
                _View2.default,
                { style: _extends({}, containerStyle, style) },
                name.substring(name.length - (name.length > 2 ? 2 : 1), name.length)
            );
        }
    }]);

    return DefaultAvatar;
}(_react2.default.Component), _class.propTypes = {
    radius: _react.PropTypes.number,
    id: _react.PropTypes.number,
    name: _react.PropTypes.string,
    style: _react.PropTypes.object
}, _class.defaultProps = {
    id: 0
}, _temp);
exports.default = DefaultAvatar;
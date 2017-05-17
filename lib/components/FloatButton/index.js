'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FloatButton = function (_React$Component) {
    _inherits(FloatButton, _React$Component);

    function FloatButton() {
        _classCallCheck(this, FloatButton);

        return _possibleConstructorReturn(this, (FloatButton.__proto__ || Object.getPrototypeOf(FloatButton)).apply(this, arguments));
    }

    _createClass(FloatButton, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _View2.default,
                { style: _extends({}, styles.container, this.props.style), onClick: this.props.onClick },
                _react2.default.createElement(_icon2.default, { type: this.props.type,
                    color: this.props.color,
                    size: this.props.size })
            );
        }
    }]);

    return FloatButton;
}(_react2.default.Component);

FloatButton.propTypes = {
    onClick: _react2.default.PropTypes.func,
    style: _react2.default.PropTypes.object,
    type: _react2.default.PropTypes.any,
    color: _react2.default.PropTypes.string,
    size: _react2.default.PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg'])
};
FloatButton.defaultProps = {
    style: {},
    type: require('../../assets/add.svg'),
    color: 'white',
    size: 'md'
};
exports.default = FloatButton;


var styles = {
    container: {
        position: 'absolute',
        bottom: 50,
        right: 50,
        width: 80,
        height: 80,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40
    }
};
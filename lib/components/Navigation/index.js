'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/nav-bar/style/css');

var _navBar = require('antd-mobile/lib/nav-bar');

var _navBar2 = _interopRequireDefault(_navBar);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobileDetect = require('../../utils/mobileDetect');

var MobileDetect = _interopRequireWildcard(_mobileDetect);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = function (_React$Component) {
    _inherits(Navigation, _React$Component);

    function Navigation() {
        _classCallCheck(this, Navigation);

        return _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).apply(this, arguments));
    }

    _createClass(Navigation, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.title = this.props.title;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                title = _props.title,
                onBack = _props.onBack,
                hide = _props.hide,
                autoHide = _props.autoHide,
                rightContent = _props.rightContent;

            return autoHide && (hide || MobileDetect.isWechat || MobileDetect.isApp) ? _react2.default.createElement('div', null) : _react2.default.createElement(
                _navBar2.default,
                {
                    mode: 'light', leftContent: onBack ? '返回' : null, rightContent: rightContent, onLeftClick: onBack, iconName: onBack ? 'left' : null },
                title
            );
        }
    }]);

    return Navigation;
}(_react2.default.Component);

Navigation.propTypes = {
    onBack: _react.PropTypes.func,
    title: _react.PropTypes.string,
    hide: _react.PropTypes.bool,
    autoHide: _react.PropTypes.bool,
    rightContent: _react.PropTypes.any
};
Navigation.defaultProps = {
    title: ' ',
    hide: false,
    autoHide: true
};
exports.default = Navigation;
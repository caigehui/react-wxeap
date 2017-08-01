'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _css = require('antd-mobile/lib/nav-bar/style/css');

var _navBar = require('antd-mobile/lib/nav-bar');

var _navBar2 = _interopRequireDefault(_navBar);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MobileDetect = require('../../utils/MobileDetect');

var MobileDetect = _interopRequireWildcard(_MobileDetect);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = (_temp2 = _class = function (_React$Component) {
    _inherits(Navigation, _React$Component);

    function Navigation() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Navigation);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call.apply(_ref, [this].concat(args))), _this), _this.configureTitle = function (title) {
            document.title = title;
            MobileDetect.isApp && window.postMessage(JSON.stringify({
                type: 'onTitleUpdate',
                payload: {
                    title: title
                }
            }));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Navigation, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.title !== this.props.title) {
                this.configureTitle(nextProps.title);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.configureTitle(this.props.title);
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
                title.length > 8 ? title.substring(0, 7) + '...' : title
            );
        }
    }]);

    return Navigation;
}(_react2.default.Component), _class.propTypes = {
    onBack: _react.PropTypes.func,
    title: _react.PropTypes.string,
    hide: _react.PropTypes.bool,
    autoHide: _react.PropTypes.bool,
    rightContent: _react.PropTypes.any
}, _class.defaultProps = {
    title: ' ',
    hide: false,
    autoHide: true
}, _temp2);
exports.default = Navigation;
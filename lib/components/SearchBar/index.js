'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../../constants');

var COLORS = _interopRequireWildcard(_constants);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _router = require('dva/router');

var _bind = require('../../app/bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BAR_HEIGHT = 56;
var BORDER_DADIUS = 10;
var DISABLED_OPACITY = 0.6;

var SearchBar = (_dec = (0, _bind2.default)(), _dec(_class = (_temp2 = _class2 = function (_Component) {
    _inherits(SearchBar, _Component);

    function SearchBar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SearchBar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function () {
            // 禁用
            if (_this.props.disabled) return;
            _this.props.onClick && _this.props.onClick();

            _this.props.dispatch(_router.routerRedux.push({
                pathname: '/SearchComponent',
                state: {
                    onSearch: _this.props.onSearch,
                    renderRow: _this.props.renderRow,
                    placeholder: _this.props.placeholder,
                    label: _this.props.label,
                    notFoundLabel: _this.props.notFoundLabel,
                    onCancel: _this.props.onCancel
                }
            }));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SearchBar, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                width = _props.width,
                style = _props.style;

            return _react2.default.createElement(
                _View2.default,
                {
                    style: this.props.disabled ? _extends({}, styles.container, styles.disabled, { width: width }, style) : _extends({}, styles.container, { width: width }, style),
                    onClick: this.onClick },
                _react2.default.createElement('img', { src: require('../../assets/search.png'), style: styles.icon }),
                '\u641C\u7D22'
            );
        }
    }]);

    return SearchBar;
}(_react.Component), _class2.propTypes = {
    width: _react.PropTypes.any, // 搜索条宽度
    disabled: _react.PropTypes.bool, // 是否禁用
    onClick: _react.PropTypes.func, // 点击SeachBar
    onSearch: _react.PropTypes.func, // 触发搜索
    onCancel: _react.PropTypes.func, // 取消查找触发的回调
    renderRow: _react.PropTypes.func, // 渲染每一行
    placeholder: _react.PropTypes.string, // 输入框默认的搜索数据
    label: _react.PropTypes.string, // 默认下方icon提示文字
    notFoundLabel: _react.PropTypes.string, // 未找到数据的提示文字
    style: _react.PropTypes.object, // 样式覆盖
    dispatch: _react.PropTypes.any
}, _class2.defaultProps = {
    width: '100%'
}, _temp2)) || _class);
exports.default = SearchBar;


var styles = {
    container: {
        height: BAR_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.BACKGROUND_COLOR,
        color: COLORS.SUBTITLE_COLOR,
        borderRadius: BORDER_DADIUS,
        fontSize: 26
    },
    disabled: {
        color: COLORS.BACKGROUND_COLOR,
        opacity: DISABLED_OPACITY,
        backgroundColor: COLORS.SUBTITLE_COLOR
    },
    icon: {
        height: 36,
        width: 36,
        marginRight: 10
    }
};
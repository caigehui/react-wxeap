'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _css = require('antd-mobile/lib/search-bar/style/css');

var _searchBar = require('antd-mobile/lib/search-bar');

var _searchBar2 = _interopRequireDefault(_searchBar);

var _css2 = require('antd-mobile/lib/toast/style/css');

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ListView = require('../ListView');

var _ListView2 = _interopRequireDefault(_ListView);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _constants = require('../../constants');

var COLORS = _interopRequireWildcard(_constants);

var _bind = require('../../app/bind');

var _bind2 = _interopRequireDefault(_bind);

var _router = require('dva/router');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function deprecation() {
    console.warn('Searh组件的instance，hide和show不再使用，请删除相关代码');
}

var Search = (_dec = (0, _bind2.default)(function (state) {
    return state.searchComponent;
}), _dec(_class = (_temp = _class2 = function (_Component) {
    _inherits(Search, _Component);

    function Search(props) {
        _classCallCheck(this, Search);

        var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

        _this.onFetch = function (page, fill) {
            if (!_this.props.content) return fill([], true);
            if (page === 1) _toast2.default.loading('正在搜索', 0);
            // 触发onSearch
            _this.props.onSearch && _this.props.onSearch(_this.props.content, function (list, allLoaded) {
                if (page === 1) _toast2.default.hide();
                _this.props.dispatch({ type: 'searchComponent/save', payload: { isEmpty: list.length === 0 } });
                fill(list, allLoaded);
            }, page);
        };

        _this.renderHeader = function () {
            return _react2.default.createElement(_Header2.default, { label: _this.props.isInit ? _this.props.label : _this.props.notFoundLabel, type: _this.props.isInit ? 'search' : 'search-noresult' });
        };

        _this.onCancel = function () {
            _this.setState({ focused: false });
            _this.props.onCancel && _this.props.onCancel();
            _this.props.dispatch(_router.routerRedux.goBack());
        };

        _this.onFocus = function () {
            _this.setState({ focused: false });
        };

        _this.onSubmit = function (value) {
            // 过滤前后空格
            value = value.replace(/(^\s*)|(\s*$)/g, '');
            _this.listView.fill([], true);
            _this.listView.scrollToTop();
            _this.props.dispatch({ type: 'searchComponent/save', payload: { isInit: !value, content: value } });
            _this.setState({ focused: false });
            _this.listView.reload();
        };

        _this.state = {
            focused: false };
        return _this;
    }

    _createClass(Search, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.autoFocus) {
                this.setState({ focused: true });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { style: _extends({}, styles.container, { height: document.documentElement.clientHeight }) },
                _react2.default.createElement(
                    'div',
                    { style: styles.searchBar },
                    _react2.default.createElement(_searchBar2.default, {
                        focused: this.state.focused,
                        placeholder: this.props.placeholder,
                        onSubmit: this.onSubmit,
                        onFocus: this.onFocus,
                        onCancel: this.onCancel,
                        showCancelButton: true,
                        value: this.props.content,
                        onChange: function onChange(value) {
                            return _this2.props.dispatch({ type: 'searchComponent/save', payload: { content: value } });
                        }
                    })
                ),
                _react2.default.createElement(_ListView2.default, {
                    style: {
                        height: document.documentElement.clientHeight - 120,
                        width: '100%',
                        backgroundColor: 'rgb(245,245,249)'
                    },
                    ref: function ref(o) {
                        return _this2.listView = o;
                    },
                    refreshable: false,
                    listId: 'search',
                    pageSize: 100,
                    renderRow: this.props.renderRow,
                    onFetch: this.onFetch,
                    renderHeader: this.props.isEmpty || this.props.isInit ? this.renderHeader : null,
                    nocache: this.props.isBack ? false : true,
                    stayPosition: this.props.isBack ? true : false,
                    footerHidden: true
                }),
                ';'
            );
        }
    }]);

    return Search;
}(_react.Component), _class2.propTypes = {
    onSearch: _react.PropTypes.func, // 触发搜索
    renderRow: _react.PropTypes.func, // 渲染每一行
    onCancel: _react.PropTypes.func, // 取消查找
    placeholder: _react.PropTypes.string, // 输入框默认的搜索数据
    label: _react.PropTypes.string, // 默认下方icon提示文字
    notFoundLabel: _react.PropTypes.string, // 未找到数据的提示文字
    dispatch: _react.PropTypes.any,
    isEmpty: _react.PropTypes.bool,
    isInit: _react.PropTypes.bool,
    content: _react.PropTypes.string,
    autoFocus: _react.PropTypes.bool,
    isBack: _react.PropTypes.bool
}, _class2.defaultProps = {
    label: '查找内容',
    notFoundLabel: '未找到相关内容',
    placeholder: '搜索'
}, _class2.instance = {
    show: function show() {
        deprecation();
    },
    hide: function hide() {
        deprecation();
    }
}, _class2.show = function () {
    deprecation();
}, _class2.hide = function () {
    deprecation();
}, _temp)) || _class);
exports.default = Search;


var styles = {
    container: {
        width: '100%',
        backgroundColor: COLORS.BACKGROUND_COLOR
    },
    searchBar: {
        paddingTop: 20,
        width: '100%',
        height: 90,
        overflow: 'hidden',
        borderRadius: 5
    }
};
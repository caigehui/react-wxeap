'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/popup/style/css');

var _popup = require('antd-mobile/lib/popup');

var _popup2 = _interopRequireDefault(_popup);

var _css2 = require('antd-mobile/lib/search-bar/style/css');

var _searchBar = require('antd-mobile/lib/search-bar');

var _searchBar2 = _interopRequireDefault(_searchBar);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ListView = require('../ListView');

var _ListView2 = _interopRequireDefault(_ListView);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _constants = require('../../constants');

var COLORS = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_Component) {
    _inherits(Search, _Component);

    function Search(props) {
        _classCallCheck(this, Search);

        var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

        _this.onFetch = function (page, fill) {
            if (!_this.state.content) return fill([], true);
            // 触发onSearch
            _this.props.onSearch && _this.props.onSearch(_this.state.content, function (list, allLoaded) {
                if (!_this.mounted) return;
                _this.setState({ isEmpty: list.length === 0 });
                fill(list, allLoaded);
            }, page);
        };

        _this.renderHeader = function () {
            return _react2.default.createElement(_header2.default, { label: _this.state.isInit ? _this.props.label : _this.props.notFoundLabel, type: _this.state.isInit ? 'search' : 'search-noresult' });
        };

        _this.onCancel = function () {
            _this.setState({ focused: false });
            _this.props.onCancel && _this.props.onCancel();
            Search.instance.hide();
        };

        _this.onFocus = function () {
            _this.setState({ focused: false });
        };

        _this.onSubmit = function (value) {
            // 过滤前后空格
            value = value.replace(/(^\s*)|(\s*$)/g, '');
            if (!value) {
                _this.listView.fill([], true);
                _this.setState({ isInit: true, focused: false, content: '' });
            } else {
                _this.setState({ isInit: false, focused: false, content: value });
            }
            _this.listView.reload();
        };

        _this.state = {
            focused: false, // 输入框是否聚焦
            isEmpty: false, // 搜索结果是否为空
            isInit: true, // 是否初始化
            content: ''
        };
        return _this;
    }

    _createClass(Search, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.setState({ focused: true });
            this.mounted = true;
            window.addEventListener('resize', function () {
                _this2.forceUpdate();
            }, false);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.mounted = false;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

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
                        showCancelButton: true
                    })
                ),
                _react2.default.createElement(_ListView2.default, {
                    style: {
                        height: document.documentElement.clientHeight - 120,
                        width: '100%',
                        backgroundColor: 'rgb(245,245,249)'
                    },
                    ref: function ref(o) {
                        return _this3.listView = o;
                    },
                    refreshable: false,
                    listId: 'search',
                    pageSize: 100,
                    footerHidden: true,
                    renderRow: this.props.renderRow,
                    onFetch: this.onFetch,
                    renderHeader: this.state.isEmpty || this.state.isInit ? this.renderHeader : null,
                    nocache: true
                }),
                ';'
            );
        }
    }]);

    return Search;
}(_react.Component);

Search.instance = _popup2.default.newInstance();

Search.show = function (options) {
    Search.instance.show(_react2.default.createElement(Search, options), { transitionName: 'slide-down' });
};

Search.hide = function () {
    Search.instance.hide();
};

Search.propTypes = {
    onSearch: _react.PropTypes.func, // 触发搜索
    renderRow: _react.PropTypes.func, // 渲染每一行
    onCancel: _react.PropTypes.func, // 取消查找
    placeholder: _react.PropTypes.string, // 输入框默认的搜索数据
    label: _react.PropTypes.string, // 默认下方icon提示文字
    notFoundLabel: _react.PropTypes.string };
Search.defaultProps = {
    label: '查找内容',
    notFoundLabel: '未找到相关内容',
    placeholder: '搜索'
};
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
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/refresh-control/style/css');

var _refreshControl = require('antd-mobile/lib/refresh-control');

var _refreshControl2 = _interopRequireDefault(_refreshControl);

var _css2 = require('antd-mobile/lib/list-view/style/css');

var _listView = require('antd-mobile/lib/list-view');

var _listView2 = _interopRequireDefault(_listView);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobileDetect = require('../../utils/mobileDetect');

var _mobileDetect2 = _interopRequireDefault(_mobileDetect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
    listView: {
        height: document.documentElement.clientHeight - (_mobileDetect2.default.isWechat ? 0 : 90),
        width: document.documentElement.clientWidth,
        backgroundColor: 'rgb(245,245,249)'
    },
    footer: {
        display: 'flex',
        width: '100%',
        height: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
        textAlign: 'center',
        verticalAlign: 'middle'
    },
    sep: {
        height: 1,
        width: '25%',
        backgroundColor: 'rgb(220,220,225)'
    }
};

var cacheData = {};

var _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.reload = function () {
            // 延时处理，防止提前刷新导致数据不到位的情况出现
            setTimeout(function () {
                _this.onRefresh();
            }, 200);
        };

        _this.scrollTo = function (y) {
            _this.listView.scrollTo(0, y);
        };

        _this.fill = function (data, allLoaded, page) {
            try {
                // 作向下兼容处理
                if (!page) {
                    var originData = _this.state.page === 1 ? [] : cacheData[_this.props.listId];
                    _this.setState({
                        dataSource: _this.state.dataSource.cloneWithRows([].concat(_toConsumableArray(originData), _toConsumableArray(data))),
                        refreshing: false,
                        isLoading: false,
                        allLoaded: allLoaded
                    });

                    cacheData[_this.props.listId] = [].concat(_toConsumableArray(originData), _toConsumableArray(data));
                } else {
                    var newData = _this.state.page === 1 ? [] : cacheData[_this.props.listId] || [];
                    newData.splice.apply(newData, [_this.props.pageSize * (page - 1), _this.props.pageSize].concat(_toConsumableArray(data)));
                    _this.setState({
                        dataSource: _this.state.dataSource.cloneWithRows(newData),
                        refreshing: false,
                        isLoading: false,
                        allLoaded: allLoaded
                    });
                    cacheData[_this.props.listId] = newData;
                }
            } catch (err) {
                console.warn(err);
            }
        };

        _this.send = function (page) {
            _this.props.onFetch && _this.props.onFetch(page, _this.fill);
        };

        _this.onEndReached = function () {
            var _this$state = _this.state,
                isLoading = _this$state.isLoading,
                allLoaded = _this$state.allLoaded,
                page = _this$state.page;

            if (isLoading === false && allLoaded === false) {
                if (!cacheData[_this.props.listId] || cacheData[_this.props.listId].length === 0) return; /* 初始化不加载 */
                _this.setState({
                    page: page + 1,
                    isLoading: true
                });
                _this.send(page + 1);
            }
        };

        _this.onRefresh = function () {
            var refreshing = _this.state.refreshing;

            if (refreshing === false) {
                _this.setState({ refreshing: true, page: 1 });
                _this.send(1);
            }
        };

        var dataSource = new _listView2.default.DataSource({
            rowHasChanged: function rowHasChanged() {
                return true;
            }
        });
        if (props.nocache) {
            cacheData[props.listId] = [];
        }
        _this.state = {
            dataSource: dataSource.cloneWithRows(cacheData[props.listId] || []),
            refreshing: false,
            isLoading: false,
            page: 1,
            allLoaded: false
        };
        return _this;
    }

    _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.onRefresh();
        }
    }, {
        key: 'getListData',
        value: function getListData() {
            return cacheData[this.props.listId] || [];
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                header = _props.header,
                pageSize = _props.pageSize,
                renderRow = _props.renderRow,
                refreshable = _props.refreshable,
                allLoadedText = _props.allLoadedText,
                renderHeader = _props.renderHeader;
            var _state = this.state,
                allLoaded = _state.allLoaded,
                isLoading = _state.isLoading,
                refreshing = _state.refreshing;

            var listView = _react2.default.createElement(_listView2.default, _extends({
                ref: function ref(o) {
                    return _this2.listView = o;
                },
                dataSource: this.state.dataSource,
                initialListSize: 0,
                renderHeader: renderHeader || header ? function () {
                    return _react2.default.createElement(
                        'span',
                        null,
                        header
                    );
                } : null,
                renderFooter: function renderFooter() {
                    return _this2.props.footerHidden ? null : _react2.default.createElement(
                        'div',
                        { style: styles.footer },
                        _react2.default.createElement('div', { style: styles.sep }),
                        allLoaded ? allLoadedText : isLoading ? '加载中...' : '加载完毕',
                        _react2.default.createElement('div', { style: styles.sep })
                    );
                },
                renderRow: renderRow,
                pageSize: pageSize,
                scrollRenderAheadDistance: 200,
                scrollEventThrottle: 20,
                scrollerOptions: { scrollbars: true },
                onEndReached: this.onEndReached,
                onEndReachedThreshold: 100,
                refreshControl: refreshable ? _react2.default.createElement(_refreshControl2.default, {
                    refreshing: refreshing,
                    onRefresh: this.onRefresh }) : null
            }, this.props, {
                useZscroller: true,
                style: _extends({}, styles.listView, this.props.style) }));
            return _react2.default.createElement(
                'div',
                null,
                listView
            );
        }
    }]);

    return _class;
}(_react2.default.Component);

_class.propTypes = {
    listId: _react.PropTypes.string.isRequired,
    refreshable: _react.PropTypes.bool,
    header: _react.PropTypes.string,
    renderHeader: _react.PropTypes.func,
    pageSize: _react.PropTypes.number.isRequired,
    renderRow: _react.PropTypes.func.isRequired,
    onFetch: _react.PropTypes.func.isRequired,
    renderSeparator: _react.PropTypes.func,
    allLoadedText: _react.PropTypes.string,
    nocache: _react.PropTypes.bool,
    footerHidden: _react.PropTypes.bool,
    style: _react.PropTypes.object
};
_class.defaultProps = {
    refreshable: true,
    listId: 'temp',
    pageSize: 4,
    allLoadedText: '没有更多了',
    nocache: false,
    footerHidden: false
};
exports.default = _class;
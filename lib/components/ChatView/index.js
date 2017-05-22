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

var _chatview = require('./chatview');

var _chatview2 = _interopRequireDefault(_chatview);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _mobileDetect = require('../../utils/mobileDetect');

var _mobileDetect2 = _interopRequireDefault(_mobileDetect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatView = function (_Component) {
    _inherits(ChatView, _Component);

    function ChatView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ChatView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ChatView.__proto__ || Object.getPrototypeOf(ChatView)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            page: 1,
            data: [],
            allLoaded: false
        }, _this.reload = function () {
            setTimeout(function () {
                _this.setState({ page: 1 });
                _this.send(1);
            }, 200);
        }, _this.send = function (page) {
            _this.props.onFetch && _this.props.onFetch(page, _this.fill);
        }, _this.fill = function (data, allLoaded) {
            var page = _this.state.page;

            if (page === 1) {
                _this.setState({ data: data, allLoaded: allLoaded });
            } else {
                _this.setState({ data: [].concat(_toConsumableArray(_this.state.data), _toConsumableArray(data)), allLoaded: allLoaded });
            }
            _this.resolve && _this.resolve();
        }, _this.onLoad = function () {
            return new Promise(function (resolve) {
                if (_this.state.allLoaded) return;
                _this.resolve = resolve;
                _this.send(_this.state.page + 1);
                _this.setState({ page: _this.state.page + 1 });
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ChatView, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.reload();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                style = _props.style,
                renderRow = _props.renderRow;

            var styles = {
                chatview: {
                    height: document.documentElement.clientHeight - (_mobileDetect2.default.isWechat || _mobileDetect2.default.isApp ? 0 : 90),
                    width: document.documentElement.clientWidth,
                    backgroundColor: 'rgb(245,245,249)',
                    overflowScrolling: 'touch'
                },
                icon: {
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    height: 100,
                    width: document.documentElement.clientWidth,
                    flexDirection: 'row',
                    fontSize: 28,
                    color: 'rgb(160, 160, 160)'
                },
                sep: {
                    height: 1,
                    width: '25%',
                    backgroundColor: 'rgb(220,220,225)'
                }
            };
            return _react2.default.createElement(
                _chatview2.default,
                {
                    style: _extends({}, styles.chatview, style),
                    flipped: true,
                    scrollLoadThreshold: 50,
                    onInfiniteLoad: this.onLoad,
                    loadingSpinnerDelegate: !this.state.allLoaded ? _react2.default.createElement(
                        _View2.default,
                        { style: styles.icon },
                        _react2.default.createElement(_icon2.default, { type: require('../../assets/loading.svg') })
                    ) : _react2.default.createElement(
                        _View2.default,
                        { style: styles.icon },
                        _react2.default.createElement('div', { style: styles.sep }),
                        this.props.allLoadedText,
                        _react2.default.createElement('div', { style: styles.sep })
                    )
                },
                this.state.data.map(function (item, index) {
                    return renderRow(item, index);
                })
            );
        }
    }]);

    return ChatView;
}(_react.Component);

ChatView.propTypes = {
    renderRow: _react.PropTypes.func,
    onFetch: _react.PropTypes.func,
    style: _react.PropTypes.object,
    allLoadedText: _react.PropTypes.string
};
ChatView.defaultProps = {
    style: {},
    allLoadedText: '没有更多了'
};
exports.default = ChatView;
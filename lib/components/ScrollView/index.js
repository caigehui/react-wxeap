'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/list-view/style/css');

var _listView = require('antd-mobile/lib/list-view');

var _listView2 = _interopRequireDefault(_listView);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobileDetect = require('../../utils/mobileDetect');

var _mobileDetect2 = _interopRequireDefault(_mobileDetect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollView = function (_Component) {
    _inherits(ScrollView, _Component);

    function ScrollView(props) {
        _classCallCheck(this, ScrollView);

        var _this = _possibleConstructorReturn(this, (ScrollView.__proto__ || Object.getPrototypeOf(ScrollView)).call(this, props));

        _this.renderRow = function () {
            return null;
        };

        var dataSource = new _listView2.default.DataSource({
            rowHasChanged: function rowHasChanged() {
                return true;
            }
        });
        _this.state = {
            dataSource: dataSource.cloneWithRows([])
        };
        return _this;
    }

    _createClass(ScrollView, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var style = {
                height: document.documentElement.clientHeight - (_mobileDetect2.default.isWechat || _mobileDetect2.default.isApp ? 0 : 90),
                width: document.documentElement.clientWidth,
                backgroundColor: 'transparent'
            };
            return _react2.default.createElement(_listView2.default, {
                style: _extends({}, style, this.props),
                renderHeader: function renderHeader() {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _this2.props.children
                    );
                },
                dataSource: this.state.dataSource,
                useZscroller: true,
                scrollerOptions: { scrollbars: true },
                renderRow: this.renderRow,
                pageSize: 1
            });
        }
    }]);

    return ScrollView;
}(_react.Component);

ScrollView.propTypes = {
    height: _react.PropTypes.number,
    width: _react.PropTypes.number,
    backgroundColor: _react.PropTypes.string,
    children: _react.PropTypes.any
};
exports.default = ScrollView;
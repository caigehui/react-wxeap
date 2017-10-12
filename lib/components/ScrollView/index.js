'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _css = require('antd-mobile/lib/list-view/style/css');

var _listView = require('antd-mobile/lib/list-view');

var _listView2 = _interopRequireDefault(_listView);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MobileDetect = require('../../utils/MobileDetect');

var _MobileDetect2 = _interopRequireDefault(_MobileDetect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollView = (_temp = _class = function (_Component) {
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
            var style = {
                height: this.props.height || document.documentElement.clientHeight - (_MobileDetect2.default.isWechat || _MobileDetect2.default.isApp ? 0 : 90),
                width: this.props.width || document.documentElement.clientWidth,
                backgroundColor: this.props.backgroundColor || 'transparent',
                WebkitOverflowScrolling: 'touch',
                overflow: 'scroll',
                overflowX: 'hidden'
            };
            return _react2.default.createElement(
                'div',
                { style: this.props.style ? _extends({}, style, this.props.style) : style },
                _react2.default.Children.map(this.props.children, function (child) {
                    return child;
                })
            );
        }
    }]);

    return ScrollView;
}(_react.Component), _class.propTypes = {
    height: _react.PropTypes.number,
    width: _react.PropTypes.number,
    backgroundColor: _react.PropTypes.string,
    children: _react.PropTypes.any,
    style: _react.PropTypes.object
}, _temp);
exports.default = ScrollView;
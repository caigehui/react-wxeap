'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _constants = require('../../constants');

var COLORS = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stamp = (_temp2 = _class = function (_Component) {
    _inherits(Stamp, _Component);

    function Stamp() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Stamp);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Stamp.__proto__ || Object.getPrototypeOf(Stamp)).call.apply(_ref, [this].concat(args))), _this), _this.getSize = function () {
            var size = 50;
            var fontSize = 26;
            switch (_this.props.size) {
                case 's':
                    size = 80;
                    fontSize = 23;
                    break;
                case 'm':
                    size = 160;
                    fontSize = 33;
                    break;
                case 'l':
                    size = 300;
                    fontSize = 43;
                    break;
            }
            return { size: size, fontSize: fontSize };
        }, _this.getUrl = function () {
            var url = require('../../assets/stampRed.png');
            switch (_this.props.colorType) {
                case 'red':
                    url = require('../../assets/stampRed.png');
                    break;
                case 'green':
                    url = require('../../assets/stampGreen.png');
                    break;
                case 'blue':
                    url = require('../../assets/stampBlue.png');
                    break;
                case 'yellow':
                    url = require('../../assets/stampYellow.png');
                    break;
                case 'grey':
                    url = require('../../assets/stampGrey.png');
                    break;
            }
            return url;
        }, _this.getColor = function () {
            var color = COLORS.RED_COLOR;
            switch (_this.props.colorType) {
                case 'red':
                    color = COLORS.RED_COLOR;
                    break;
                case 'green':
                    color = COLORS.GREEN_COLOR;
                    break;
                case 'blue':
                    color = COLORS.BLUE_COLOR;
                    break;
                case 'yellow':
                    color = COLORS.YELLOW_COLOR;
                    break;
                case 'grey':
                    color = COLORS.SUBTITLE_COLOR;
                    break;
            }
            return color;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Stamp, [{
        key: 'render',
        value: function render() {
            var url = this.getUrl();
            var color = this.getColor();

            var _getSize = this.getSize(),
                size = _getSize.size,
                fontSize = _getSize.fontSize;

            return _react2.default.createElement(
                _View2.default,
                { style: _extends({}, style.container, { backgroundImage: 'url(' + url + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: size, height: size, top: this.props.top, right: this.props.right }) },
                _react2.default.createElement(
                    'span',
                    { style: { color: color, transform: 'rotate(-15deg)', fontSize: fontSize } },
                    this.props.text
                )
            );
        }
    }]);

    return Stamp;
}(_react.Component), _class.propTypes = {
    colorType: _react.PropTypes.string, // 颜色类型green,red,blue,yellow,grey
    size: _react.PropTypes.oneOf(['s', 'm', 'l']), // 章印大小
    top: _react.PropTypes.number, // 位置距离顶部
    right: _react.PropTypes.number, // 位置——距离右侧
    text: _react.PropTypes.string // 章印内容
}, _class.defaultProps = {
    size: 'm',
    top: 0,
    right: 0,
    text: 'wxsoft',
    colorType: 'red'
}, _temp2);
exports.default = Stamp;

var style = {
    container: {
        width: 150,
        height: 150,
        alignItems: 'center',
        // backgroundColor: '#ffffff',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        top: 50,
        right: 100
    }
};
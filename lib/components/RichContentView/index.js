'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ImageViewer = require('../ImageViewer');

var _ImageViewer2 = _interopRequireDefault(_ImageViewer);

var _constants = require('../../constants');

var COLORS = _interopRequireWildcard(_constants);

var _acc = require('../../utils/acc');

var Acc = _interopRequireWildcard(_acc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RichContentView = function (_React$Component) {
    _inherits(RichContentView, _React$Component);

    function RichContentView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RichContentView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RichContentView.__proto__ || Object.getPrototypeOf(RichContentView)).call.apply(_ref, [this].concat(args))), _this), _this.imgs = [], _this.addImgListener = function () {
            var _loop = function _loop(i) {
                var img = _this.imgs[i];
                var imgEl = document.getElementById(img.id);
                imgEl.addEventListener('click', function () {
                    (0, _ImageViewer2.default)(i, _this.imgs);
                });
            };

            for (var i = 0; i < _this.imgs.length; i++) {
                _loop(i);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RichContentView, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.addImgListener();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.addImgListener();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var data = this.props.content.replace(/font-size:\s*\d*px;/gi, '').replace(/font-size:\s*\d*pt;/gi, '').replace(' alt=""', '');
            var result = '';
            this.imgs = [];

            var _loop2 = function _loop2() {
                if (data.indexOf('<img src="') < 0) {
                    result += data;
                    return 'break';
                }
                result += data.substring(0, data.indexOf('<img src="'));
                data = data.substring(data.indexOf('<img src="') + 10);
                var url = data.substring(0, data.indexOf('"'));
                var id = url.substring(url.lastIndexOf('.') - 18, url.lastIndexOf('.'));
                var newUrl = Acc.getImageFromContent(url);
                if (!_this2.imgs.searchByCondition(function (i) {
                    return i.id === id;
                })) {
                    _this2.imgs = [].concat(_toConsumableArray(_this2.imgs), [{
                        id: id,
                        url: newUrl
                    }]);
                }
                result += '<img id="' + id + '" style="width: 100%;" src="' + newUrl + '">';
                data = data.substring(data.indexOf('/>') + 2);
            };

            while (data.length > 0) {
                var _ret3 = _loop2();

                if (_ret3 === 'break') break;
            }
            return _react2.default.createElement('div', { style: _extends({
                    width: '100%',
                    height: 'auto',
                    backgroundColor: 'white',
                    color: COLORS.TITLE_COLOR,
                    paddingTop: 20,
                    fontSize: 30,
                    paddingBottom: 20,
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all'
                }, this.props.style), dangerouslySetInnerHTML: {
                    __html: result
                } });
        }
    }]);

    return RichContentView;
}(_react2.default.Component);

RichContentView.propTypes = {
    content: _react2.default.PropTypes.string,
    style: _react2.default.PropTypes.object
};
RichContentView.defaultProps = {
    content: '暂无内容',
    style: {}
};
exports.default = RichContentView;
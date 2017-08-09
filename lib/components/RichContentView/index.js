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

var _ImageViewer = require('../ImageViewer');

var _ImageViewer2 = _interopRequireDefault(_ImageViewer);

var _constants = require('../../constants');

var COLORS = _interopRequireWildcard(_constants);

var _Acc = require('../../utils/Acc');

var Acc = _interopRequireWildcard(_Acc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RichContentView = (_temp2 = _class = function (_React$Component) {
    _inherits(RichContentView, _React$Component);

    function RichContentView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RichContentView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RichContentView.__proto__ || Object.getPrototypeOf(RichContentView)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            content: _this.props.content
        }, _this.imgs = [], _this.addImgListener = function () {
            var _loop = function _loop(i) {
                var img = _this.imgs[i];

                // 快速克隆移除所有listener：https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
                var oldImgEl = document.getElementById(img.id);
                var newImgEl = oldImgEl.cloneNode(true);
                oldImgEl.parentNode.replaceChild(newImgEl, oldImgEl);

                var onImgClick = function onImgClick() {
                    if (_this.props.onImageClick) {
                        _this.props.onImageClick(i, img.url);
                    } else {
                        (0, _ImageViewer2.default)(i, _this.imgs);
                    }
                };
                newImgEl.addEventListener('click', onImgClick);
            };

            for (var i = 0; i < _this.imgs.length; i++) {
                _loop(i);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RichContentView, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // 防止表单出现改变
            if (!this.props.enableContentChange) {
                if (this.state.content === '') {
                    this.setState({ content: nextProps.content });
                }
            } else {
                if (this.state.content !== nextProps.content) {
                    this.setState({ content: nextProps.content });
                }
            }
        }
    }, {
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

            var data = this.state.content.replace(/font-size:\s*\d*px;/gi, '').replace(/font-size:\s*\d*pt;/gi, '').replace(/ alt=""/gi, '');
            var result = '';
            this.imgs = [];
            var currentId = 0;
            while (data.length > 0) {
                if (data.indexOf('<img src="') < 0) {
                    result += data;
                    break;
                }
                result += data.substring(0, data.indexOf('<img src="'));
                data = data.substring(data.indexOf('<img src="') + 10);
                var url = data.substring(0, data.indexOf('"'));
                var newUrl = Acc.getImageFromContent(url);
                if (!this.imgs.searchByCondition(function (i) {
                    return i.id === _this2.props.contentId + '-' + currentId;
                })) {
                    this.imgs = [].concat(_toConsumableArray(this.imgs), [{
                        id: this.props.contentId + '-' + currentId,
                        url: newUrl
                    }]);
                }
                result += this.props.isFixImgHeight ? '<img id="' + (this.props.contentId + '-' + currentId) + '" style="height: 200px; object-fit: contain;" src="' + newUrl + '" />' : '<img id="' + (this.props.contentId + '-' + currentId) + '" style="width: 100%;" src="' + newUrl + '" />';
                currentId++;
                data = data.substring(data.indexOf('/>') < 0 ? data.indexOf('>') + 1 : data.indexOf('/>') + 2);
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
                    wordBreak: 'break-word'
                }, this.props.style), dangerouslySetInnerHTML: {
                    __html: result
                },
                contentEditable: this.props.editable,
                onInput: function onInput(e) {
                    _this2.props.onChange && _this2.props.onChange(e.target.innerHTML);
                } });
        }
    }]);

    return RichContentView;
}(_react2.default.Component), _class.propTypes = {
    content: _react2.default.PropTypes.string,
    style: _react2.default.PropTypes.object,
    editable: _react2.default.PropTypes.bool,
    onChange: _react2.default.PropTypes.func,
    contentId: _react2.default.PropTypes.string,
    enableContentChange: _react2.default.PropTypes.bool,
    onImageClick: _react2.default.PropTypes.func,
    isFixImgHeight: _react2.default.PropTypes.bool
}, _class.defaultProps = {
    content: '暂无内容',
    style: {},
    editable: false,
    contentId: 'temp',
    enableContentChange: false
}, _temp2);
exports.default = RichContentView;
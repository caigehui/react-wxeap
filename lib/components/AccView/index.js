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

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _ImageViewer = require('../ImageViewer');

var _ImageViewer2 = _interopRequireDefault(_ImageViewer);

var _constants = require('../../constants');

var COLORS = _interopRequireWildcard(_constants);

var _acc = require('../../utils/acc');

var Acc = _interopRequireWildcard(_acc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccView = function (_React$Component) {
    _inherits(AccView, _React$Component);

    function AccView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AccView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AccView.__proto__ || Object.getPrototypeOf(AccView)).call.apply(_ref, [this].concat(args))), _this), _this.getFileType = function (fileName) {
            return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        }, _this.onAccClick = function (acc) {
            var url = API.substring(0, API.length - 6);
            // 获取文件后缀名，如果是图片文件就调用图片文件的组件预览，否则就跳转至预览页面
            var filetype = _this.getFileType(acc.oName);
            if (filetype === 'png' || filetype === 'jpg' || filetype === 'jpeg' || filetype === 'gif') (0, _ImageViewer2.default)(0, [{ url: url + 'Service/WxGetFile.ashx?hash=' + acc.hash }]);else window.location.href = Acc.getPreviewPath(acc.id);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AccView, [{
        key: 'getFileImg',
        value: function getFileImg(acc) {
            var url = API.substring(0, API.length - 6);
            var filetype = this.getFileType(acc.oName);
            if (filetype === 'png' || filetype === 'jpg' || filetype === 'jpeg' || filetype === 'gif') {
                return url + 'Service/WxGetFile.ashx?imgSize=small&hash=' + acc.hash;
            } else if (filetype === 'txt') return url + 'Images/Yunpan/txt80.png';else if (filetype === 'xls' || filetype === 'xlsx') return url + 'Images/Yunpan/Xls80.png';else if (filetype === 'doc' || filetype === 'docx') return url + 'Images/Yunpan/Doc80.png';else if (filetype === 'pptx' || filetype === 'ppt') return url + 'Images/Yunpan/PPT80.png';else if (filetype === 'zip' || filetype === 'rar') return url + 'Images/Yunpan/Zip80.png';else if (filetype === 'pdf') return url + 'Images/Yunpan/PDF80.png';else return url + 'Images/Yunpan/Unknown80.png';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var accs = this.props.accs;

            return _react2.default.createElement(
                _View2.default,
                { style: _extends({}, styles.container, { height: 40 * 2 + 80 + 100 * accs.length + 20 }) },
                _react2.default.createElement(
                    _View2.default,
                    { style: _extends({}, styles.card, { height: 80 + 100 * accs.length + 20 }) },
                    _react2.default.createElement(
                        _View2.default,
                        { style: styles.labelRow },
                        _react2.default.createElement('img', { src: require('../../assets/acc.png'), style: styles.icon }),
                        _react2.default.createElement(
                            _View2.default,
                            { style: styles.label },
                            '\u9644\u4EF6'
                        )
                    ),
                    accs.map(function (acc, i) {
                        return _react2.default.createElement(
                            _View2.default,
                            { key: i, style: _extends({}, styles.accRow, { borderBottom: i === accs.length - 1 ? '0' : '1px solid ' + COLORS.BORDER_COLOR }), onClick: function onClick() {
                                    return _this2.onAccClick(acc);
                                } },
                            _react2.default.createElement('img', { src: _this2.getFileImg(acc), style: styles.fileImg }),
                            _react2.default.createElement(
                                _View2.default,
                                { style: _extends({}, styles.label, { color: COLORS.TITLE_COLOR }) },
                                acc.oName,
                                _react2.default.createElement(
                                    'span',
                                    { style: styles.size },
                                    '(' + parseInt(acc.size / 1024) + 'KB)'
                                )
                            ),
                            _react2.default.createElement(
                                _View2.default,
                                { style: styles.arrow },
                                _react2.default.createElement(_icon2.default, { type: 'right', color: COLORS.SUBTITLE_COLOR, size: 'md' })
                            )
                        );
                    })
                )
            );
        }
    }]);

    return AccView;
}(_react2.default.Component);

AccView.propTypes = {
    accs: _react2.default.PropTypes.array
};
AccView.defaultProps = {
    accs: []
};
exports.default = AccView;


var styles = {
    container: {
        width: '100%',
        backgroundColor: COLORS.BACKGROUND_COLOR
    },
    card: {
        boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.2)',
        borderRadius: 8,
        backgroundColor: 'white',
        flexDirection: 'column',
        marginTop: 40,
        marginLeft: 40,
        marginRight: 40,
        flex: 1,
        overflow: 'hidden'
    },
    labelRow: {
        alignItems: 'center',
        height: 80,
        width: '100%'
    },
    icon: {
        height: 40,
        width: 40,
        marginLeft: 30
    },
    label: {
        fontSize: 30,
        color: COLORS.SUBTITLE_COLOR,
        marginLeft: 10,
        flex: 1,
        height: '100%',
        alignItems: 'center',
        overflow: 'hidden'
    },
    accRow: {
        marginLeft: 30,
        width: '100%',
        height: 100,
        alignItems: 'center'
    },
    fileImg: {
        width: 60,
        height: 60,
        borderRadius: 8
    },
    size: {
        color: COLORS.SUBTITLE_COLOR,
        marginLeft: 10,
        fontSize: 28
    },
    arrow: {
        marginRight: 40,
        width: 40,
        height: 40,
        marginBottom: 10
    }
};
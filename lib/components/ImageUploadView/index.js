'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/toast/style/css');

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compressImage = require('../../utils/compressImage');

var _compressImage2 = _interopRequireDefault(_compressImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageUploadView = function (_React$Component) {
    _inherits(ImageUploadView, _React$Component);

    function ImageUploadView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ImageUploadView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ImageUploadView.__proto__ || Object.getPrototypeOf(ImageUploadView)).call.apply(_ref, [this].concat(args))), _this), _this.getOrientation = function (file, callback) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var view = new DataView(e.target.result);
                if (view.getUint16(0, false) !== 0xFFD8) {
                    return callback(-2);
                }
                var length = view.byteLength;
                var offset = 2;
                while (offset < length) {
                    var marker = view.getUint16(offset, false);
                    offset += 2;
                    if (marker === 0xFFE1) {
                        var tmp = view.getUint32(offset += 2, false);
                        if (tmp !== 0x45786966) {
                            return callback(-1);
                        }
                        var little = view.getUint16(offset += 6, false) === 0x4949;
                        offset += view.getUint32(offset + 4, little);
                        var tags = view.getUint16(offset, little);
                        offset += 2;
                        for (var i = 0; i < tags; i++) {
                            if (view.getUint16(offset + i * 12, little) === 0x0112) {
                                return callback(view.getUint16(offset + i * 12 + 8, little));
                            }
                        }
                    } else if ((marker & 0xFF00) !== 0xFF00) {
                        break;
                    } else {
                        offset += view.getUint16(offset, false);
                    }
                }
                return callback(-1);
            };
            reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
        }, _this.onFileChange = function () {
            var fileSelectorEl = _this.refs.fileSelectorInput;
            if (fileSelectorEl.files && fileSelectorEl.files.length) {
                var file = fileSelectorEl.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    var dataURL = e.target.result;
                    if (!dataURL) {
                        _toast2.default.fail('图片获取失败');
                        return;
                    }

                    var orientation = 1;
                    // 获取图片的方向
                    _this.getOrientation(file, function (res) {
                        // -2: not jpeg , -1: not defined
                        if (res > 0) {
                            orientation = res;
                        }
                        // 压缩图片
                        (0, _compressImage2.default)(dataURL, orientation, _this.props.maxWidth, function (url) {
                            _this.props.onImagePicked && _this.props.onImagePicked(url);
                        });

                        fileSelectorEl.value = '';
                    });
                };
                reader.readAsDataURL(file);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // 获取图片的正确方向


    _createClass(ImageUploadView, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                renderContent = _props.renderContent,
                style = _props.style;

            return _react2.default.createElement(
                'div',
                { style: _extends({}, style, { position: 'relative' }) },
                _react2.default.createElement('input', {
                    style: {
                        opacity: 0,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        right: 0
                    },
                    ref: 'fileSelectorInput',
                    type: 'file',
                    accept: 'image/jpg,image/jpeg,image/png,image/gif',
                    onChange: this.onFileChange
                }),
                renderContent()
            );
        }
    }]);

    return ImageUploadView;
}(_react2.default.Component);

ImageUploadView.propTypes = {
    renderContent: _react.PropTypes.func,
    onImagePicked: _react.PropTypes.func,
    style: _react.PropTypes.object,
    maxWidth: _react.PropTypes.number
};
ImageUploadView.defaultProps = {
    style: {},
    maxWidth: 1080
};
exports.default = ImageUploadView;
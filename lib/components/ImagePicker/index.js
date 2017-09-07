'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _css = require('antd-mobile/lib/image-picker/style/css');

var _imagePicker = require('antd-mobile/lib/image-picker');

var _imagePicker2 = _interopRequireDefault(_imagePicker);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compressImage = require('../../utils/compressImage');

var _compressImage2 = _interopRequireDefault(_compressImage);

var _MobileDetect = require('../../utils/MobileDetect');

var MobileDetect = _interopRequireWildcard(_MobileDetect);

var _ImageViewer = require('../ImageViewer');

var _ImageViewer2 = _interopRequireDefault(_ImageViewer);

var _MessageBridge = require('../../utils/MessageBridge');

var _MessageBridge2 = _interopRequireDefault(_MessageBridge);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImagePickerCompress = (_temp2 = _class = function (_React$Component) {
    _inherits(ImagePickerCompress, _React$Component);

    function ImagePickerCompress() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ImagePickerCompress);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ImagePickerCompress.__proto__ || Object.getPrototypeOf(ImagePickerCompress)).call.apply(_ref, [this].concat(args))), _this), _this.onShowImagePicker = function () {
            _MessageBridge2.default.postMessage({
                type: 'onShowImagePicker'
            });
        }, _this.onImagePicked = function (message) {
            if (message.type === 'onImagePicked') {
                (0, _compressImage2.default)(message.payload.imageData, 1, _this.props.maxWidth, function (url) {
                    _this.props.onChange && _this.props.onChange([].concat(_toConsumableArray(_this.props.files), [{ url: url, orientation: 1 }]), 'add', _this.props.files.length);
                });
            }
        }, _this.onChange = function (files, type, index) {
            if (type === 'add') {
                (0, _compressImage2.default)(files[files.length - 1].url, files[files.length - 1].orientation, _this.props.maxWidth, function (url) {
                    files[files.length - 1].url = url;
                    files[files.length - 1].orientation = 1;
                    _this.props.onChange && _this.props.onChange(files, type, index);
                });
            } else {
                _this.props.onChange && _this.props.onChange(files, type, index);
            }
        }, _this.onImageClick = function (index, files) {
            var imageEls = document.getElementsByClassName('am-image-picker-item-content');
            // 可能会因为多个ImagePicker在一个页面而出现定位问题
            (0, _ImageViewer2.default)(index, files, imageEls[index]);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ImagePickerCompress, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            /**
             * 兼容部分安卓机的相机拍照
             */
            if (MobileDetect.isAndroid) {
                var cameras = document.querySelectorAll('input[type=\'file\']');
                for (var i = 0; i < cameras.length; i++) {
                    cameras[i].setAttribute('capture', 'camera');
                }
            }
            /**
             * 在App使用原生相机
             */
            if (MobileDetect.isApp) {
                var _cameras = document.querySelectorAll('input[type=\'file\']');
                for (var _i = 0; _i < _cameras.length; _i++) {
                    _cameras[_i].setAttribute('type', 'button');
                }
                this.btn = document.getElementsByClassName('am-image-picker-item am-image-picker-upload-btn');
                this.btn && this.btn[0] && this.btn[0].addEventListener('click', this.onShowImagePicker);
                _MessageBridge2.default.addMessageListener(this.onImagePicked);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.btn && this.btn[0] && this.btn[0].removeEventListener('click', this.onShowImagePicker);
            _MessageBridge2.default.removeMessageListener(this.onImagePicked);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_imagePicker2.default, _extends({}, this.props, { onImageClick: this.onImageClick, onChange: this.onChange }));
        }
    }]);

    return ImagePickerCompress;
}(_react2.default.Component), _class.propTypes = {
    maxWidth: _react2.default.PropTypes.number,
    onChange: _react2.default.PropTypes.func,
    files: _react2.default.PropTypes.array
}, _class.defaultProps = {
    maxWidth: 512
}, _temp2);
exports.default = ImagePickerCompress;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/image-picker/style/css');

var _imagePicker = require('antd-mobile/lib/image-picker');

var _imagePicker2 = _interopRequireDefault(_imagePicker);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compressImage = require('../../utils/compressImage');

var _compressImage2 = _interopRequireDefault(_compressImage);

var _MobileDetect = require('../../utils/MobileDetect');

var _MobileDetect2 = _interopRequireDefault(_MobileDetect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImagePickerCompress = function (_React$Component) {
    _inherits(ImagePickerCompress, _React$Component);

    function ImagePickerCompress() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ImagePickerCompress);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ImagePickerCompress.__proto__ || Object.getPrototypeOf(ImagePickerCompress)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (files, type, index) {
            if (type === 'add') {
                (0, _compressImage2.default)(files[files.length - 1].url, files[files.length - 1].orientation, _this.props.maxWidth, function (url) {
                    files[files.length - 1].url = url;
                    files[files.length - 1].orientation = 1;
                    _this.props.onChange(files, type, index);
                });
            } else {
                _this.props.onChange(files, type, index);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ImagePickerCompress, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (_MobileDetect2.default.isAndroid) {
                var cameras = document.querySelector('input[type=\'file\']');
                for (var i = 0; i < cameras.length; i++) {
                    cameras[i].setAttribute('capture', 'camera');
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_imagePicker2.default, _extends({}, this.props, { onChange: this.onChange }));
        }
    }]);

    return ImagePickerCompress;
}(_react2.default.Component);

ImagePickerCompress.propTypes = {
    maxWidth: _react2.default.PropTypes.number,
    onChange: _react2.default.PropTypes.func
};
ImagePickerCompress.defaultProps = {
    maxWidth: 1080
};
exports.default = ImagePickerCompress;
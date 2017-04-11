'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/image-picker/style/css');

var _imagePicker = require('antd-mobile/lib/image-picker');

var _imagePicker2 = _interopRequireDefault(_imagePicker);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ImagePickerCompress;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compressImage = require('../../util/compressImage');

var _compressImage2 = _interopRequireDefault(_compressImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ImagePickerCompress(props) {
    var onChange = function onChange(files, type, index) {
        if (type === 'add') {
            (0, _compressImage2.default)(files[files.length - 1].url, 1024, function (url) {
                files[files.length - 1].url = url;
                props.onChange(files, type, index);
            });
        }
    };
    return _react2.default.createElement(_imagePicker2.default, _extends({}, props, { onChange: onChange }));
}
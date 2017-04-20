'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/popup/style/css');

var _popup = require('antd-mobile/lib/popup');

var _popup2 = _interopRequireDefault(_popup);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPinchZoomPan = require('react-pinch-zoom-pan');

var _reCarousel = require('re-carousel');

var _reCarousel2 = _interopRequireDefault(_reCarousel);

var _IndicatorDots = require('./IndicatorDots');

var _IndicatorDots2 = _interopRequireDefault(_IndicatorDots);

var _wrapProps = require('../../utils/wrapProps');

var _wrapProps2 = _interopRequireDefault(_wrapProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 图片预览
// 直接调用WxPhotoGallery.show(initIndex, imgs)


var styles = {
    carouselContainer: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#000'
    },
    img: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        backgroundColor: '#000',
        objectFit: 'contain'
    },
    imgsContainer: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    }
};

var ImageViewer = function (_React$Component) {
    _inherits(ImageViewer, _React$Component);

    function ImageViewer() {
        _classCallCheck(this, ImageViewer);

        return _possibleConstructorReturn(this, (ImageViewer.__proto__ || Object.getPrototypeOf(ImageViewer)).apply(this, arguments));
    }

    _createClass(ImageViewer, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                imgs = _props.imgs,
                initIndex = _props.initIndex;

            var newImgs = [];
            imgs.map(function (img, i) {
                if (i >= initIndex) newImgs.push(img);
            });
            imgs.map(function (img, i) {
                if (i < initIndex) newImgs.push(img);
            });
            var items = newImgs.map(function (img, i) {
                return _react2.default.createElement(
                    _reactPinchZoomPan.PinchView,
                    { key: i, backgroundColor: 'transparent', maxScale: 2, containerRatio: document.documentElement.clientHeight * 100 / document.documentElement.clientWidth },
                    _react2.default.createElement('img', { style: styles.img, src: img.url })
                );
            });

            return _react2.default.createElement(
                'div',
                { style: styles.carouselContainer, onClick: _popup2.default.hide },
                _react2.default.createElement(_reCarousel2.default, { indicator: _IndicatorDots2.default, frames: items })
            );
        }
    }]);

    return ImageViewer;
}(_react2.default.Component);

/**
 * 预览图片
 *
 * @param  {int} initIndex   初始位置
 * @param  {array} imgs  图片数组
 */


ImageViewer.propTypes = {
    imgs: _react2.default.PropTypes.array,
    initIndex: _react2.default.PropTypes.number
};

exports.default = function (initIndex, imgs) {
    _popup2.default.show(_react2.default.createElement(ImageViewer, { imgs: imgs, initIndex: initIndex }), { transitionName: 'am-zoom', wrapProps: _wrapProps2.default });
};
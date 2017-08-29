'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/popup/style/css');

var _popup = require('antd-mobile/lib/popup');

var _popup2 = _interopRequireDefault(_popup);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

exports.default = show;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wrapProps = require('../../utils/wrapProps');

var _wrapProps2 = _interopRequireDefault(_wrapProps);

var _reactPhotoswipe = require('react-photoswipe');

require('./photoswipe.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 预览图片
 * @param {number} initIndex 
 * @param {array} imgs 
 */
function show(initIndex, imgs, imgEl) {
    _popup2.default.show(_react2.default.createElement(ImageViewer, { imgs: imgs, imgEl: imgEl, initIndex: initIndex }), { wrapProps: _wrapProps2.default, transitionName: 'none' });
}

var ImageViewer = (_temp = _class = function (_React$Component) {
    _inherits(ImageViewer, _React$Component);

    function ImageViewer(props) {
        _classCallCheck(this, ImageViewer);

        var _this = _possibleConstructorReturn(this, (ImageViewer.__proto__ || Object.getPrototypeOf(ImageViewer)).call(this, props));

        _this.handleClose = function () {
            _popup2.default.hide();
        };

        var h = [];

        var _loop = function _loop(i) {
            var img = props.imgs[i];
            var myImg = new Image();
            myImg.src = img.url;
            if (myImg.complete) {
                // 如果有缓存，则按比例返回高度
                h.push(document.documentElement.clientWidth * (myImg.height * 1.00 / myImg.width));
            } else {
                // 如果没有缓存，则直接返回0，等待异步返回高度
                myImg.onload = function () {
                    var myH = _this.state.h;
                    myH[i] = document.documentElement.clientWidth * (myImg.height * 1.00 / myImg.width);
                    _this.setState({
                        h: myH
                    });
                };
                h.push(0);
            }
        };

        for (var i = 0; i < props.imgs.length; i++) {
            _loop(i);
        }

        _this.state = {
            h: h,
            isOpen: true
        };

        return _this;
    }

    _createClass(ImageViewer, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _popup2.default.hide();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            // 监听窗口大小的变化
            window.addEventListener('resize', function () {
                _this2.forceUpdate();
            }, false);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { style: { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight } },
                _react2.default.createElement(_reactPhotoswipe.PhotoSwipe, {
                    isOpen: this.state.isOpen,
                    items: this.props.imgs.map(function (img, index) {
                        return {
                            src: img.url,
                            msrc: img.thumb || img.url,
                            h: _this3.state.h[index],
                            w: document.documentElement.clientWidth
                        };
                    }),
                    options: {
                        index: this.props.initIndex,
                        shareEl: false,
                        closeEl: false,
                        loop: false,
                        fullscreenEl: false,
                        maxSpreadZoom: 3,
                        getThumbBoundsFn: this.props.imgEl ? function () {
                            var rect = _this3.props.imgEl.getBoundingClientRect();
                            return { x: rect.left, y: rect.top, w: rect.width };
                        } : undefined
                    },
                    close: this.handleClose })
            );
        }
    }]);

    return ImageViewer;
}(_react2.default.Component), _class.propTypes = {
    imgs: _react2.default.PropTypes.array,
    initIndex: _react2.default.PropTypes.number,
    imgEl: _react2.default.PropTypes.any
}, _temp);
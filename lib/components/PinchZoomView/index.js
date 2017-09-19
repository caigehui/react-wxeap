'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */


var posX = 0,
    posY = 0,
    scale = 1,
    last_scale = 1,
    last_posX = 0,
    last_posY = 0,
    max_pos_x = 0,
    max_pos_y = 0,
    transform = '';

function hammerIt(elm) {
    var hammertime = new Hammer(elm, {});
    hammertime.get('pinch').set({
        enable: true
    });

    var el = elm;

    hammertime.on('doubletap pan pinchmove pinchend pinchcancel panend', function (ev) {
        // pan    
        if (scale != 1) {
            posX = last_posX + ev.deltaX;
            posY = last_posY + ev.deltaY;
            max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
            max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
            if (posX > max_pos_x) {
                posX = max_pos_x;
            }
            if (posX < -max_pos_x) {
                posX = -max_pos_x;
            }
            if (posY > max_pos_y) {
                posY = max_pos_y;
            }
            if (posY < -max_pos_y) {
                posY = -max_pos_y;
            }
        }

        // pinch
        if (ev.type === 'pinchmove') {
            scale = Math.max(.999, Math.min(last_scale * ev.scale, 4));
        }
        if (ev.type === 'pinchend' || ev.type === 'pinchcancel') {
            last_scale = scale;
        }

        // panend
        if (ev.type === 'panend') {
            last_posX = posX < max_pos_x ? posX : max_pos_x;
            last_posY = posY < max_pos_y ? posY : max_pos_y;
        }

        if (scale !== 1) {
            transform = 'translate3d(' + posX + 'px,' + posY + 'px, 0) ' + 'scale3d(' + scale + ', ' + scale + ', 1)';
        }

        if (transform) {
            el.style.webkitTransform = transform;
        }
    });
}

var PinchZoomView = function (_React$Component) {
    _inherits(PinchZoomView, _React$Component);

    function PinchZoomView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PinchZoomView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PinchZoomView.__proto__ || Object.getPrototypeOf(PinchZoomView)).call.apply(_ref, [this].concat(args))), _this), _this.setScale = function (s) {
            scale = s;
            _this.refs['pinch-zoom-view'].style.webkitTransform = 'translate3d(0px, ' + Math.ceil((s - 1) * _this.refs['pinch-zoom-view'].clientHeight / 2) + 'px, 0) ' + 'scale3d(' + s + ', ' + s + ', 1)';
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PinchZoomView, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            hammerIt(this.refs['pinch-zoom-view']);
        }

        /**
         * 设置缩放
         * @param {number} scale 
         */

    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { ref: 'pinch-zoom-view' },
                this.props.children
            );
        }
    }]);

    return PinchZoomView;
}(_react2.default.Component);

exports.default = PinchZoomView;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
var wrapProps = void 0;
if (isIPhone) {
  wrapProps = {
    onTouchMove: function onTouchMove(e) {
      return e.preventDefault();
    }
  };
}

exports.default = wrapProps;
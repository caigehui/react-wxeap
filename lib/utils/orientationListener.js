'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OrientationListener;
/**
 * 监听手机屏幕旋转
 * @param {func} onChange 
 */
function OrientationListener(onChange) {
  window.addEventListener('resize', onChange, false);
}
'use strict';

/**
 * 监听屏幕旋转，刷新页面
 */
window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function () {
  location.reload(false);
}, false);

/**
 * 监听屏幕旋转，刷新页面
 */
window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', () => {
    location.reload(false);
}, false);
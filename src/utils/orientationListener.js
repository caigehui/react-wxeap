/**
 * 监听手机屏幕旋转
 * @param {func} onChange 
 */
export default function OrientationListener(onChange) {
    window.addEventListener('resize', onChange, false);
}


const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchMove: e => e.preventDefault(),
  };
}
/**
 * 防止点击穿透
 */
export default wrapProps;
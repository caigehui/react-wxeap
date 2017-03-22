/**
 * effects中进行延时处理
 * 用法： yield call(delay, 1000) //延时1秒
 * @param {number} timeout 
 */
export default function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
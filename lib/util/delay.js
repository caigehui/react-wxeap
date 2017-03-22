"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = delay;
/**
 * effects中进行延时处理
 * 用法： yield call(delay, 1000) //延时1秒
 * @param {number} timeout 
 */
function delay(timeout) {
  return new Promise(function (resolve) {
    setTimeout(resolve, timeout);
  });
};
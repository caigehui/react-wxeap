"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = htmlFilter;

/**
 * 过滤HTML标签和常见转义字符
 * @param {string} str 
 */
function htmlFilter(str) {
    var start_ptn = /<\/?[^>]*>/g; //过滤标签开头
    var end_ptn = /[ | ]*\n/g; //过滤标签结束
    var nbsp_ptn = /&nbsp;/ig;
    var quot_ptn = /&quot;/ig;
    var amp_ptn = /&amp;/ig;
    var lt_ptn = /&lt;/ig;
    var gt_ptn = /&gt;/ig;
    return str.replace(start_ptn, "").replace(end_ptn, '').replace(nbsp_ptn, "").replace(quot_ptn, '"').replace(amp_ptn, "&").replace(lt_ptn, "<").replace(gt_ptn, ">");
}
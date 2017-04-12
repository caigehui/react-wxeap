'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = htmlFilter;

/**
 * 过滤HTML标签和常见转义字符
 * @param {string} str 
 */
function htmlFilter(str) {
    var p_ptn = /<\/p>/gi;
    var wrap_ptn = /<br\s*\/?>/gi;
    var start_ptn = /<\/?[^>]*>/g; //过滤标签开头
    var nbsp_ptn = /&nbsp;/ig;
    var quot_ptn = /&quot;/ig;
    var amp_ptn = /&amp;/ig;
    var lt_ptn = /&lt;/ig;
    var gt_ptn = /&gt;/ig;
    return str.replace(p_ptn, '\r\n').replace(wrap_ptn, '\r\n').replace(start_ptn, "").replace(nbsp_ptn, "").replace(quot_ptn, '"').replace(amp_ptn, "&").replace(lt_ptn, "<").replace(gt_ptn, ">");
}
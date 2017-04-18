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
    var pptn = /<\/p>/gi;
    var wrapptn = /<br\s*\/?>/gi;
    var startptn = /<\/?[^>]*>/g; //过滤标签开头
    var nbspptn = /&nbsp;/ig;
    var quotptn = /&quot;/ig;
    var ampptn = /&amp;/ig;
    var ltptn = /&lt;/ig;
    var gtptn = /&gt;/ig;
    return str.replace(pptn, '\r\n').replace(wrapptn, '\r\n').replace(startptn, '').replace(nbspptn, '').replace(quotptn, '"').replace(ampptn, '&').replace(ltptn, '<').replace(gtptn, '>');
}

/**
 * 过滤HTML标签和常见转义字符
 * @param {string} str 
 */
export default function htmlFilter(str) {
    let pptn = /<\/p>/gi;
    let wrapptn = /<br\s*\/?>/gi;
    let startptn = /<\/?[^>]*>/g;      // 过滤标签开头
    let nbspptn = /&nbsp;/ig;
    let quotptn = /&quot;/ig;
    let ampptn = /&amp;/ig;
    let ltptn = /&lt;/ig;
    let gtptn = /&gt;/ig;
    return str.replace(pptn, '\r\n').replace(wrapptn, '\r\n').replace(startptn, '').replace(nbspptn, '').replace(quotptn, '"').replace(ampptn, '&').replace(ltptn, '<').replace(gtptn, '>');
}
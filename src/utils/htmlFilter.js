
/**
 * 过滤HTML标签和常见转义字符
 * @param {string} str 
 */
export default function htmlFilter(str) {
    let p_ptn = /<\/p>/gi;
    let wrap_ptn = /<br\s*\/?>/gi;
    let start_ptn = /<\/?[^>]*>/g;      //过滤标签开头
    let nbsp_ptn = /&nbsp;/ig;
    let quot_ptn = /&quot;/ig;
    let amp_ptn = /&amp;/ig;
    let lt_ptn = /&lt;/ig;
    let gt_ptn = /&gt;/ig;
    return str.replace(p_ptn, '\r\n').replace(wrap_ptn, '\r\n').replace(start_ptn, "").replace(nbsp_ptn, "").replace(quot_ptn, '"').replace(amp_ptn, "&").replace(lt_ptn, "<").replace(gt_ptn, ">")
}
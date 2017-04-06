
/**
 * 过滤HTML标签和常见转义字符
 * @param {string} str 
 */
export default function htmlFilter(str) {
    let start_ptn = /<\/?[^>]*>/g;      //过滤标签开头
    let end_ptn = /[ | ]*\n/g;           //过滤标签结束
    let nbsp_ptn = /&nbsp;/ig;
    let quot_ptn = /&quot;/ig;
    let amp_ptn = /&amp;/ig;
    let lt_ptn = /&lt;/ig;
    let gt_ptn = /&gt;/ig;
    return str.replace(start_ptn, "").replace(end_ptn, '').replace(nbsp_ptn, "").replace(quot_ptn, '"').replace(amp_ptn, "&").replace(lt_ptn, "<").replace(gt_ptn, ">")
}
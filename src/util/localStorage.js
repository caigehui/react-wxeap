
/**
 * 保存本地数据
 * @param {string} key 
 * @param {string} id 
 * @param {object} value 
 */
export function save(key, id, value) {
    const tableStr = localStorage[key];
    let table = tableStr ? JSON.parse(tableStr) : {};
    table[id] = value;
    localStorage[key] = JSON.stringify(table);
}

/**
 * 获取本地数据
 * @param {string} key 
 * @param {string} id 
 */
export function get(key, id) {
    const tableStr = localStorage[key];
    if (!tableStr) throw Error('不存在key：', key);
    const table = JSON.parse(tableStr);
    return table[id];
}

/**
 * 清除数据
 * @param {string} key 
 * @param {string} id 
 */
export function clean(key, id) {
    const tableStr = localStorage[key];
    if (!tableStr) return;
    const table = JSON.parse(tableStr);
    if(!table[id]) return;
    table[id] = null;
    localStorage[key] = JSON.stringify(table);
}
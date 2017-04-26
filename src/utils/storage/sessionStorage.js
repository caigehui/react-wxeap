
/**
 * 保存用户设置
 * @param {string} key 
 * @param {any} value 
 */
export function saveUserDefault(key, value) {
    sessionStorage[key] = value;
}

/**
 * 获取用户设置
 * @param {string} key 
 * @param {any} def 
 */
export function getUserDefault(key, def) {
    return sessionStorage[key] || def;
}

/**
 * 保存本地数据
 * @param {string} key 
 * @param {string} id 
 * @param {object} value 
 */
export function saveData(key, id, value) {
    const tableStr = sessionStorage[key];
    let table = tableStr ? JSON.parse(tableStr) : {};
    table[id] = value;
    sessionStorage[key] = JSON.stringify(table);
}

/**
 * 获取本地数据
 * @param {string} key 
 * @param {string} id 
 */
export function getData(key, id, def) {
    const tableStr = sessionStorage[key];
    if (!tableStr) return def;
    const table = JSON.parse(tableStr);
    if(!table[id]) return def;
    return table[id];
}

/**
 * 清除数据
 * @param {string} key 
 * @param {string} id 
 */
export function cleanData(key, id) {
    const tableStr = sessionStorage[key];
    if (!tableStr) return;
    const table = JSON.parse(tableStr);
    if(!table[id]) return;
    table[id] = null;
    sessionStorage[key] = JSON.stringify(table);
}

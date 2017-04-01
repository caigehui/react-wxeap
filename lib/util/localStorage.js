'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.save = save;
exports.get = get;
exports.clean = clean;

/**
 * 保存本地数据
 * @param {string} key 
 * @param {string} id 
 * @param {object} value 
 */
function save(key, id, value) {
    var tableStr = localStorage[key];
    var table = tableStr ? JSON.parse(tableStr) : {};
    table[id] = value;
    localStorage[key] = JSON.stringify(table);
}

/**
 * 获取本地数据
 * @param {string} key 
 * @param {string} id 
 */
function get(key, id) {
    var tableStr = localStorage[key];
    if (!tableStr) throw Error('不存在key：', key);
    var table = JSON.parse(tableStr);
    return table[id];
}

/**
 * 清除数据
 * @param {string} key 
 * @param {string} id 
 */
function clean(key, id) {
    var tableStr = localStorage[key];
    if (!tableStr) return;
    var table = JSON.parse(tableStr);
    if (!table[id]) return;
    table[id] = null;
    localStorage[key] = JSON.stringify(table);
}
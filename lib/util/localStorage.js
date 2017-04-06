"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveUserDefault = saveUserDefault;
exports.getUserDefault = getUserDefault;
exports.saveData = saveData;
exports.getData = getData;
exports.cleanData = cleanData;

/**
 * 保存用户设置
 * @param {string} key 
 * @param {any} value 
 */
function saveUserDefault(key, value) {
  localStorage[key] = value;
}

/**
 * 获取用户设置
 * @param {string} key 
 * @param {any} def 
 */
function getUserDefault(key, def) {
  return localStorage[key] || def;
}

/**
 * 保存本地数据
 * @param {string} key 
 * @param {string} id 
 * @param {object} value 
 */
function saveData(key, id, value) {
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
function getData(key, id, def) {
  var tableStr = localStorage[key];
  if (!tableStr) return def;
  var table = JSON.parse(tableStr);
  if (!table[id]) return def;
  return table[id];
}

/**
 * 清除数据
 * @param {string} key 
 * @param {string} id 
 */
function cleanData(key, id) {
  var tableStr = localStorage[key];
  if (!tableStr) return;
  var table = JSON.parse(tableStr);
  if (!table[id]) return;
  table[id] = null;
  localStorage[key] = JSON.stringify(table);
}
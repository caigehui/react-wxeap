import { compareObject } from './object';
/**
 * 返回移除后的数组，不更改原数组
 * @param {function} condition 
 */
Array.prototype.removeByCondition = function (condition) {
    let temp = [];
    for (let i of this) {
        if (condition(i)) continue;
        temp.push(i);
    }
    return temp
}

/**
 * 返回第一个满足条件的元素
 * @param {function} condition 
 */
Array.prototype.findByCondition = function (condition) {
    for (let i of this) {
        if (condition(i)) return i;
    }
    return null
}

/**
 * 如果满足条件，返回true, 否则false
 * @param {*} condition 
 */
Array.prototype.searchByCondition = function (condition) {
    for (let i of this) {
        if (condition(i)) return true;
    }
    return false
}

/**
 * 移除一个或者多个对象
 */
Array.prototype.removeObjects = function (...objects) {
    if (!objects) return this
    let temp = [];
    for (let i of this) {
        let add = true;
        for (let o of objects) {
            if (compareObject(i, o)) add = false;
        }
        if (add) temp.push(i);
    }
    return temp
}

/**
 * 返回移除后的数组，不更改原数组
 * @param {function} condition 
 */
Array.prototype.removeByCondition = function(condition) {
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
Array.prototype.findByCondition = function(condition) {
    let temp = [];
    for(let i of this) {
        if(condition(i)) return i;
    }
    return null
}

/**
 * 如果满足条件，返回true, 否则false
 * @param {*} condition 
 */
Array.prototype.searchByCondition = function(condition) {
    let temp = [];
    for(let i of this) {
        if(condition(i)) return true;
    }
    return false
}
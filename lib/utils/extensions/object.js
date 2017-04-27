'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.compareObject = compareObject;
/**
 * 比较两个对象是否相同
 * @param {object} x 
 * @param {object} y 
 */
function compareObject(x, y) {
    if (x === y) {
        return true;
    }
    if (!(x instanceof Object) || !(y instanceof Object)) {
        return false;
    }
    if (x.constructor !== y.constructor) {
        return false;
    }
    for (var p in x) {
        if (x.hasOwnProperty(p)) {
            if (!y.hasOwnProperty(p)) {
                return false;
            }
            if (x[p] === y[p]) {
                continue;
            }
            if (_typeof(x[p]) !== 'object') {
                return false;
            }
            if (!Object.equals(x[p], y[p])) {
                return false;
            }
        }
    }
    for (var r in y) {
        if (y.hasOwnProperty(r) && !x.hasOwnProperty(r)) {
            return false;
        }
    }
    return true;
}
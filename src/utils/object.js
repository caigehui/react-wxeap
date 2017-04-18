/**
 * 比较两个对象是否相同
 * @param {object} x 
 * @param {object} y 
 */
export function compareObject(x, y) {
    if (x === y) {
        return true;
    }
    if (!(x instanceof Object) || !(y instanceof Object)) {
        return false;
    }
    if (x.constructor !== y.constructor) {
        return false;
    }
    for (let p in x) {
        if (x.hasOwnProperty(p)) {
            if (!y.hasOwnProperty(p)) {
                return false;
            }
            if (x[p] === y[p]) {
                continue;
            } 
            if (typeof (x[p]) !== 'object') {
                return false;
            }
            if (!Object.equals(x[p], y[p])) {
                return false;
            }
        }
    }
    for (let r in y) {
        if (y.hasOwnProperty(r) && !x.hasOwnProperty(r)) {
            return false;
        }
    }
    return true;
}

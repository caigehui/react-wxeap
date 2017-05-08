'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = bind;

var _dva = require('dva');

var _rcForm = require('rc-form');

var _constants = require('../constants');

/**
 * 绑定视图到应用中
 * options可选值：createForm
 * @param {function} mapStateToProps 
 * @param {object} options 
 */
function bind(mapStateToProps) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return function (component) {
        var enhancedComponent = (0, _dva.connect)(mapStateToProps)(component);
        if (_constants.IS_WEB) {
            if (options.createForm) {
                enhancedComponent = (0, _rcForm.createForm)()(enhancedComponent);
            }
        }
        return enhancedComponent;
    };
}
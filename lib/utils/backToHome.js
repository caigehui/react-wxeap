'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = backToHome;

var _constants = require('../constants');

function backToHome() {
    if (_constants.DEV_MODE) {
        var config = require('../../../../config/default.json');
        return location.href = config.origin + '/Base/Main/WxTouchMain.aspx';
    }
    return location.href = EAP + 'Base/Main/WxTouchMain.aspx';
}
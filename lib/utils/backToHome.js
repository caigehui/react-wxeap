'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = backToHome;

var _constant = require('../constant');

function backToHome() {
    if (_constant.DEV_MODE) {
        var config = require('../../../../config/default.json');
        return location.href = config.origin + '/Base/Main/WxTouchMain.aspx';
    }
    return location.href = EAP + 'Base/Main/WxTouchMain.aspx';
}
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = backToHome;
function backToHome() {
    location.href = API.slice(0, API.indexOf('wxapi')) + 'Base/Main/Mobile/index.html';
}
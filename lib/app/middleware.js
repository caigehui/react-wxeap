'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locationChangeMiddleware = undefined;

var _css = require('antd-mobile/lib/toast/style/css');

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _css2 = require('antd-mobile/lib/popup/style/css');

var _popup = require('antd-mobile/lib/popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//redux中间件

//监听路由变化，取消全局Modal
var locationChangeMiddleware = exports.locationChangeMiddleware = function locationChangeMiddleware() {
  return function (next) {
    return function (action) {
      if (action.type === '@@router/LOCATION_CHANGE') {
        _popup2.default.hide();
        _toast2.default.hide();
      }
      return next(action);
    };
  };
};
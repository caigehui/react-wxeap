'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd-mobile/lib/toast/style/css');

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = request;

var _fetch = require('dva/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  var error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function validation(responseJson) {
  if (responseJson && responseJson.ret === 0) {
    return { data: responseJson.data || {}, err: null };
  } else {
    throw responseJson.err;
  }
}

function exception(err) {
  _toast2.default.info('\u670D\u52A1\u5668\u9519\u8BEF\uFF1A' + err);
  console.warn(err);
  return { data: null, err: err };
}

/**
 * 发送网络请求，如果是POST请求需要传递bodyObject
 * @param {string} url 
 * @param {object} bodyObject 
 */
function request(url, bodyObject) {
  var options = { credentials: 'include' };
  if (bodyObject) options = _extends({
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObject)
  }, options);
  return (0, _fetch2.default)(url, options).then(checkStatus).then(parseJSON).then(validation).catch(exception);
}
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

var _backToHome = require('../utils/backToHome');

var _backToHome2 = _interopRequireDefault(_backToHome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onLine = window.navigator.onLine;

window.addEventListener('online', function () {
	onLine = true;
	_toast2.default.info('网络恢复', 2);
}, false);

window.addEventListener('offline', function () {
	onLine = false;
	_toast2.default.fail('网络断开', 2);
}, false);

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
	if (!responseJson) throw '网络异常，请重新登录';

	var result = responseJson.result;

	switch (result) {
		case 0:
			// 请求成功
			delete responseJson.result;
			responseJson.errmsg && delete responseJson.errmsg;
			return { data: responseJson || {}, err: null };
		case 4001:
			// 会话丢失，刷新页面
			_toast2.default.info('连接超时', 2, function () {
				(0, _backToHome2.default)();
			});
			return { data: null, err: '连接超时' };
		default:
			_toast2.default.info(responseJson.errmsg, 2);
			throw responseJson.errmsg;
	}
}

function exception(err) {
	console.error(err);
	return { data: null, err: err };
}

function offLine() {
	return new Promise(function (resolve) {
		resolve({ data: null, err: '无网络连接' });
	});
}

/**
 * 发送网络请求，如果是POST请求需要传递bodyObject
 * @param {string} url 
 * @param {object} bodyObject 
 */
function request(url, bodyObject) {
	if (!onLine) return offLine();
	var options = { credentials: 'include' };
	if (bodyObject) options = _extends({
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(bodyObject)
	}, options);
	return (0, _fetch2.default)(url, options).then(checkStatus).then(parseJSON).then(validation).catch(exception);
}
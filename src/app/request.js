import fetch from 'dva/fetch';
import { Toast } from 'antd-mobile';
import backToHome from '../utils/backToHome';

let onLine = window.navigator.onLine;

window.addEventListener('online', () => {
	onLine = true;
	Toast.info('网络恢复', 2);
}, false);

window.addEventListener('offline', () => {
	onLine = false;
	Toast.fail('网络断开', 2);
}, false);


function parseJSON(response) {
	return response.json();
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

function validation(responseJson) {
	if (!responseJson) throw '网络异常，请重新登录';

	const result = responseJson.result;

	switch (result) {
		case 0: // 请求成功
			delete responseJson.result;
			responseJson.errmsg && delete responseJson.errmsg;
			return { data: responseJson || {}, err: null };
		case 4001: // 会话丢失，刷新页面
			Toast.info('连接超时', 2, () => {
				backToHome();
			});
			return { data: null, err: '连接超时'};
		default:
			Toast.info(responseJson.errmsg, 2);
			throw responseJson.errmsg;
	}
}

function exception(err) {
	console.error(err);
	return { data: null, err };
}

function offLine() {
  return new Promise(resolve => {
    resolve({ data: null, err: '无网络连接' });
  });
}


/**
 * 发送网络请求，如果是POST请求需要传递bodyObject
 * @param {string} url 
 * @param {object} bodyObject 
 */
export default function request(url, bodyObject) {
	if(!onLine) return offLine();
	let options = { credentials: 'include' };
	if (bodyObject) options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(bodyObject),
		...options
	};
	return fetch(url, options)
		.then(checkStatus)
		.then(parseJSON)
		.then(validation)
		.catch(exception);
}

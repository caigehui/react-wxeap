import fetch from 'dva/fetch';
import { Toast } from 'antd-mobile';

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
  if (responseJson && responseJson.ret === 0) {
    return { data: responseJson.data || {}, err: null }
  } else {
    throw responseJson.err;
  }
}

function exception(err) {
  if(err === '未将对象引用设置到对象的实例') {
    Toast.info(`服务器错误：请求超时，请刷新页面`);
  }else {
    Toast.info(`服务器错误：${err}`);
  }
  console.warn(err)
  return { data: null, err }
}


/**
 * 发送网络请求，如果是POST请求需要传递bodyObject
 * @param {string} url 
 * @param {object} bodyObject 
 */
export default function request(url, bodyObject) {
  let options = { credentials: 'include' };
  if (bodyObject) options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObject),
    ...options
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(validation)
    .catch(exception);
}

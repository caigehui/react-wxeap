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
  Toast.info(`服务器错误：${err}`);
  console.warn(err)
  return { data: null, err }
}

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

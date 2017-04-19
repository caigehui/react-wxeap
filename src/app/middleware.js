import { Popup, Toast } from 'antd-mobile';
// redux中间件

// 监听路由变化，取消全局Modal
export const locationChangeMiddleware = () => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    Popup.hide();
    Toast.hide();
  }
  return next(action);
};
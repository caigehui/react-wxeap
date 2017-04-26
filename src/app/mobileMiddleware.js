import { Popup, Toast, ActionSheet } from 'antd-mobile';
// redux中间件

// 监听路由变化，取消全局Modal
export default () => next => action => {
	if (action.type === '@@router/LOCATION_CHANGE') {
		Popup.hide();
		Toast.hide();
		ActionSheet.close();
	}
	return next(action);
};
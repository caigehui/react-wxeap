import { Popup, Toast, ActionSheet } from 'antd-mobile';
import { REHYDRATE } from 'redux-persist/constants';

export default store => next => action => {
	if (action.type === '@@router/LOCATION_CHANGE') {
		// 监听路由变化，取消全局Modal
		Popup.hide();
		Toast.hide();
		ActionSheet.close();
	}else if(action.type === REHYDRATE) {
		// 恢复数据
		for(let i in action.payload) {
			if(i === REHYDRATE) continue;
			store.dispatch({ type: `${i}/save`, payload: action.payload[i] });
		}
	}
	return next(action);
};
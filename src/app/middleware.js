import { REHYDRATE } from 'redux-persist/constants';

export default store => next => action => {
	if(action.type === REHYDRATE) {
		// 恢复数据
		for(let i in action.payload) {
			if(i === REHYDRATE) continue;
			store.dispatch({ type: `${i}/save`, payload: action.payload[i] });
		}
	}
	return next(action);
};
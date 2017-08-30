import { Popup, Toast, ActionSheet } from 'antd-mobile';
import { REHYDRATE } from 'redux-persist/constants';

export const rehydrateMiddleware = store => next => action => {
	if (action.type === REHYDRATE) {
		// 恢复数据
		for (let i in action.payload) {
			if (i === REHYDRATE) continue;
			store.dispatch({ type: `${i}/save`, payload: action.payload[i] });
		}
	}
	next(action);
};

export const routingMiddleware = store => next => action => {
	const state = store.getState();
	if (!state.routing.locationBeforeTransitions || action.type !== '@@router/LOCATION_CHANGE') return next(action);
	next(action);

	for (let model in state) {
		if (state[model]._pathname === state.routing.locationBeforeTransitions.pathname) {
			if (action.payload.action === 'POP') {
				store.dispatch({
					type: `${model}/routeDidPop`,
					payload: {
						current: state.routing.locationBeforeTransitions,
						next: action.payload
					}
				});
			} else if (action.payload.action === 'PUSH') {
				store.dispatch({
					type: `${model}/routeDidPush`,
					payload: {
						current: state.routing.locationBeforeTransitions,
						next: action.payload
					}
				});
			} else if (action.payload.action === 'REPLACE') {
				store.dispatch({
					type: `${model}/routeDidReplace`,
					payload: {
						current: state.routing.locationBeforeTransitions,
						next: action.payload
					}
				});
			}
		} else if (state[model]._pathname === action.payload.pathname) {
			if (action.payload.action === 'POP') {
				store.dispatch({
					type: `${model}/onPopToRoute`,
					payload: {
						current: action.payload,
						before: state.routing.locationBeforeTransitions
					}
				});
			} else if (action.payload.action === 'PUSH') {
				store.dispatch({
					type: `${model}/onPushToRoute`,
					payload: {
						current: action.payload,
						before: state.routing.locationBeforeTransitions
					}
				});
			} else if (action.payload.action === 'REPLACE') {
				store.dispatch({
					type: `${model}/onReplaceToRoute`,
					payload: {
						current: action.payload,
						before: state.routing.locationBeforeTransitions
					}
				});
			}
		}
	}

	Popup.hide();
	Toast.hide();
	ActionSheet.close();
};
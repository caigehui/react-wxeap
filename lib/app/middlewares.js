'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.routingMiddleware = exports.rehydrateMiddleware = undefined;

var _css = require('antd-mobile/lib/action-sheet/style/css');

var _actionSheet = require('antd-mobile/lib/action-sheet');

var _actionSheet2 = _interopRequireDefault(_actionSheet);

var _css2 = require('antd-mobile/lib/popup/style/css');

var _popup = require('antd-mobile/lib/popup');

var _popup2 = _interopRequireDefault(_popup);

var _constants = require('redux-persist/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rehydrateMiddleware = exports.rehydrateMiddleware = function rehydrateMiddleware(store) {
	return function (next) {
		return function (action) {
			if (action.type === _constants.REHYDRATE) {
				// 恢复数据
				for (var i in action.payload) {
					if (i === _constants.REHYDRATE) continue;
					store.dispatch({ type: i + '/save', payload: action.payload[i] });
				}
			}
			next(action);
		};
	};
};

var routingMiddleware = exports.routingMiddleware = function routingMiddleware(store) {
	return function (next) {
		return function (action) {
			var state = store.getState();
			if (action.type !== '@@router/LOCATION_CHANGE') return next(action);
			next(action);

			for (var model in state) {
				if (model === 'routing' || model === '@@dva') continue;
				if (!state.routing.locationBeforeTransitions) {
					state[model]._pathname === action.payload.pathname && store.dispatch({
						type: model + '/onPushToRoute',
						payload: {
							current: action.payload,
							before: null
						}
					});
					continue;
				}
				if (state[model]._pathname === state.routing.locationBeforeTransitions.pathname) {
					if (action.payload.action === 'POP') {
						store.dispatch({
							type: model + '/routeDidPop',
							payload: {
								current: state.routing.locationBeforeTransitions,
								next: action.payload
							}
						});
					} else if (action.payload.action === 'PUSH') {
						store.dispatch({
							type: model + '/routeDidPush',
							payload: {
								current: state.routing.locationBeforeTransitions,
								next: action.payload
							}
						});
					} else if (action.payload.action === 'REPLACE') {
						store.dispatch({
							type: model + '/routeDidReplace',
							payload: {
								current: state.routing.locationBeforeTransitions,
								next: action.payload
							}
						});
					}
				}
				if (state[model]._pathname === action.payload.pathname) {
					if (action.payload.action === 'POP') {
						store.dispatch({
							type: model + '/onPopToRoute',
							payload: {
								current: action.payload,
								before: state.routing.locationBeforeTransitions
							}
						});
					} else if (action.payload.action === 'REPLACE') {
						store.dispatch({
							type: model + '/onReplaceToRoute',
							payload: {
								current: action.payload,
								before: state.routing.locationBeforeTransitions
							}
						});
					} else {
						store.dispatch({
							type: model + '/onPushToRoute',
							payload: {
								current: action.payload,
								before: state.routing.locationBeforeTransitions
							}
						});
					}
				}
			}

			_popup2.default.hide();
			_actionSheet2.default.close();
		};
	};
};
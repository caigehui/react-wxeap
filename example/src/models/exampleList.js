// import { submit, query } from '../services/index';

export default {

	namespace: 'exampleList',

	state: {
		layoutKey: [],
		popupKey: [],
		dataEntryKey: [],
		dataDisplayKey: [],
		combinationKey: [],
		position: 0// 保存离开主页时的位置
	},

	subscriptions: {
		setup({ history }) {
			return history.listen(() => {
				// if (pathname === '/') {}
			});
		},
	},

	effects: {

	},

	reducers: {
		save(state, action) {
			return { ...state, ...action.payload };
		},
	},

	// 是否自动恢复state
	// persist: true
};

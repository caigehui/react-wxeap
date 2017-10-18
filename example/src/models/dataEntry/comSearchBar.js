import { SearchEmp } from '../../services/index';

export default {

	namespace: 'comSearchBar',

	state: {
        emps: []
    },

	subscriptions: {
		setup({ history }) {
			return history.listen(() => {
				// if (pathname === '/') {}
			});
		},
	},

	effects: {
		*searchEmp({ payload: { value, fill } }, { call }) {
            const { emps, err } = yield call(SearchEmp, { content: value });
			if (err) return;
			yield fill(emps, true);
		}
	},

	reducers: {
		save(state, action) {
			return { ...state, ...action.payload };
		},
	},

	// 是否自动恢复state
	// persist: true
};

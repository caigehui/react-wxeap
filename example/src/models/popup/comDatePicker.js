// import { submit, query } from '../services/index';
// import { delay } from 'react-wxeap';

export default {

	namespace: 'comDatePicker',

	state: {
        date: {
            label: '全部日期',
            start: '',
            end: '',
            type: ''
        },
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

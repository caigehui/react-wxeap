// import { submit, query } from '../services/index';
// import { delay } from 'react-wxeap';

export default {

	namespace: 'comFilterBar',

	state: {
                conditions: [ 
            [{ label: '全部状态', value: '全部状态' },{ label: '生效', value: '生效' },{ label: '待生效', value: '待生效' }],
            [{ label: '已读', value: '已读' }],
            [{ label: '全部日期', value: '全部日期' },],],
            statusValues: ['全部状态'],
			dateValues: ['全部日期'],
			date: {
            label: '全部日期',
            start: '',
            end: '',
            type: ''
		},
		isReaded: true,
		isReadedValues: ['已读']
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

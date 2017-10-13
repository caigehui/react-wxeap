import { QueryList } from '../../services/index';
import { delay } from 'react-wxeap';
import { PAGE_SIZE } from '../../constants';
export default {

	namespace: 'comChatView',

	state: {
		chatList: []
	},

	subscriptions: {
		setup({ history }) {
			return history.listen(() => {
				// if (pathname === '/') {}
			});
		},
	},

	effects: {
        *queryList({ payload: { page, fill } }, { call }) {
            yield call(delay, 200);
			const { chatList, err } = yield call(QueryList, { page, });
            if (err) return fill([], true);
            fill(chatList, chatList.length < PAGE_SIZE, page);
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
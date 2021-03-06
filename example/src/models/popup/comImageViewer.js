// import { submit, query } from '../services/index';
// import { delay } from 'react-wxeap';

export default {

	namespace: 'comImageViewer',

	state: {
        avaImgs: [
            {url: require('../../assets/image1.jpg')},
			{url: require('../../assets/image2.jpg')},
			{url: require('../../assets/image3.jpg')},
        ]
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

// import { submit, query } from '../services/index';
// import { delay } from 'react-wxeap';

export default {

	namespace: 'comAccView',

	state: {
		accs: [
			{
				hash: 'AF1E4326240D01F064BB138BF325793A',
				oName: '图片.png',
				size: 41231
		},
			{
				hash: '',
				oName: 'Excel文档.xlsx',
				size: 9879
		},
			{
				hash: '',
				oName: 'PPT文档.pptx',
				size: 29642
		},
			{
				hash: '',
				oName: 'pdf文档.pdf',
				size: 360282
		},
			{
				hash: '',
				oName: '压缩文件.zip',
				size: 22
		},
			{
				hash: '',
				oName: '其它格式.jnt',
				size: 4544
		},
			{
				hash: '',
				oName: 'Word文档.docx',
				size: 11612
		},
			{
				hash: '',
				oName: 'text文档.txt',
				size: 4
		},
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

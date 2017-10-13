// import { submit, query } from '../services/index';
// import { delay } from 'react-wxeap';

export default {

	namespace: 'comOrgPicker',

	state: {
        id: 0,// 人员单选个人id
        name: '',// 人员单选个人name
        emps: [],// 人员多选人员集合
        empId: '',// 人员多选个人id
        empName: '',// 人员多选个人name
        dpts: [],// 部门选择集合
        radioDptId: '',// 部门单选部门id
        radioDptName: '',// 部门单选部门名称
        dptId: '',
        dptName: '',
        companyId: 0,// 公司id
        companyName: '',// 公司名称
        childCmpId: '',
        childCmpName: '',
        currentCmpId: '',
        currentCmpName: '',


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

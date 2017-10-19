export default {
    
        namespace: 'searchComponent',
    
        state: {
            onSearch: () => ({}),
            renderRow: () => ({}),
            onCancel: () => ({}),
            label: '查找内容',
            notFoundLabel: '未找到相关内容',
            placeholder: '搜索',
            isEmpty: false, // 搜索结果是否为空
            isInit: true, // 是否初始化
            content: '',
            autoFocus: true, // 自动聚焦
            isBack: false,
            searchCondition: [],// 所有查询条件
            condition: []// 当前选中的查询条件[{label:'',value:''}]
        },
        effects: {
            *onPushToRoute({ payload: { current, before } }, { put,select }) {
                const state = yield select(state => state.searchComponent);
                if (!state.onSearch) {
                    yield put({
                        type: 'save',
                        payload: {
                            autoFocus: false,
                            isBack: true
                        }
                    });
                }else{
                    yield put({
                        type: 'save',
                        payload: {
                            content: '',
                            autoFocus: true,
                            isInit: true,
                            isEmpty: false,
                            isBack: true,
                            condition: [],
                        }
                    });
                }
                
            },
            // *onPopToRoute({ payload: { before, current } }, { put,select }) {
            //     const state = yield select(state => state.searchComponent);
            //     console.log(state);
            // },
            // *routeDidPop({ payload: { current, next } }, { put }) {
            //     yield put({
            //         type: 'save',
            //         payload: {
            //           condition:[],
            //         }
            //     });
            // }
        },
        reducers: {
            save(state, action) {
                return { ...state, ...action.payload };
            }
        },
        // 是否自动恢复state
        // persist: true
    };
    
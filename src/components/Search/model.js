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
        isBack: false
    },

    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(({ pathname, state }) => {
                if (pathname === '/SearchComponent') {
                    if (!state.onSearch) return dispatch({
                        type: 'save',
                        payload: {
                            autoFocus: false,
                            isBack: true
                        }
                    });
                    dispatch({
                        type: 'save',
                        payload: {
                            ...state,
                            content: '',
                            autoFocus: true,
                            isInit: true,
                            isEmpty: false,
                            isBack: true
                        }
                    });
                }
            });
        }
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },
    effects: {

    }
};

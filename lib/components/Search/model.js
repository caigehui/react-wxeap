'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = {

    namespace: 'searchComponent',

    state: {
        onSearch: function onSearch() {
            return {};
        },
        renderRow: function renderRow() {
            return {};
        },
        onCancel: function onCancel() {
            return {};
        },
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
        setup: function setup(_ref) {
            var history = _ref.history,
                dispatch = _ref.dispatch;

            return history.listen(function (_ref2) {
                var pathname = _ref2.pathname,
                    state = _ref2.state;

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
                        payload: _extends({}, state, {
                            content: '',
                            autoFocus: true,
                            isInit: true,
                            isEmpty: false,
                            isBack: true
                        })
                    });
                }
            });
        }
    },
    reducers: {
        save: function save(state, action) {
            return _extends({}, state, action.payload);
        }
    },
    effects: {}
};
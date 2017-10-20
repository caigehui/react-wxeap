const defaultStatues = [
    {
        value: '',
        label: '全部状态'
    },
    // {
    //     value: '确认',
    //     label: '待启动'
    // },
    {
        value: '确认,进行中',
        label: '未完成'
    },
    {
        value: '暂停',
        label: '暂停'
    },
    {
        value: '待评审',
        label: '待评审'
    },
    {
        value: '完成',
        label: '完成'
    }
];

const defaultStatuValue = ['确认,进行中'];
const defaultIsLastGrade = false;
const defaultDate = {
    label: '全部日期',
    start: '',
    end: '',
    type: ''
};

const defaultRadio = {
    type: 'radio',
    name: '测试radio',
    data: [
        {
            value: true,
            label: 'test  radio'
        }
    ]
};

const defaultList = {
    type: 'list',
    name: '测试list',
    data: [
        {
            value: '',
            label: '全部状态'
        },
        {
            value: '确认,进行中',
            label: '未完成'
        },
        {
            value: '暂停',
            label: '暂停'
        },
        {
            value: '待评审',
            label: '待评审'
        },
        {
            value: '完成',
            label: '完成'
        }
    ]
};

const defaultCustom = {
    type: 'custom',
    name: '测试custom'
};

const defaultDatePro = {
    type: 'date',
    name: '测试date'
};
export default {

    namespace: 'comFilterBarPro',

    state: {
        status: defaultStatues,
        statuValue: defaultStatuValue,
        isLastGrade: defaultIsLastGrade,
        date: defaultDate,
        conditionsPro: [defaultRadio, defaultList, defaultCustom, defaultDatePro]
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
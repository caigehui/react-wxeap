import React, { PropTypes } from 'react';
import { Popup, Tabs, Icon } from 'antd-mobile';
import View from '../View';
import moment from 'moment';

const TabPane = Tabs.TabPane;

const row1 = [
    '今日',
    '昨日',
    '本周'
];

const row2 = [
    '上周',
    '本月',
    '上月'
];

class DatePicker extends React.Component {

    static propTypes = {
        onSelect: PropTypes.func,
        checked: PropTypes.object,
        format: PropTypes.string
    }

    static defaultProps = {
        checked: {
            label: '自定义日期', // 标签
            start: '2017-05-25', // 开始日期
            end: '2017-05-25', // 结束日期
            type: '' // 自定义的类型
        },
        format: 'YYYY-MM-DD'
    }

    constructor(props) {
        super(props);

        // 初始化日期业务模型
        this.state = {
            checked: props.checked, // 已选择的日期
            isCustomDate: false, // 是否自定义日期范围
            tab: (() => {  // 当前自定义日期范围的类型
                switch (props.checked.type) {
                    case '日历':
                        return '1';
                    case '周历':
                        return '2';
                    case '月历':
                        return '3';
                    case '季度':
                        return '4';
                    default:
                        return '1';
                }
            })(),
            currents: (() => { // 自定义日期范围的年月时间点
                let current = props.checked.start ? moment(props.checked.start, props.format) : moment();
                return [current, current, current, current];
            })(),
            selectedDate: {
                start: props.checked.start ? moment(props.checked.start, props.format) : '',
                end: props.checked.end ? moment(props.checked.end, props.format) : ''
            }

        };
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.forceUpdate();
        }, false);
    }

    /**
     * 点击各个Item
     */
    onClick = (label) => {
        if (label === '自定义日期') return this.setState({ isCustomDate: true });
        const { format } = this.props;
        const checked = {
            label,
            start: (() => {
                switch (label) {
                    case '今日':
                        return moment().format(format);
                    case '昨日':
                        return moment().subtract(1, 'days').format(format);
                    case '本周':
                        return moment().startOf('week').format(format);
                    case '上周':
                        return moment().subtract(1, 'weeks').startOf('week').format(format);
                    case '本月':
                        return moment().startOf('month').format(format);
                    case '上月':
                        return moment().subtract(1, 'months').startOf('month').format(format);
                    default:
                        return '';
                }
            })(),
            end: (() => {
                switch (label) {
                    case '今日':
                        return moment().format(format);
                    case '昨日':
                        return moment().subtract(1, 'days').format(format);
                    case '本周':
                        return moment().endOf('week').format(format);
                    case '上周':
                        return moment().subtract(1, 'weeks').endOf('week').format(format);
                    case '本月':
                        return moment().endOf('month').format(format);
                    case '上月':
                        return moment().subtract(1, 'months').endOf('month').format(format);
                    default:
                        return '';
                }
            })(),
            type: ''
        };
        this.setState({
            checked
        });
        setTimeout(() => {
            this.props.onSelect && this.props.onSelect(checked);
            Popup.hide();
        }, 200);
    }

    /**
     * 选项卡发生改变
     */
    onTabChange = (key) => {
        this.setState({
            tab: key
        });
    }

    /**
     * 清空日期
     */
    cleanSelectedDate = () => {
        this.setState({
            selectedDate: {
                start: '',
                end: ''
            }
        });
    }

    /**
     * 自定义日期范围点击确定
     */
    onSelectDate = () => {

        const { selectedDate, tab } = this.state;
        const { format } = this.props;
        const checked = {
            label: '自定义日期',
            start: (() => {
                switch (tab) {
                    case '1':
                        return selectedDate.start.format(format);
                    case '2':
                        return selectedDate.start.startOf('week').format(format);
                    case '3':
                        return selectedDate.start.startOf('month').format(format);
                    case '4':
                        return selectedDate.start.startOf('quarter').format(format);
                }
            })(),
            end: (() => {
                switch (tab) {
                    case '1':
                        return selectedDate.end.format(format);
                    case '2':
                        return selectedDate.end.endOf('week').format(format);
                    case '3':
                        return selectedDate.end.endOf('month').format(format);
                    case '4':
                        return selectedDate.end.endOf('quarter').format(format);
                }
            })(),
            type: (() => {
                switch (tab) {
                    case '1':
                        return '日历';
                    case '2':
                        return '周历';
                    case '3':
                        return '月历';
                    case '4':
                        return '季度';
                }
            })()
        };
        this.props.onSelect && this.props.onSelect(checked);
        Popup.hide();
    }

    /**
     * 渲染日历和周历
     */
    renderCalendar = (isDay) => {
        const { currents } = this.state;
        const selectedDate = {
            start: moment(this.state.selectedDate.start),
            end: moment(this.state.selectedDate.end)
        };
        let current = isDay ? currents[0] : currents[1]; // 日历的时间轴
        let lastMonthEndDay = moment(current.subtract(1, 'months').endOf('month')); // 上个月最后一天
        current.add(1, 'months');
        let nextMonthStartDay = moment(current.add(1, 'months').startOf('month')); // 下个月第一天
        current.subtract(1, 'months');
        let startDay = current.startOf('month').day() || 7; // 如果是星期天则为7
        let dayNum = current.endOf('month').date() + startDay; // 本月天数+上月剩余天数

        return (
            <View style={styles.calendar}>
                <View style={styles.picker}>
                    <View>
                        <View style={{ ...styles.icon, marginRight: 20 }} onClick={() => {
                            let { currents } = this.state;
                            currents.splice(isDay ? 0 : 1, 1, current.subtract(1, 'years'));
                            this.setState({
                                currents
                            });
                        }}>
                            <Icon type="left" color="rgb(160, 160, 160)" />
                        </View>
                        {current.format('YYYY年')}
                        <View style={{ ...styles.icon, marginLeft: 20 }} onClick={() => {
                            let { currents } = this.state;
                            currents.splice(isDay ? 0 : 1, 1, current.add(1, 'years'));
                            this.setState({
                                currents
                            });
                        }}>
                            <Icon type="right" color="rgb(160, 160, 160)" />
                        </View>
                    </View>
                    <View>
                        <View style={{ ...styles.icon, marginRight: 20 }} onClick={() => {
                            let { currents } = this.state;
                            currents.splice(isDay ? 0 : 1, 1, current.subtract(1, 'months'));
                            this.setState({
                                currents
                            });
                        }}>
                            <Icon type="left" color="rgb(160, 160, 160)" />
                        </View>
                        {current.format('M月')}
                        <View style={{ ...styles.icon, marginLeft: 20 }} onClick={() => {
                            let { currents } = this.state;
                            currents.splice(isDay ? 0 : 1, 1, current.add(1, 'months'));
                            this.setState({
                                currents
                            });
                        }} >
                            <Icon type="right" color="rgb(160, 160, 160)" />
                        </View>
                    </View>
                </View>
                <View style={styles.days}>
                    {
                        (() => {
                            let el = [];
                            for (let i = 0; i < 7; i++) {
                                for (let j = 0; j < 7; j++) {
                                    let style = styles.day;
                                    let textStyle = styles.text;
                                    let label = '';
                                    let tip = '';
                                    // 表头
                                    if (i === 0) {
                                        style = { ...style, borderBottom: '1px solid rgb(220, 220, 220)' };
                                        switch (j) {
                                            case 0:
                                                label = '一';
                                                break;
                                            case 1:
                                                label = '二';
                                                break;
                                            case 2:
                                                label = '三';
                                                break;
                                            case 3:
                                                label = '四';
                                                break;
                                            case 4:
                                                label = '五';
                                                break;
                                            case 5:
                                                label = '六';
                                                break;
                                            case 6:
                                                label = '日';
                                                break;
                                        }
                                    }

                                    // 周末的日期
                                    if (j > 4) {
                                        textStyle = { ...textStyle, ...styles.weekends };
                                    }

                                    const setSelectedDay = (date) => {
                                        if (!isDay) {
                                            // 周历
                                            if (selectedDate.start && date.isSameOrAfter(selectedDate.start.startOf('week')) && date.isSameOrBefore(selectedDate.start.endOf('week'))) {
                                                if (date.isSame(selectedDate.start.startOf('week'), 'day')) tip = '开始';
                                                if (date.isSame(selectedDate.start.endOf('week'), 'day')) tip = '结束';
                                                textStyle = { ...textStyle, ...styles.daySelected };
                                            }
                                        } else {
                                            // 日历
                                            if (selectedDate.start && date.isSame(selectedDate.start, 'day')) {
                                                tip = '开始';
                                                textStyle = { ...textStyle, ...styles.daySelected };
                                            } else if (selectedDate.end && date.isAfter(selectedDate.start) && date.isBefore(selectedDate.end)) {
                                                textStyle = { ...textStyle, ...styles.daySelected };
                                            } else if (selectedDate.end && date.isSame(selectedDate.end, 'day')) {
                                                tip = '结束';
                                                textStyle = { ...textStyle, ...styles.daySelected };
                                            }
                                        }
                                    };
                                    let date = null;

                                    // 上个月的日期
                                    if (i === 1 && j < startDay - 1) {
                                        textStyle = { ...textStyle, ...styles.inactive };
                                        date = moment(lastMonthEndDay.subtract(startDay - 2 - j, 'days'));
                                        lastMonthEndDay.add(startDay - 2 - j, 'days');
                                        label = date.format('D');
                                        setSelectedDay(date);
                                    } else if ((i === Math.ceil(dayNum / 7) && j >= dayNum % 7 - 1) || i > Math.ceil(dayNum / 7)) {
                                        let offsetY = i - Math.ceil(dayNum / 7);
                                        let offsetX = j - dayNum % 7 + 1;
                                        textStyle = { ...textStyle, ...styles.inactive };
                                        date = moment(nextMonthStartDay.add(offsetY * 7 + offsetX, 'days'));
                                        label = date.format('D');
                                        nextMonthStartDay.subtract(offsetY * 7 + offsetX, 'days');
                                        setSelectedDay(date);
                                    } else if (i > 0) {
                                        let offsetY = i - 1;
                                        let offsetX = j - startDay + 1;
                                        date = moment(current.startOf('month').add(offsetY * 7 + offsetX, 'days'));
                                        label = date.format('D');
                                        setSelectedDay(date);
                                    }
                                    el.push(
                                        <View key={i + '-' + j} style={style}>
                                            <View style={textStyle} onClick={() => {
                                                if (!date) return;
                                                if (isDay) {
                                                    // 日历
                                                    if (selectedDate.start.isSame(selectedDate.end, 'day')) {

                                                        this.setState({
                                                            selectedDate: {
                                                                start: date.isBefore(selectedDate.start) ? date : selectedDate.start,
                                                                end: date.isBefore(selectedDate.start) ? selectedDate.start : date
                                                            }
                                                        });
                                                    } else {
                                                        this.setState({
                                                            selectedDate: {
                                                                start: date,
                                                                end: date
                                                            }
                                                        });
                                                    }
                                                } else {
                                                    // 周历
                                                    this.setState({
                                                        selectedDate: {
                                                            start: moment(date.startOf('week')),
                                                            end: moment(date.endOf('week'))
                                                        }
                                                    });
                                                }

                                            }}>
                                                {label}
                                                {
                                                    i === 0 ? null :
                                                        <View style={styles.text2}>
                                                            {tip}
                                                        </View>
                                                }

                                            </View>
                                        </View>
                                    );
                                }
                            }
                            return el;
                        })()
                    }
                </View>
            </View>
        );
    }

    /**
     * 渲染月份
     */
    renderMonth = () => {
        const { currents } = this.state;
        const selectedDate = {
            start: moment(this.state.selectedDate.start),
            end: moment(this.state.selectedDate.end)
        };
        const current = currents[2];
        return (
            <View style={styles.calendar}>
                <View style={styles.picker}>
                    <View>
                        <View style={{ ...styles.icon, marginRight: 20 }} onClick={() => {
                            let { currents } = this.state;
                            currents.splice(2, 1, current.subtract(1, 'years'));
                            this.setState({
                                currents
                            });
                        }}>
                            <Icon type="left" color="rgb(160, 160, 160)" />
                        </View>
                        {current.format('YYYY年')}
                        <View style={{ ...styles.icon, marginLeft: 20 }} onClick={() => {
                            let { currents } = this.state;
                            currents.splice(2, 1, current.add(1, 'years'));
                            this.setState({
                                currents
                            });
                        }}>
                            <Icon type="right" color="rgb(160, 160, 160)" />
                        </View>
                    </View>
                </View>
                <View style={styles.months}>
                    {
                        (() => {
                            let el = [];
                            for (let i = 0; i < 4; i++) {
                                for (let j = 0; j < 3; j++) {
                                    let style = styles.month;
                                    let label = `${i * 3 + j + 1}月`;
                                    if (current.isSame(selectedDate.start, 'year')) {
                                        if (i * 3 + j === selectedDate.start.month()) {
                                            style = { ...style, ...styles.monthSelected };
                                        }
                                    }
                                    el.push(
                                        <View key={`${i}-${j}`} style={style} onClick={() => {
                                            this.setState({
                                                selectedDate: {
                                                    start: moment(current).month(i * 3 + j).startOf('month'),
                                                    end: moment(current).month(i * 3 + j).endOf('month')
                                                }
                                            });
                                        }}>
                                            {label}
                                        </View>
                                    );
                                }
                            }
                            return el;
                        })()
                    }
                </View>
            </View>
        );
    }

    /**
     * 渲染季度
     */
    renderSeason = () => {
        const { currents } = this.state;
        const selectedDate = {
            start: moment(this.state.selectedDate.start),
            end: moment(this.state.selectedDate.end)
        };
        const current = currents[3];
        return (
            <View style={styles.calendar}>
                <View style={styles.picker}>
                    <View>
                        <View style={{ ...styles.icon, marginRight: 20 }} onClick={() => {
                            let { currents } = this.state;
                            currents.splice(3, 1, current.subtract(1, 'years'));
                            this.setState({
                                currents
                            });
                        }}>
                            <Icon type="left" color="rgb(160, 160, 160)" />
                        </View>
                        {current.format('YYYY年')}
                        <View style={{ ...styles.icon, marginLeft: 20 }} onClick={() => {
                            let { currents } = this.state;
                            currents.splice(3, 1, current.add(1, 'years'));
                            this.setState({
                                currents
                            });
                        }}>
                            <Icon type="right" color="rgb(160, 160, 160)" />
                        </View>
                    </View>
                </View>
                <View style={styles.seasons}>
                    {
                        (() => {
                            let el = [];
                            for (let i = 0; i < 4; i++) {
                                let style = styles.season;
                                if (current.isSame(selectedDate.start, 'year')) {
                                    if (i + 1 === selectedDate.start.quarter()) {
                                        style = { ...style, ...styles.seasonSelected };
                                    }
                                }
                                el.push(
                                    <View key={i} style={style} onClick={() => {
                                        this.setState({
                                            selectedDate: {
                                                start: moment(current).quarter(i + 1).startOf('quarter'),
                                                end: moment(current).quarter(i + 1).endOf('quarter')
                                            }
                                        });
                                    }}>
                                        {`${i + 1}季度`}
                                    </View>
                                );
                            }
                            return el;
                        })()
                    }
                </View>
            </View>
        );
    }


    render() {
        const { checked, isCustomDate, selectedDate, tab } = this.state;
        if (isCustomDate)
            return (
                <View style={{ ...styles.container, height: document.documentElement.clientHeight }} onClick={Popup.hide}>
                    <View style={{
                        ...styles.customContainer,
                        width: document.documentElement.clientWidth - 120,
                    }} onClick={e => e.stopPropagation()}>
                        <Tabs defaultActiveKey="1" activeKey={tab} onChange={this.onTabChange} style={styles.tabs} swipeable={false}>
                            <TabPane tab="日历" key="1">
                                {this.renderCalendar(true)}
                            </TabPane>
                            <TabPane tab="周历" key="2">
                                {this.renderCalendar(false)}
                            </TabPane>
                            <TabPane tab="月历" key="3">
                                {this.renderMonth()}
                            </TabPane>
                            <TabPane tab="季度" key="4">
                                {this.renderSeason()}
                            </TabPane>
                        </Tabs>
                        <View style={styles.bottom}>
                            <View style={styles.cancel} onClick={this.cleanSelectedDate}>
                                清空日期
                            </View>
                            <View style={selectedDate.start ? styles.confirm : styles.confirmForbidden} onClick={selectedDate.start ? this.onSelectDate : null}>
                                确定
                            </View>
                        </View>
                    </View>
                </View>
            );
        return (
            <View style={{ ...styles.container, height: document.documentElement.clientHeight }} onClick={Popup.hide}>
                <View style={{ ...styles.insideContainer, width: document.documentElement.clientWidth - 120 }} onClick={e => e.stopPropagation()}>
                    <View style={styles.row}>
                        {row1.map(name => <View key={name} style={name === checked.label ? { ...styles.item, ...styles.itemSelected } : styles.item} onClick={(e) => {
 e.stopPropagation(); this.onClick(name); 
}}>{name}</View>)}
                    </View>
                    <View style={styles.row}>
                        {row2.map(name => <View key={name} style={name === checked.label ? { ...styles.item, ...styles.itemSelected } : styles.item} onClick={(e) => {
 e.stopPropagation(); this.onClick(name); 
}}>{name}</View>)}
                    </View>
                    <View style={styles.row}>
                        <View style={'自定义日期' === checked.label ? { ...styles.item, ...styles.itemSelected } : styles.item} onClick={(e) => {
 e.stopPropagation(); this.onClick('自定义日期'); 
}}>{'自定义日期' === checked.label ? `${checked.start} 至 ${checked.end}` : '自定义日期范围'}</View>
                    </View>
                    <View style={styles.row}>
                        <View style={'全部日期' === checked.label ? { ...styles.item, ...styles.itemSelected } : styles.item} onClick={(e) => {
 e.stopPropagation(); this.onClick('全部日期'); 
}}>全部日期</View>
                    </View>
                </View>
            </View>
        );
    }

}


const styles = {
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    insideContainer: {
        height: 400,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 12
    },
    customContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        height: 910,
    },
    row: {
        marginTop: 10,
        marginBottom: 10,
        width: '95%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        flex: 1,
        height: '100%',
        marginLeft: 10,
        marginRight: 10,
        fontSize: 28,
        backgroundColor: 'rgb(240, 240, 240)',
        color: 'rgb(100, 100, 100)',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemSelected: {
        border: '1px solid #108ee9',
        backgroundColor: 'transparent',
        color: '#108ee9'
    },
    tabs: {
        width: '95%',
        height: 819
    },
    calendar: {
        width: '100%',
        height: 722,
    },
    picker: {
        color: 'rgb(60, 60, 60)',
        height: 80,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    icon: {
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    days: {
        height: 642,
        width: '100%',
        overflow: 'hidden'
    },
    day: {
        width: '14.28%',
        height: '14.28%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgb(60, 60, 60)',
        fontSize: 25,
        height: '90%',
        width: '100%',
        margin: 5,
        borderRadius: 8,
        flexDirection: 'column'
    },
    text2: {
        marginTop: 5,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        height: 20
    },
    weekends: {
        color: 'rgb(242, 114, 93)',
    },
    inactive: {
        color: 'rgb(200, 200, 200)'
    },
    daySelected: {
        color: 'white',
        backgroundColor: '#108ee9'
    },
    months: {
        height: 450,
        width: '100%',
        overflow: 'hidden'
    },
    month: {
        width: '33.3%',
        height: '25%',
        borderRadius: 16,
        color: 'rgb(60, 60, 60)',
        fontSize: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    monthSelected: {
        color: 'white',
        backgroundColor: '#108ee9'
    },
    seasons: {
        height: 100,
        width: '100%',
        overflow: 'hidden'
    },
    season: {
        width: '25%',
        height: '100%',
        borderRadius: 16,
        color: 'rgb(60, 60, 60)',
        fontSize: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    seasonSelected: {
        color: 'white',
        backgroundColor: '#108ee9'
    },
    bottom: {
        borderTop: '1px solid rgb(220, 220, 220)',
        width: '100%',
        height: 90,
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    cancel: {
        width: '50%',
        height: '100%',
        color: '#108ee9',
        fontSize: 30,
        borderRight: '1px solid rgb(220,220,220)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    confirm: {
        height: '100%',
        width: '50%',
        color: '#108ee9',
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    confirmForbidden: {
        width: '50%',
        height: '100%',
        color: 'rgb(160 ,160, 160)',
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
};

export default (options) => {
    Popup.show(<DatePicker {...options} />, { transitionName: 'am-fade' });
};
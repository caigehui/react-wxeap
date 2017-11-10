import React from 'react';
import { findDOMNode } from 'react-dom';
import View from '../View';
import ScrollView from '../ScrollView';
import DatePicker from '../DatePicker';
import { Icon, Menu } from 'antd-mobile';
import moment from 'moment';
import isArray from 'isarray';
const BAR_HEIGHT = 80;
const PRIMARY_COLOR = 'rgb(74, 144, 226)';
const TITLE_COLOR = 'rgb(60, 60, 60)';
const SUBTITLE_COLOR = 'rgb(160, 160, 160)';
const BORDER_COLOR = 'rgb(220, 220, 220)';
const BACKGROUND_COLOR = 'rgb(245,245,249)';

let valuesCache = {};
let labels = {};
export default class FilterBarPro extends React.Component {
    static propTypes = {
        filterBarId: React.PropTypes.any,
        conditions: React.PropTypes.array,
        conditionsPro: React.PropTypes.array,
        values: React.PropTypes.array,
        defaultValuesPro: React.PropTypes.array,
        onChange: React.PropTypes.func,
        onClick: React.PropTypes.func,
        onCustomClick: React.PropTypes.func,
        onChangePro: React.PropTypes.func,
        switchBtns: React.PropTypes.array
    }

    static defaultProps = {
        onClick: (i, cb) => {
            cb(null);
        },
        switchBtns: [],
        filterBarId: 'temp'
    }

    constructor(props) {
        super(props);
        const cValuePro = props.conditionsPro ? (valuesCache && valuesCache[props.filterBarId] ? valuesCache[props.filterBarId] : (props.defaultValuesPro ? props.defaultValuesPro : props.conditionsPro.map((condition) => {
            switch (condition.type) {
                case 'radio':
                    return { value: false };
                case 'list':
                    return { value: '' };
                case 'custom':
                    return { value: '', label: '请选择' };
                case 'date':
                    return ({
                        label: '全部日期',
                        value: {
                            label: '',
                            start: '',
                            end: '',
                            type: ''
                        }
                    });
                default:
                    return { value: '' };
            }
        }))) : '';
        const dateI = props.conditionsPro && props.conditionsPro.findIndex(x => x.type === 'date');
        const format = props.conditionsPro && props.conditionsPro[dateI] && props.conditionsPro[dateI].format ? props.conditionsPro[dateI].format : 'YYYY-MM-DD';
        this.state = {
            selectedIndex: -1, // -1时表示没有菜单是激活状态
            conditions: props.conditions ? this.generateConditions(props.conditions) : '',// 普通筛选的条件
            conditionsPro: props.conditionsPro ? props.conditionsPro : '',// 高级筛选的条件
            valuesPro: cValuePro,
            offsetTop: -500,
            labels: props.conditions && props.conditions.map(() => ''),

            currents: props.conditionsPro && (() => { // 自定义日期范围的年月时间点
                let current = cValuePro[dateI].value.start ? moment(cValuePro[dateI].value.start, format) : moment();
                return [current, current, current, current];
            })(),
            selectedDate: props.conditionsPro && {
                start: cValuePro[dateI].value.start ? moment(cValuePro[dateI].value.start, format) : '',
                end: cValuePro[dateI].value.end ? moment(cValuePro[dateI].value.end, format) : ''
            }
        };
    }

    generateConditions = (conditions) => {
        return conditions.map(condition => {
            if (condition.searchByCondition(a => a.hasOwnProperty('children'))) {
                if (!isArray(condition)) {
                    console.error('FilterBar: condition不是Array类型');
                    return null;
                }
                return condition.map(item => {
                    if (!item.hasOwnProperty('children')) return { ...item, isLeaf: true };
                    return item;
                });
            }
            return condition;
        });
    }

    setLabel = (label, i) => {
        let labels = this.state.labels;
        labels.splice(i, 1, label);
        this.setState({
            labels
        });
    }

    componentDidMount() {
        this.setState({
            offsetTop: findDOMNode(this.bar).offsetTop,
            labels: labels[this.props.filterBarId].length ? labels[this.props.filterBarId] : this.state.labels
        });
    }

    componentWillUnmount() {
        labels[this.props.filterBarId] = this.state.labels;
        valuesCache[this.props.filterBarId] = this.state.valuesPro;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.conditions) {
            this.setState({
                conditions: this.generateConditions(nextProps.conditions)
            });
        }
        if (nextProps.conditionsPro) {
            this.setState({
                conditionsPro: nextProps.conditionsPro
            });
        }
    }

    onItemClick = (i) => {
        this.setState({ selectedIndex: -1 });
        if (i !== 4) {
            this.props.onClick(i, label => {
                if (!label) {
                    if (i === this.state.selectedIndex) {
                        this.setState({ selectedIndex: -1 });
                    } else {
                        this.setState({ selectedIndex: i });
                    }
                } else {
                    let labels = this.state.labels;
                    labels.splice(i, 1, label);
                    this.setState({ labels });
                }
            });
        } else {
            if (i === this.state.selectedIndex) {
                this.setState({ selectedIndex: -1 });
            } else {
                this.setState({ selectedIndex: i });
            }
        }
    }

    onCustomClick = (i) => {

        this.props.onCustomClick(i, (label, value) => {
            let valuesPro = this.state.valuesPro;
            valuesPro.splice(i, 1, { label: label, value: value });
            this.setState({ valuesPro });

        });
    }

    onChangePro = () => {
        const { valuesPro } = this.state;
        this.props.onChangePro && this.props.onChangePro(valuesPro);
        this.setState({ selectedIndex: -1 });
        valuesCache[this.props.filterBarId] = valuesPro;
    }

    onReset = () => {
        const { conditionsPro } = this.state;
        this.setState({
            valuesPro: conditionsPro.map((condition) => {
                switch (condition.type) {
                    case 'radio':
                        return { value: false };
                    case 'list':
                        return { value: '' };
                    case 'custom':
                        return { value: '', label: '请选择' };
                    case 'date':
                        return ({
                            label: '全部日期',
                            value: {
                                label: '',
                                start: '',
                                end: '',
                                type: ''
                            }
                        });
                    default:
                        return { value: '' };
                }
            })
        });
    }

    onDateClick = (label, i) => {
        const format = this.props.conditionsPro[i] && this.props.conditionsPro[i].format ? this.props.conditionsPro[i].format : 'YYYY-MM-DD';
        if (label === '自定义日期') {
            DatePicker({
                checked: this.state.valuesPro[i].value,
                type: 'onlyCalendar',
                onSelect: (newDate) => {
                    let valuesPro = this.state.valuesPro;
                    valuesPro.splice(i, 1, { label: label, value: newDate });
                    this.setState({ valuesPro });
                }
            });
            return;
        }
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
                    case '一天内':
                        return moment().subtract(1, 'days').format(format);
                    case '一周内':
                        return moment().subtract(1, 'weeks').format(format);
                    case '一月内':
                        return moment().subtract(1, 'months').format(format);
                    case '一年内':
                        return moment().subtract(1, 'years').format(format);
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
                    case '一天内':
                    case '一周内':
                    case '一月内':
                    case '一年内':
                        return moment().format(format);
                    default:
                        return '';
                }
            })(),
            type: ''
        };
        let valuesPro = this.state.valuesPro;
        valuesPro.splice(i, 1, { label: label, value: checked });
        this.setState({ valuesPro });
    }

    hideMenu = () => {
        this.setState({ selectedIndex: -1 });
    }

    renderFilter = () => {
        const { values, switchBtns } = this.props;
        const { selectedIndex, conditions, conditionsPro, labels } = this.state;
        return conditions.map((item, i) => {
            const value = values[i];
            const data = conditions[i];
            // 验证数据类型
            if (!isArray(value)) {
                console.error(`FilterBar: 第${i}个value不是Array类型`);
                return null;
            }
            // 获取value[0]相应的object，设置label为1级
            const first = data.findByCondition(a => a.value === value[0]);
            let label = first && first.label;
            // 如果有children，去匹配children的值
            if (first && first.hasOwnProperty('children')) {
                const second = first.children.findByCondition(a => a.value === value[1]);
                label = second && second.label;
            }
            // state的label优先显示
            label = labels[i] || label || ' ';
            // 是否被选择
            const isSelected = selectedIndex === i;
            // 布局和样式
            let itemStyle = { ...styles.filterItem, width: `${Math.round(1 / (conditionsPro ? conditions.length + 1 : conditions.length) * 10000) / 100}%` };
            // 移除最后一个item的右边框
            if (i === conditions.length - 1 && conditionsPro === null) itemStyle = { ...itemStyle, borderRight: 0 };
            const itemTitleStyle = !isSelected ? styles.itemTitle : { ...styles.itemTitle, ...styles.itemTitleSelected };
            const iconStyle = !isSelected ? styles.icon : { ...styles.icon, ...styles.iconUp };
            const iconColor = !isSelected ? 'rgb(200,200,200)' : PRIMARY_COLOR;
            const isShowSwitchBtn = switchBtns.searchByCondition(index => i === index);
            return (
                <View style={itemStyle} key={i} onClick={() => this.onItemClick(i)}>
                    <View style={itemTitleStyle}>
                        {label}
                    </View>
                    <View style={iconStyle}>
                        <Icon type={isShowSwitchBtn ? require('../../assets/switch.svg') : require('../../assets/triangle.svg')} size={isShowSwitchBtn ? 'xs' : 'xxs'} color={iconColor} />
                    </View>
                </View>
            );
        });
    }

    renderFilterPro = () => {
        const { selectedIndex, conditions } = this.state;
        const isSelected = selectedIndex === 4;
        let itemStyle = { ...styles.filterItem, width: `${Math.round(1 / (conditions ? conditions.length + 1 : 1) * 10000) / 100}%` };
        // 移除最后一个item的右边框
        itemStyle = { ...itemStyle, borderRight: 0 };
        const itemTitleStyle = !isSelected ? styles.itemTitle : { ...styles.itemTitle, ...styles.itemTitleSelected };
        const iconStyle = !isSelected ? styles.icon : { ...styles.icon, ...styles.iconUp };
        const iconColor = !isSelected ? 'rgb(200,200,200)' : PRIMARY_COLOR;
        return (
            <View style={itemStyle} onClick={() => this.onItemClick(4)}>
                <View style={itemTitleStyle}>
                    高级筛选
                </View>
                <View style={iconStyle}>
                    <Icon type={require('../../assets/triangle.svg')} size={'xxs'} color={iconColor} />
                </View>
            </View>
        );
    }

    renderPicker = () => {
        const { values } = this.props;
        const { selectedIndex, conditions } = this.state;
        return (selectedIndex !== -1 && selectedIndex !== 4 ?
            (() => {
                // 获取Menu的data,value,onChange
                const data = conditions[selectedIndex];
                const style = { ...styles.menu, top: this.state.offsetTop + BAR_HEIGHT + 1 };
                const value = values[selectedIndex];
                const onChange = (newValue) => {
                    if (newValue.toString() === value.toString()) return;
                    // 设置label
                    this.setState({
                        labels: this.state.labels.map((label, i) => {
                            if (i === selectedIndex) {
                                return '';
                            }
                            return label;
                        })
                    });
                    this.props.onChange && this.props.onChange(values.map((value, i) => {
                        if (i === selectedIndex) return newValue;
                        return value;
                    }), selectedIndex);
                    this.hideMenu();
                };
                const level = data.searchByCondition(a => a.hasOwnProperty('children')) ? 2 : 1;
                const height = Math.min(data.length * 100, 500);
                return (
                    <div style={style}>
                        <Menu
                            height={height}
                            data={data}
                            level={level}
                            value={value}
                            onChange={onChange}
                        />
                    </div>

                );
            })()
            : null);
    }

    renderPickerPro = () => {
        const dateRow = ['全部日期', '今日', '昨日', '本周', '上周', '本月', '上月'];
        const { selectedIndex, conditionsPro, valuesPro } = this.state;
        if (selectedIndex !== 4) return null;
        const height = Math.min(conditionsPro.length * 200, document.documentElement.clientHeight / 2);
        const style = {
            ...styles.menu,
            top: this.state.offsetTop + BAR_HEIGHT + 1,
        };
        const sidebar = (
            <ScrollView

                backgroundColor="white"
                height={height}
            >
                {conditionsPro.map((item, i) => {
                    switch (item.type) {
                        case 'radio':
                            return (
                                <View
                                    key={i} style={{ ...styles.titlePro, borderBottom: `1px solid ${BORDER_COLOR}` }}
                                    onClick={() => {
                                        this.setState({
                                            valuesPro: valuesPro.map((valuesItem, j) => {
                                                if (j === i) {
                                                    return { value: !valuesItem.value };
                                                }
                                                return valuesItem;
                                            })
                                        });
                                    }}>
                                    <View style={{ color: `${TITLE_COLOR}` }}>{item.name}</View>
                                    <View style={valuesPro[i].value ? { ...styles.check, border: `1.5px solid ${PRIMARY_COLOR}` } : styles.check}>
                                        {
                                            valuesPro[i].value ?
                                                <Icon type="check" color={PRIMARY_COLOR} />
                                                : null
                                        }
                                    </View>
                                </View>
                            );
                        case 'list':
                            return (
                                <div
                                    key={i}
                                    style={{ borderBottom: `1px solid ${BORDER_COLOR}` }}
                                >
                                    <View style={{ ...styles.titlePro, color: `${TITLE_COLOR}` }}>{item.name}</View>
                                    <View style={{ padding: '0px 0px 20px 30px' }}>
                                        {item.data.map((option) => {
                                            const valuei = valuesPro[i].value;
                                            const isSelected = option.value === valuei;
                                            const optionStyle = !isSelected ? styles.option : { ...styles.option, color: PRIMARY_COLOR, border: '1px solid' };
                                            return (
                                                <View
                                                    key={option.label}
                                                    style={{ ...optionStyle, margin: '0 30px 30px 0' }}
                                                    onClick={() => {
                                                        this.setState({
                                                            valuesPro: valuesPro.map((valItem, j) => {
                                                                if (j === i) return { value: option.value };
                                                                return valItem;
                                                            })
                                                        });
                                                    }}
                                                >{option.label}</View>
                                            );
                                        })}
                                    </View>
                                </div>
                            );
                        case 'custom':
                            return (
                                <View
                                    style={{ ...styles.titlePro, borderBottom: `1px solid ${BORDER_COLOR}`, flexWrap: 'nowrap' }}
                                    key={i}
                                    onClick={() => this.onCustomClick(i)}
                                >
                                    <View style={{ color: `${TITLE_COLOR}` }}>{item.name}</View>
                                    <View style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
                                        <View style={valuesPro[i].label === '请选择' ? { color: SUBTITLE_COLOR } : { color: PRIMARY_COLOR }}>{valuesPro[i].label}</View>
                                        <Icon type="right" size="sm" color="rgb(200,200,200)" />
                                    </View>
                                </View>
                            );
                        case 'date':
                            return (
                                <div
                                    key={i}
                                    style={{ borderBottom: `1px solid ${BORDER_COLOR}` }}
                                >
                                    <View style={{ ...styles.titlePro, color: `${TITLE_COLOR}` }}>选择日期</View>
                                    <View style={{ padding: '0px 0px 20px 30px' }}>
                                        {dateRow.map(dateName => {
                                            const name = valuesPro[i].label;
                                            const isSelected = dateName === name;
                                            const optionStyle = !isSelected ? styles.option : { ...styles.option, color: PRIMARY_COLOR, border: '1px solid' };
                                            return (
                                                <View
                                                    key={dateName}
                                                    style={{ ...optionStyle, margin: '0 30px 30px 0' }}
                                                    onClick={() => this.onDateClick(dateName, i)}
                                                >{dateName}</View>
                                            );
                                        })}
                                        <View
                                            style={'自定义日期' !== valuesPro[i].label ? styles.option : { ...styles.option, color: PRIMARY_COLOR, border: '1px solid', margin: '0 30px 30px 0' }}
                                            onClick={() => this.onDateClick('自定义日期', i)}
                                        >{'自定义日期' === valuesPro[i].label ? `${valuesPro[i].value.start} 至 ${valuesPro[i].value.end}` : '自定义日期范围'}</View>
                                    </View>
                                </div>
                            );
                        default:
                            return null;
                    }
                })}

            </ScrollView>
        );
        return (
            <div style={{ ...style, backgroundColor: BACKGROUND_COLOR }}>
                {sidebar}
                <View style={{ justifyContent: 'space-between' }}>
                    <View
                        onClick={this.onReset}
                        style={styles.subButton}
                    >重置
                    </View>
                    <View
                        onClick={this.onChangePro}
                        style={styles.blueButton}
                    >完成
                    </View>
                </View>
            </div>
        );
    }

    render() {
        const { selectedIndex, conditions, conditionsPro } = this.state;
        return (
            conditions.length > 0 || conditionsPro.length > 0 ?
                <View style={styles.container} ref={o => this.bar = o}>
                    {conditions && conditions.length > 0 ? this.renderFilter() : null}
                    {conditionsPro && conditionsPro.length > 0 ? this.renderFilterPro() : null}
                    {
                        selectedIndex !== -1 ?
                            <div style={{ ...styles.shade, top: this.state.offsetTop + BAR_HEIGHT + 1 }} onClick={this.hideMenu} />
                            : null
                    }
                    {this.renderPicker()}
                    {this.renderPickerPro()}
                </View>
                : null
        );
    }
}
const styles = {
    container: {
        width: '100%',
        height: BAR_HEIGHT,
        backgroundColor: 'white',
        borderBottom: `1px solid ${BORDER_COLOR}`,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'no-wrap'
    },
    filterItem: {
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: `1px solid ${BORDER_COLOR}`,
        flexWrap: 'no-wrap'
    },
    itemTitle: {
        textAlign: 'center',
        fontSize: 28,
        color: SUBTITLE_COLOR,
        marginLeft: 5,
        marginRight: 5,
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    itemTitleSelected: {
        color: PRIMARY_COLOR
    },
    icon: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconUp: {
        transform: 'rotate(180deg)'
    },
    menu: {
        zIndex: 2,
        position: 'absolute',
        left: 0,
        right: 0
    },
    shade: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 1
    },
    check: {
        borderRadius: '50%',
        border: `1.5px solid ${SUBTITLE_COLOR}`,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    option: {
        color: `${SUBTITLE_COLOR}`,
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 6,
        padding: '0 30px',
        fontSize: 30,
        height: 50,
    },
    subButton: {
        color: 'rgb(160, 160, 160)',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid',
        borderRadius: 6,
        padding: '0 30px',
        fontSize: 30,
        height: 50,
        margin: '10px 30px',
        backgroundColor: 'white'
    },
    blueButton: {
        color: 'rgb(78, 168, 236)',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid',
        borderRadius: 6,
        padding: '0 30px',
        fontSize: 30,
        fontWeight: 'bold',
        height: 50,
        margin: '10px 30px',
        backgroundColor: 'white'
    },
    titlePro: {
        justifyContent: 'space-between',
        padding: '20px 30px'
    }
};
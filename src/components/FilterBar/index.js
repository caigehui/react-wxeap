import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import View from '../View';
import { Icon, Menu } from 'antd-mobile';
import isArray from 'isarray';
import { BORDER_COLOR, SUBTITLE_COLOR, PRIMARY_COLOR } from '../../constants';

const BAR_HEIGHT = 80;
let labels = {};
export default class FilterBar extends React.Component {

    static propTypes = {
        conditions: PropTypes.array,
        values: PropTypes.array,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        switchBtns: PropTypes.array,
        filterBarId: PropTypes.any
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
        if (props.conditions.length > 4) {
            console.warn('FilterBar接收到超过4个condition，但只会显示前四个');
        }
        this.state = {
            selectedIndex: -1, // -1时表示没有菜单是激活状态
            conditions: this.generateConditions(props.conditions),
            offsetTop: -500,
            labels: props.conditions.map(() => '')
        };
    }

    setLabels = (labels) => {
        console.warn('depracated!该方法已经被废弃，请使用setLabel');
        this.setState({ labels: labels });
    }

    setLabel = (label, i) => {
        let labels = this.state.labels;
        labels.splice(i, 1, label);
        this.setState({
            labels
        });
    }

    componentDidMount() {
        this.setState({ offsetTop: findDOMNode(this.bar).offsetTop, labels: labels[this.props.filterBarId].length ? labels[this.props.filterBarId] : this.state.labels });
    }

    componentWillUnmount() {
        labels[this.props.filterBarId] = this.state.labels;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.conditions) {
            this.setState({ conditions: this.generateConditions(nextProps.conditions) });
        }
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

    onItemClick = (i) => {
        this.setState({ selectedIndex: -1 });
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
    }

    hideMenu = () => {
        this.setState({ selectedIndex: -1 });
    }


    render() {
        const { values, switchBtns } = this.props;
        const { selectedIndex, conditions, labels } = this.state;

        return (
            conditions.length > 0 ?
                <View style={styles.container} ref={o => this.bar = o}>
                    {
                        conditions.map((item, i) => {
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
                            let itemStyle = { ...styles.filterItem, width: `${Math.round(1 / conditions.length * 10000) / 100}%` };
                            // 移除最后一个item的右边框
                            if (i === conditions.length - 1) itemStyle = { ...itemStyle, borderRight: 0 };
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
                        })
                    }
                    {
                        selectedIndex !== -1 ?
                            <div style={{ ...styles.shade, top: this.state.offsetTop + BAR_HEIGHT + 1 }} onClick={this.hideMenu} />
                            : null
                    }
                    {
                        selectedIndex !== -1 ?
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
                            : null
                    }
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
    }
};


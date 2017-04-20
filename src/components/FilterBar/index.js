import React, { PropTypes } from 'react';
import { PRIMARY_COLOR, BORDER_COLOR, SUBTITLE_COLOR } from '../../constants';
import View from '../View';
import { Icon } from 'antd-mobile';
import isArray from 'isarray';

const styles = {
    container: {
        width: '100%',
        height: 120,
        backgroudColor: 'white',
        borderBottom: `1px solid ${BORDER_COLOR}`,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    filterItem: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTitle: {
        fontSize: 25,
        color: SUBTITLE_COLOR
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
    }
};


export default class FilterBar extends React.Component {

    static propTypes = {
        conditions: PropTypes.array,
        values: PropTypes.array,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        if (props.conditions.length > 4) {
            console.warn('FilterBar接收到超过4个condition，但只会显示前四个');
        }
        this.state = {
            selectedIndex: -1 // -1时表示没有菜单是激活状态
        };
    }

    render() {
        const { conditions, values } = this.props;
        const { selectedIndex } = this.state;
        return (
            conditions.length > 0 ?
                <View style={styles.container}>
                    {
                        conditions.map((item, i) => {
                            const value = values[i];
                            const condition = conditions[i];
                            if (!isArray(condition)) {
                                console.error(`第${i}个condition不是Array类型`);
                                return null;
                            }
                            const label = condition.findByCondition(a => a.value === value);
                            if (!label) {
                                console.error(`第${i}个condition中不存在${value}`);
                                return null;
                            }
                            const isSelected = selectedIndex === i;
                            const itemTitleStyle = isSelected ? styles.itemTitle : { ...styles.itemTitle, ...styles.itemTitleSelected };
                            const iconStyle = isSelected ? styles.icon : { ...styles.icon, ...styles.iconUp };
                            const iconColor = isSelected ? PRIMARY_COLOR : SUBTITLE_COLOR;
                            return (
                                <View>
                                    <View style={itemTitleStyle}>
                                        {label}
                                    </View>
                                    <View style={iconStyle}>
                                        <Icon type={require('../../assets/triangle.svg')} size="xxs" color={iconColor} />
                                    </View>
                                </View>
                            );
                        })
                    }
                </View>
                : null
        );
    }
}
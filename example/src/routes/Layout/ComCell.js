import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, Cell, Seperator, linking } from 'react-wxeap';
import ComDetail from '../../components/ComDetail';
import ComHeader from '../../components/ComHeader';
import { Toast } from 'antd-mobile';

@bind(state => state.comCell)
class ComCell extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
    }

        state = {
            checkedTop: false,
            checkedBottom: false
        };
 
    render() {
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'Cell'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'基本示例'}></ComDetail>
                <Cell
                    ref={o => this.cellTop = o}
                    height={200}
                    checkable={true}
                    checked={this.state.checkedTop}
                    onClick={(isChecked) => Toast.info((`你点击了Delete${isChecked}`, 1))}
                    onCheck={(isChecked) => this.setState({ checkedTop: isChecked })}
                    swipable={true}
                    actionButtons={[
                        {
                            text: 'Cancel',
                            onPress: () => Toast.info('你点击了Cancel', 1),
                            style: { backgroundColor: CONST.PRIMARY_COLOR, color: '#ffffff' },
                        },
                        {
                            text: 'Delete',
                            onPress: () => Toast.info('你点击了Delete', 1),
                            style: { backgroundColor: CONST.RED_COLOR, color: '#ffffff' },
                        },
                    ]}
                    renderContent={() => {
                        return <View style={{ width: '100%' }}>你可以单击白色圆圈选中该容器，此外尝试一下向左滑动，看看有什么效果</View>;
                    }}
                />
                <Seperator style={{ height: 20 }} />
                <Cell
                    ref={o => this.cellBottom = o}
                    height={200}
                    checkable={false}
                    checked={this.state.checkedBottom}
                    onClick={(isChecked) => Toast.info((`你点击了Delete${isChecked}`, 1))}
                    onCheck={(isChecked) => this.setState({ checkedBottom: isChecked })}
                    swipable={false}
                    actionButtons={[
                        {
                            text: 'Cancel',
                            onPress: () => Toast.info('你点击了Cancel', 1),
                            style: { backgroundColor: CONST.PRIMARY_COLOR, color: '#ffffff' },
                        },
                        {
                            text: 'Delete',
                            onPress: () => Toast.info('你点击了Delete', 1),
                            style: { backgroundColor: CONST.RED_COLOR, color: '#ffffff' },
                        },
                    ]}
                    renderContent={() => {
                        return <View style={{ width: '100%' }}>这个cell的复选框和滑动菜单被禁用</View>;
                    }}
                />
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10 }}>
                        Cell是支持向左滑动操作以及复选框的列表项，在部分安卓设备滑动时会有卡顿感，ios无此问题。
                    </View>
                </ComDetail>
            </div>
        );
    }
}
export default ComCell; 
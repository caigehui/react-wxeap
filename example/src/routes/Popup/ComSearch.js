import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, Seperator, Search, linking } from 'react-wxeap';
import ComDetail from 'components/ComDetail';
import ComHeader from 'components/ComHeader';
import { SearchBar, WhiteSpace, List } from 'antd-mobile';
import { Toast } from 'antd-mobile';

@bind(state => state.comSearch)
class ComSearch extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
    }

    popupSearch = () => {
        Search.show({
            onSearch: (value, fill) => {
                this.props.dispatch({ type: 'comSearch/searchEmp', payload: { value, fill } });
            }, // 搜索回调func
            renderRow: (rowData) => {
                return <div>
                    <List>
                        <List.Item>{rowData.name}</List.Item>
                    </List>
                </div>;

            }, // 渲染func
            onCancel: () => {
                Toast.info('你点击了cancel',1);

            }, // 取消回调func
            placeholder: '搜索一下“张”这个字', // 搜索框的初始值
            label: '', // 提示文字
            notFoundLabel: '找不到内容' // 找不到内容时的提示文字
        });
    }

    render() {
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'Search'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'基本示例'}>
                </ComDetail>
                <div onClick={this.popupSearch} >
                    <SearchBar placeholder="搜索" disabled={true} />
                </div>
                <WhiteSpace />
                <Seperator style={{ height: 18 }} />
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10, lineHeight: 1.5 }}>
                        Search是一个弹出层，触发它会弹出一个搜索页面
                    </View>
                </ComDetail>
            </div>
        );
    }
}

export default ComSearch; 
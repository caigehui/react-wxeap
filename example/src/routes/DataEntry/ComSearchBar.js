import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, Seperator, linking, SearchBar } from 'react-wxeap';
import ComDetail from 'components/ComDetail';
import ComHeader from 'components/ComHeader';
import { List } from 'antd-mobile';

@bind(state => state.comSearchBar)
export default class ComSearchBar extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
    }


    onSearch = (value, fill) => {
        this.props.dispatch({ type: 'comSearchBar/searchEmp', payload: { value, fill } });
    }

    renderSearch = rowData => {
        return <div>
            <List>
                <List.Item>{rowData.name}</List.Item>
            </List>
        </div>;
    }


    render() {
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'SearchBar'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'基本'}>
                </ComDetail>
                <View style={{ justifyContent: 'center', height: 90, alignItems: 'center', backgroundColor: '#fff' }}>
                    <SearchBar
                        width={'95%'}
                        placeholder="搜索一下“张”这个字"
                        onSearch={this.onSearch}
                        renderRow={this.renderSearch}
                        style={{ height: 60 }}
                    />
                </View>
                <Seperator style={{ height: 18 }} />
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10, lineHeight: 1.5 }}>
                        SearchBar组件是一个搜索栏，点击搜索栏会触发Search，你可以定义它的样式，涉及搜索相关业务时你会用到它
                    </View>
                </ComDetail>
            </div>
        );
    }
}

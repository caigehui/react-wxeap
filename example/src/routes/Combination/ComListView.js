import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, linking, ListView } from 'react-wxeap';
import { PAGE_SIZE } from '../../constants';
import ComDetail from '../../components/ComDetail';
import ComHeader from '../../components/ComHeader';

@bind(state => state.comListView)
export default class ComListView extends Component {
    static propTypes = {
        dispatch: PropTypes.func
    }

    onFetch = (page, fill) => {
        this.props.dispatch({
            type: 'comListView/queryList',
            payload: {
                page,
                fill,
            }
        });
    }

    renderRow = rowData => {
        return <View style={{ height: 90, backgroundColor: '#fff', alignItems: 'center', paddingLeft: 30, paddingRight: 30 }}>
            <span style={{ color: CONST.TITLE_COLOR }}>{rowData.name}</span>:
                    <span style={{ fontSize: 30, color: CONST.SUBTITLE_COLOR }}>
                {rowData.dream}
            </span>
        </View>;
    }

    render() {
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'ListView'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'基本示例'}></ComDetail>
                <ListView
                    style={{
                        height: document.documentElement.clientHeight - 300,
                        width: document.documentElement.clientWidth,
                        backgroundColor: '#f5f5f9'
                    }}
                    listId="infoCenter"
                    ref={o => this.listView = o}
                    pageSize={PAGE_SIZE}
                    renderRow={this.renderRow}
                    onFetch={this.onFetch}
                    stayPosition={true}
                    footerHidden={false}
                />
            </div>
        );
    }
}

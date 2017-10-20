import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, linking, DefaultAvatar, RichContentView, ChatView } from 'react-wxeap';
import { PAGE_SIZE } from '../../constants';
import ComDetail from 'components/ComDetail';
import ComHeader from 'components/ComHeader';

@bind(state => state.comChatView)
export default class ComChatView extends Component {

    static propTypes = {
        dispatch: PropTypes.func
    }

    renderRow = (rowData, index) => {
        return <div key={index} style={{height: 120}}>{rowData}</div>
    } 


    getHistory = (success, count) => {
        setTimeout(() => {
            success([0 ,1, 2], true)
        }, 500);
    }

    getNewMessage = (success) => {
        setTimeout(() => {
            success(['new msg1' ,'new msg2', 'new msg1' ,'new msg2', 'new msg1' ,'new msg2' ])
            setTimeout(() => {
                // 滚动到最新消息的开头
                this.refs.chatview.scrollToNewMsg()
            }, 2000);
        }, 500);
    }

    render() {
        return (
            <div style={{ backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'ChatView'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'基本示例'}>
                </ComDetail>
                <ChatView
                    ref="chatview"
                    style={{
                        width: document.documentElement.clientWidth,
                        height: 400,
                        backgroundColor: 'white'
                    }}
                    renderRow={this.renderRow}
                    getHistory={this.getHistory}
                    getNewMessage={this.getNewMessage}
                    requestInterval={0}
                />
            </div>
        );
    }
}

const styles = {
    HeadImage: {
        width: 70,
        height: 70,
        borderRadius: '50%',
        margin: '0 20px',
    },
    triangleLeft: {
        width: 15,
        height: 15,
        backgroundColor: '#ffffff',
        borderLeft: `1px solid ${CONST.BORDER_COLOR}`,
        borderBottom: `1px solid ${CONST.BORDER_COLOR}`,
        transform: 'rotate(45deg)',
        position: 'absolute',
        top: 60,
        left: 103
    },
    triangleRight: {
        width: 15,
        height: 15,
        backgroundColor: `${CONST.BLUE_COLOR}`,
        borderTop: `1px solid ${CONST.BORDER_COLOR}`,
        borderRight: `1px solid ${CONST.BORDER_COLOR}`,
        transform: 'rotate(45deg)',
        position: 'absolute',
        top: 20,
        right: 103
    },
    SendedMsg: {
        width: 'auto',
        display: '-webkit-flex',
        flexDirection: 'column',
        fontSize: 30,
        marginLeft: 100,
        color: '#ffffff',
        backgroundColor: `${CONST.BLUE_COLOR}`,
        border: `1px solid ${CONST.BORDER_COLOR}`,
        borderRadius: '10px',
        padding: '20px',
        lineHeight: 1.5,
    },
    ReceivedMsg: {
        width: 'auto',
        display: '-webkit-flex',
        flexDirection: 'column',
        fontSize: 30,
        marginRight: 100,
        color: '#333333',
        backgroundColor: '#ffffff',
        border: `1px solid ${CONST.BORDER_COLOR}`,
        borderRadius: '10px',
        padding: '20px',
        lineHeight: 1.5
    },
};
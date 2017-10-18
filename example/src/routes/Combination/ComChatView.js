import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, linking, ChatView, DefaultAvatar, RichContentView } from 'react-wxeap';
import { PAGE_SIZE } from '../../constants';
import ComDetail from 'components/ComDetail';
import ComHeader from 'components/ComHeader';

@bind(state => state.comChatView)
export default class ComChatView extends Component {

    static propTypes = {
        dispatch: PropTypes.func
    }

    onFetch = (page, fill) => {
        this.props.dispatch({ type: 'comChatView/queryList', payload: { page, fill, pageSize: PAGE_SIZE } });
    }

    renderRow = (rowData, index) => {
        return <View key={index} style={{ flexDirection: 'column', alignItems: 'center', margin: '40px 0' }}>
            {
                rowData.msgType === 'send'
                    ?
                    <View style={{ width: '100%', marginTop: 10, flexWrap: 'nowrap', flexDirection: 'row-reverse', position: 'relative' }}>
                        <View>
                            <DefaultAvatar radius={styles.HeadImage.width / 2} id={rowData.id} name={rowData.name} style={styles.HeadImage} />
                        </View>
                        <div style={styles.triangleRight} />
                        <RichContentView contentId={'2'} style={styles.SendedMsg} content={rowData.dream} />
                    </View>
                    :
                    <View style={{ width: '100%', marginTop: 10, flexWrap: 'nowrap', position: 'relative' }}>
                        <View>
                            <DefaultAvatar radius={styles.HeadImage.width / 2} id={rowData.id} name={rowData.name} style={styles.HeadImage} />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ fontSize: 24, color: '#a0a0a0', marginBottom: 15 }}>
                                {rowData.name}
                            </View>
                            <div style={styles.triangleLeft} />
                            <RichContentView contentId={'1'} style={styles.ReceivedMsg} content={rowData.dream} />
                        </View>
                    </View>
            }
        </View>;

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
                    style={{
                        width: document.documentElement.clientWidth,
                        height: document.documentElement.clientHeight - 300,
                        WebkitOverflowScrolling: 'touch'
                    }}
                    renderRow={this.renderRow}
                    onFetch={this.onFetch}
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
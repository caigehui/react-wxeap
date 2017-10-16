import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, Seperator, linking, DefaultAvatar } from 'react-wxeap';
import ComDetail from 'components/ComDetail';
import ComHeader from 'components/ComHeader';

@bind(state => state.comDefaultAvatar)
export default class ComDefaultAvatar extends Component {
    static propTypes = {
        dispatch: PropTypes.func
    }


    render() {
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'DefaultAvatar'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'基本'}>
                </ComDetail>
                <View style={styles.container}>
                    <DefaultAvatar radius={styles.icons.width / 2} id={0} name={'图灵'} style={styles.icons} />
                    <View style={{ ...styles.content, justifyContent: 'flex-start' }}>
                        图灵
                    </View>
                </View>
                <Seperator style={{ height: 18 }} />
                <View style={styles.container}>
                    <DefaultAvatar radius={styles.icons.width / 2} id={1} name={'王大锤'} style={styles.icons} />
                    <View style={{ ...styles.content, justifyContent: 'flex-start' }}>
                        王大锤
                    </View>
                </View>
                <Seperator style={{ height: 18 }} />
                <View style={styles.container}>
                    <DefaultAvatar radius={styles.icons.width / 2} id={2} name={'陶二妞'} style={styles.icons} />
                    <View style={{ ...styles.content, justifyContent: 'flex-start' }}>
                        陶二妞
                    </View>
                </View>
                <Seperator style={{ height: 18 }} />
                <View style={styles.container}>
                    <DefaultAvatar radius={styles.icons.width / 2} id={3} name={'Frank '} style={styles.icons} />
                    <View style={{ ...styles.content, justifyContent: 'flex-start' }}>
                        Frank
                    </View>
                </View>
                <Seperator style={{ height: 18 }} />
                <View style={styles.container}>
                    <DefaultAvatar radius={styles.icons.width / 2} id={4} name={'Herbert '} style={styles.icons} />
                    <View style={{ ...styles.content, justifyContent: 'flex-start' }}>
                        Herbert
                    </View>
                </View>
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10, lineHeight: 1.5 }}>
                        DefaultAvatar组件用来为没有头像的用户设置头像，只需要为它指定id和name属性，组件会根据id属性的不同设置不同的颜色（共有四种颜色，蓝，红，绿，黄），在涉及和头像相关的业务时你会用到它
                    </View>
                </ComDetail>
            </div>
        );
    }
}

const styles = {
    container: {
        width: '100%',
        alignItems: 'center',
        height: 99,
        paddingLeft: 30,
        backgroundColor: '#ffffff'

    },
    icons: {
        height: 70,
        width: 70,
        borderRadius: '50%',
    },
    content: {
        height: '100%',
        borderBottom: '1px solid #dcdcdc',
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 34,
        flex: 1
    },
};
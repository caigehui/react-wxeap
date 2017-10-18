import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, Seperator, ImageUploadView , linking } from 'react-wxeap';
import ComDetail from 'components/ComDetail';
import ComHeader from 'components/ComHeader';

@bind(state => state.comImageUploadView)
export default class ComImageUploadView extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
        avaImgs: PropTypes.array
    }
    // 因为ImageUploadView组件点击图片不会触发选择图片的事件，故单独给image标签添加oClick事件
    onChangeHeadImg = () => {
        const inputs = document.querySelectorAll('input[type=\'file\']');
        return inputs[0].click();
    }

    render() {
        const { avaImgs } = this.props;
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'ImageUploadView'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'支持自定义按钮的图片选择器组件'}>
                </ComDetail>
                    <ImageUploadView
                        renderContent={() =>
                            <View style={styles.headImgMain}>
                                 <View>切换头像</View>
                                <View style={styles.headImgContent}>
                                    <img onClick={this.onChangeHeadImg} style={{ height: 120, width: 120, borderRadius: '50%' }} src={avaImgs[avaImgs.length - 1].url} />
                                    <img style={styles.arrowRight} src={require('../../assets/arrow-right.png')} />
                                </View> 
                            </View>
                        }
                        onImagePicked={(url) => this.props.dispatch({ type: 'comImageUploadView/save', payload: { avaImgs: [{ url: url }] } })}
                    />
                <Seperator style={{ height: 18 }} />
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10, lineHeight: 1.5 }}>
                        这是一个适用于聊天发图片，切换头像等业务的图片选择器，它支持自定义样式，会对上传图片进行压缩。
                    </View>
                </ComDetail>
            </div>
        );
    }
}

const styles = {
    headImgMain: {
        height: 146,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 10,
        color: '#333',
        fontSize: 34,
        borderTop: '1px solid rgb(220, 220, 220)',
        borderBottom: '1px solid rgb(220, 220, 220)',
        backgroundColor: '#fff'
    },
    headImgContent: {
        alignItems: 'center',
        fontSize: 28,
        color: '#A0A0A0'
    },
    arrowRight: {
        height: 60,
        width: 60,
    },
};

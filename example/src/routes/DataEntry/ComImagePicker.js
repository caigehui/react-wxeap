import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, Seperator, ImagePicker, ImageViewer, linking } from 'react-wxeap';
import ComDetail from 'components/ComDetail';
import ComHeader from 'components/ComHeader';

@bind(state => state.comImagePicker)
export default class ComImagePicker extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
        avaImgs: PropTypes.array
    }


    render() {
        const { avaImgs } = this.props;
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'ImagePicker'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'简单的图片选择组件'}>
                </ComDetail>
                <ImagePicker
                    width={10}
                    files={avaImgs}
                    onChange={avaImgs => this.props.dispatch({ type: 'comImagePicker/save', payload: { avaImgs } })}
                    onImageClick={ImageViewer}
                    selectable={avaImgs.length < 6}
                />
                <Seperator style={{ height: 18 }} />
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10, lineHeight: 1.5 }}>
                        ImagePicker组件用来选择图片，你可以自定义提交最多图片的数目，当达到该数目时，添加图片按钮将会隐藏，组件会对图片进行压缩。
                    </View>
                </ComDetail>
            </div>
        );
    }
}

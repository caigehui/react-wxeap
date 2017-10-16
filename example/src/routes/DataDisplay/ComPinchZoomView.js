import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, Seperator, linking, PinchZoomView } from 'react-wxeap';
import ComDetail from 'components/ComDetail';
import ComHeader from 'components/ComHeader';

@bind(state => state.comPinchZoomView)
export default class ComPinchZoomView extends Component {
    static propTypes = {
        fblHtmlDisplay: PropTypes.any,
        dispatch: PropTypes.func
    }

    render() {
        const { fblHtmlDisplay } = this.props;
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR,overflow: 'scroll', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'PinchZoomView'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'基本'}>
                (下方是一个表单视图，可用手指尝试缩放效果)
                </ComDetail>
                <View >
                    <PinchZoomView ref={o => this.PinchZoomView = o}>
                        <div 
                        style={{backgroundColor: 'white',}}
                         dangerouslySetInnerHTML={{
                            __html: fblHtmlDisplay
                        }} />
                    </PinchZoomView>
                </View>
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10, lineHeight: 1.5 }}>
                    PinchZoomView组件可以用来对视图进行缩放，可以用到对较小视图的内容进行缩放相关的业务中。
                    </View>
                </ComDetail>
                <Seperator style={{height: 50, border: 0}}/>
            </div>
        );
    }
}

import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, FloatButton, linking } from 'react-wxeap';
import ComExample from '../../components/ComExample';
import ComDetail from '../../components/ComDetail';
import ComHeader from '../../components/ComHeader';
import { Toast } from 'antd-mobile';

@bind(state => state.comFloatButton)
class ComFloatButton extends Component {

    static propTypes = {
        dispatch: PropTypes.func
    }

    render() {
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'FloatButton'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComExample>
                    <View style={{ width: '95%', margin: '0 auto', fontSize: 26 }}>
                        FooatButton默认会在页面的右下角，点击它会触发响应
                        <FloatButton onClick={() => {
                            Toast.info('你点击了FloatButton', 1);
                        }}
                        />
                    </View>
                </ComExample>
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10, lineHeight: 1.5 }}>
                        FloatButton是一个悬浮按钮，可以自定义icon图标，对其添加方法，方便对页面进行操作
                    </View>
                </ComDetail>
            </div>
        );
    }
}
export default ComFloatButton; 
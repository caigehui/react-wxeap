import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, linking } from 'react-wxeap';
import ComExample from 'components/ComExample';
import ComDetail from 'components/ComDetail';
import ComHeader from 'components/ComHeader';

@bind(state => state.comView)
class ComView extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
    }


    render() {
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'View'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComExample>
                    <View style={{ width: '95%', margin: '0 auto', fontSize: 26 }}>
                        这是一个View组件，他是一个基础的弹性盒子,如果不是特殊情况，请用它来取代div标签
                    </View>
                </ComExample>
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10, lineHeight: 1.5 }}>
                        View组件默认主轴为水平方向，换行。
                    </View>
                </ComDetail>
            </div>
        );
    }
}
export default ComView; 
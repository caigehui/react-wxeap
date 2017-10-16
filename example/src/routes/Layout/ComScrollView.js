import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, ScrollView, linking } from 'react-wxeap';
import ComExample from '../../components/ComExample';
import ComDetail from '../../components/ComDetail';
import ComHeader from '../../components/ComHeader';

@bind(state => state.comScrollView)
class ComScrollView extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
    }


    render() {
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'ScrollView'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComExample>
                    <ScrollView height={300} width={750} backgroundColor="white">
                        <p>上下拖动我体验一下效果</p>
                        <p>上下拖动我体验一下效果</p>
                        <p>上下拖动我体验一下效果</p>
                    </ScrollView>
                </ComExample>
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10 }}>
                        ScrollView是滚动视图的容器。相比于用body作为容器，ScrollView的体验更好，他拥有回弹效果，并且可以让Navigation固定不动
                    </View>
                </ComDetail>

            </div>
        );
    }
}
export default ComScrollView; 
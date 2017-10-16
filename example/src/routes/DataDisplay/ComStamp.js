import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, Seperator, linking, Stamp} from 'react-wxeap';
import ComDetail from '../../components/ComDetail';
import ComHeader from '../../components/ComHeader';

@bind(state => state.comStamp)
export default class ComStamp extends Component {
    static propTypes = {
        dispatch: PropTypes.func
    }

    render() {
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'Stamp '}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'基本'}>
                以下每个盖章效果内包含了它的颜色和大小
                </ComDetail>
                <Stamp colorType={'red'} size={'s'} right={600} top={300} text={'红，s'} />
                <Stamp colorType={'red'} size={'m'} right={400} top={250} text={'红色，m号'} />
                <Stamp colorType={'red'} size={'l'} right={100} top={200} text={'红色，l号'} />
                <Stamp colorType={'green'} size={'m'} right={580} top={450} text={'绿色，m号'} />
                <Stamp colorType={'blue'} size={'m'} right={400} top={450} text={'蓝色，m号'} />
                <Stamp colorType={'yellow'} size={'m'} right={200} top={450} text={'黄色，m号'} />
                <Stamp colorType={'grey'} size={'m'} right={0} top={450} text={'灰色，m号'} />
                <Seperator style={{ height: 500 }} />
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10, lineHeight: 1.5 }}>
                    Stamp组件共有green,red,blue,yellow,grey五种颜色，三种规格大小s,m,l,通过right和top属性对其位置进行控制
                    </View>
                </ComDetail>
            </div>
        );
    }
}

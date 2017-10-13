import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, Seperator, linking } from 'react-wxeap';
import ComExample from '../../components/ComExample';
import ComDetail from '../../components/ComDetail';
import ComHeader from '../../components/ComHeader';

@bind(state => state.comSeperator)
class ComSeperator extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
    }


    render() {
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'Seperator'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComExample>
                    <View style={{ width: '95%', margin: '0 auto', fontSize: 26 }}>
                        <Seperator />
                    </View>
                </ComExample>
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10 }}>
                        Seperator是默认高度为1px,颜色为rgb(220,220,220)的一条实线，你可以用style自定义样式

                    </View>
                </ComDetail>
            </div>
        );
    }
}
export default ComSeperator; 
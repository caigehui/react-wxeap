import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, Seperator, linking, AccView } from 'react-wxeap';
import ComDetail from '../../components/ComDetail';
import ComHeader from '../../components/ComHeader';

@bind(state => state.comAccView)
export default class ComAccView extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        accs: PropTypes.array
    }


    render() {
        const { accs } = this.props;
        return (
            <div style={{ width: document.documentElement.clientWidth, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'AccView'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'基本'}>
                </ComDetail>
                <AccView accs={accs} />
                <Seperator style={{ height: 18 }} />
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10, lineHeight: 1.5 }}>
                        AccView用来显示一些附件，它会根据不同的文件属性显示不同的图标
                    </View>
                </ComDetail>
            </div>
        );
    }
}

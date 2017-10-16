import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, Seperator, linking, RichContentView } from 'react-wxeap';
import ComDetail from '../../components/ComDetail';
import ComHeader from '../../components/ComHeader';

@bind(state => state.comRichContentView)
export default class ComRichContentView extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
        content: PropTypes.string
    }


    render() {
        const { content } = this.props;
        return (
            <div style={{ width: document.documentElement.clientWidth, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'RichContentView'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'基本示例'}>
                    <RichContentView
                        content={content}
                    />
                </ComDetail>
                <Seperator style={{ height: 18 }} />
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10, lineHeight: 1.5 }}>
                        RichContentView组件用来处理富文本格式，它会保持富文本原来的样式
                    </View>
                </ComDetail>
            </div>
        );
    }
}

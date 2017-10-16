import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, InputBox, linking } from 'react-wxeap';
import ComExample from '../../components/ComExample';
import ComDetail from '../../components/ComDetail';
import ComHeader from '../../components/ComHeader';
import { Toast ,Button} from 'antd-mobile';

@bind(state => state.comInputBox)
class ComInputBox extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
    }


    inputBox = () => {
        InputBox({
            title: '评论',// 标题
            placeholder: '请输入评论',// 最大长度：不指定表示不限制最大长度
            maxLength: 150,
            minLength: 1,
            onConfirm: (value) => {
                Toast.info(`评论内容为：${value}`, 1.5);
            }// 完成评论的回调函数
        });
    }

    render() {
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'InputBox'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComExample>
                    <View style={{ width: '95%', margin: '0 auto', fontSize: 26 }}>
                        InputBox 组件是一个弹出的输入框，试试点击下方按钮
                    </View>
                </ComExample>
                <View onClick={this.inputBox} style={{
                    justifyContent: 'center', fontSize: 34
                }}>
                    <Button type="primary" style={{ width: '75%' }}>显示</Button>
                </View>
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10, lineHeight: 1.5 }}>
                        适用于写文章内容或添加评论的场景
                    </View>
                </ComDetail>
            </div>
        );
    }
}

export default ComInputBox; 
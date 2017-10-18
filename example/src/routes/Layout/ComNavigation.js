import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, Navigation, linking } from 'react-wxeap';
import ComDetail from 'components/ComDetail';
import ComHeader from 'components/ComHeader';
import { Toast } from 'antd-mobile';

@bind(state => state.comNavigation)
class ComNavigation extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
    }


    renderRightContent = () => {
        return <img onClick={() => {
            Toast.info('rightContent已被点击', 1);
        }}
            style={{ height: 30, width: 30 }}
            src={require('../../assets/dots.png')} />;
    }

    render() {
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'Navigation'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'基本示例'}></ComDetail>
                <Navigation autoHide={false} onBack={() => {
                    Toast.info('返回已被点击', 1);
                }} title="这是导航标题" />
                <ComDetail title={'可定制右侧图标，如下:'}></ComDetail>
                <Navigation autoHide={false} onBack={() => {
                    Toast.info('返回已被点击', 1);
                }} title="这是导航标题" rightContent={this.renderRightContent()} />
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10, lineHeight: 1.5 }}>
                        Navigation是导航条，建议每个页面都要使用Navigation，因为document.title会和Navigation的title绑定
                       <br />
                        Navigation在微信浏览器中会自动隐藏
                       <br />
                        如果想强制隐藏，加上hide={'true'}属性,如果想强制不隐藏，加上autoHide={'false'}
                        <br />
                        如果想定制右侧的图标，加上rightContent属性,如果想隐藏左边的按钮，不指定onBack即可
                    </View>
                </ComDetail>
            </div>
        );
    }
}
export default ComNavigation; 
import React, { Component, PropTypes } from 'react';
import * as COLORS from '../../constants';
import View from '../View';
import { routerRedux } from 'dva/router';

const BAR_HEIGHT = 56;
const BORDER_DADIUS = 10;
const DISABLED_OPACITY = 0.6;

import bind from '../../app/bind';

@bind()
export default class SearchBar extends Component {

    static propTypes = {
        width: PropTypes.any, // 搜索条宽度
        disabled: PropTypes.bool, // 是否禁用
        onClick: PropTypes.func, // 点击SeachBar
        onSearch: PropTypes.func, // 触发搜索
        onCancel: PropTypes.func,// 取消查找触发的回调
        renderRow: PropTypes.func,// 渲染每一行
        placeholder: PropTypes.string,// 输入框默认的搜索数据
        label: PropTypes.string,// 默认下方icon提示文字
        notFoundLabel: PropTypes.string,// 未找到数据的提示文字
        style: PropTypes.object, // 样式覆盖
        dispatch: PropTypes.any
    }

    static defaultProps = {
        width: '100%'
    }

    onClick = () => {
        // 禁用
        if (this.props.disabled) return;
        this.props.onClick && this.props.onClick();

        this.props.dispatch(routerRedux.push({
            pathname: '/SearchComponent',
            state: {
                onSearch: this.props.onSearch,
                renderRow: this.props.renderRow,
                placeholder: this.props.placeholder,
                label: this.props.label,
                notFoundLabel: this.props.notFoundLabel,
                onCancel: this.props.onCancel
            }
        }));
    }

    render() {
        const { width, style } = this.props;
        return (
            <View
                style={this.props.disabled ? { ...styles.container, ...styles.disabled, width, ...style } : { ...styles.container, width, ...style }}
                onClick={this.onClick}>
                <img src={require('../../assets/search.png')} style={styles.icon} />
                搜索
            </View>
        );
    }
}

const styles = {
    container: {
        height: BAR_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.BACKGROUND_COLOR,
        color: COLORS.SUBTITLE_COLOR,
        borderRadius: BORDER_DADIUS,
        fontSize: 26
    },
    disabled: {
        color: COLORS.BACKGROUND_COLOR,
        opacity: DISABLED_OPACITY,
        backgroundColor: COLORS.SUBTITLE_COLOR
    },
    icon: {
        height: 36,
        width: 36,
        marginRight: 10
    }
};

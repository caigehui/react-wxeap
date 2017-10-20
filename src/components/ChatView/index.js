import React, { PropTypes, Component } from 'react';
import View from '../View';
import MobileDetect from '../../utils/MobileDetect';
import { Icon } from 'antd-mobile';
import * as CONST from '../../constants';
import $ from 'jquery';

// 加载Histroy的临界ScrollTop 
const LOADING_THRESHOLD = 100;

export default class ChatView extends Component {

    static propTypes = {
        renderRow: PropTypes.func,
        style: PropTypes.object,
        allLoadedText: PropTypes.string,
        getHistory: PropTypes.func,
        getNewMessage: PropTypes.func,
        requestInterval: PropTypes.number,
    }

    static defaultProps = {
        style: {},
        allLoadedText: '没有更多了',
        requestInterval: 8000
    }

    state = {
        data: [],
        allLoaded: false
    }

    // 更新前的scrollTop
    _lastScrollTop = 0

    // 请求历史消息的次数
    _historyRequestCount = 0

    // 是否应该适配chatview的高度
    _shouldAdjustPosition = false

    componentDidMount() {
        // 初始化加载一次历史记录
        this.getHistory(() => {

            // 监听滚动
            let chatview = $('#chatview');
            chatview.on('scroll', () => {

                // 使用timeout来降低触发频率
                if (this.pollingTimeout) {
                    clearTimeout(this.pollingTimeout);
                }
                this.pollingTimeout = setTimeout(() => {
                    if (chatview.scrollTop() < LOADING_THRESHOLD && !this.state.allLoaded && !this._shouldAdjustPosition) {
                        this.getHistory();
                    }
                }, 200);
                
            });

            // 获取新消息并轮询
            this.getNewMessage();
            if (this.props.requestInterval !== 0) {
                // 轮询
                this.timer = setInterval(this.getNewMessage, this.props.requestInterval);
            }
        });
    }

    componentWillUpdate() {
        if (this._shouldAdjustPosition) {
            this._lastScrollTop = $('#chatview')[0].scrollHeight - $('#chatview').scrollTop();
        }
    }

    componentDidUpdate() {
        if (this._shouldAdjustPosition && ($('#chatview')[0].scrollHeight > $('#chatview')[0].clientHeight)) {
            this._shouldAdjustPosition = false;
            let chatview = $('#chatview');
            chatview.scrollTop(chatview[0].scrollHeight - this._lastScrollTop);
        }
    }

    componentWillUnmout() {
        clearInterval(this.timer);
    }

    scrollToBottom = () => {
        $('#chatview').animate({
            scrollTop: $('#chatview')[0].scrollHeight
        });
    }

    scrollToNewMsg = () => {
        $('#chatview').animate({
            scrollTop: this.oldScrollHeight
        });
    }

    /**
     * 新增一条数据
     */
    append = (data, sort) => {
        this.setState({
            data: !sort ? [data, ...this.state.data] : [data, ...this.state.data].sort(sort)
        });
        setTimeout(() => {
            this.scrollToBottom();
        }, 200);
    }

    /**
     * 移除一条记录
     */
    remove = (find) => {
        this.setState({
            data: this.state.data.removeByCondition(find)
        });
    }

    /**
     * 获取新消息
     */
    getNewMessage = () => {
        this.props.getNewMessage && this.props.getNewMessage((data, sort) => {

            this.oldScrollHeight = $('#chatview')[0].scrollHeight;
            // 向前加数据
            this.setState({
                data: !sort ? [...data, ...this.state.data] : [...data, ...this.state.data].sort(sort)
            });
            // 滚动容器至底部
            setTimeout(() => {
                this.scrollToBottom();
            }, 200);
        });
    }

    /**
     * 获取历史消息
     */
    getHistory = (complete) => {
        // 开启适配高度的开关
        this._shouldAdjustPosition = true;
        this.props.getHistory && this.props.getHistory((data, allLoaded) => {
            // 向后加数据
            this.setState({
                data: [...this.state.data, ...data],
                allLoaded
            });
            setTimeout(() => {
                complete && complete();
            }, 200);
        }, this._historyRequestCount);

        this._historyRequestCount += 1;
    }

    // 渲染Header
    renderHeader = () => {
        const styles = {
            icon: {
                justifyContent: 'space-around',
                alignItems: 'center',
                textAlign: 'center',
                verticalAlign: 'middle',
                height: LOADING_THRESHOLD,
                width: '100%',
                flexDirection: 'row',
                fontSize: 28,
                color: 'rgb(160, 160, 160)'
            },
            sep: {
                height: 1,
                width: '25%',
                backgroundColor: 'rgb(220,220,225)',
            }
        };
        return (
            this.state.allLoaded ?
                <View style={styles.icon}>
                    <div style={styles.sep} />
                    {this.props.allLoadedText}
                    <div style={styles.sep} />
                </View>
                :
                <View style={styles.icon}>
                    <Icon type={require('../../assets/loading.svg')} />
                </View>
        );
    }

    render() {
        const { style, renderRow } = this.props;
        const chatviewStyle = {
            height: document.documentElement.clientHeight - ((MobileDetect.isWechat || MobileDetect.isApp ? 0 : 90)),
            width: document.documentElement.clientWidth,
            backgroundColor: CONST.BACKGROUND_COLOR,
            WebkitOverflowScrolling: 'touch',
            overflowX: 'hidden',
            overflowY: 'scroll',
            ...style
        };
        return (
            <div id="chatview" style={chatviewStyle}>
                {this.renderHeader()}
                {
                    [...this.state.data].reverse().map((rowData, index) => {
                        return renderRow(rowData, index);
                    })
                }
            </div>);
    }

}

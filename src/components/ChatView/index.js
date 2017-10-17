import React, { PropTypes, Component } from 'react';
import ReactChatView from './ChatView';
import View from '../View';
import MobileDetect from '../../utils/MobileDetect';
import { Icon } from 'antd-mobile';
import $ from 'jquery';

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

    
    count = 0

    componentDidMount() {
        this.getHistory(() => {
            this.getNewMessage();
            if(this.props.requestInterval !== 0) {
                this.timer = setInterval(this.getNewMessage, this.props.requestInterval);
            }
        });
    }

    componentWillUnmout() {
        clearInterval(this.timer);
    }

    /**
     * 新增一条数据
     */
    append = (data, sort) => {
        this.setState({
            data: !sort ? [data, ...this.state.data] : [data, ...this.state.data].sort(sort)
        });
        setTimeout(() => {
            $('ChatView').animate({
                scrollTop: $('ChatView').scrollHeight
            });
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

    getNewMessage = () => {
        this.props.getNewMessage && this.props.getNewMessage((data, sort) => {
            // 向前加数据
            this.setState({
                data: !sort ? [data, ...this.state.data] : [data, ...this.state.data].sort(sort)
            });
            // 滚动容器至底部
            setTimeout(() => {
                $('ChatView').animate({
                    scrollTop: $('ChatView').scrollHeight
                });
            }, 200);
        });
    }

    getHistory = (complete) => {
        this.props.getHistory && this.props.getHistory((data, allLoaded) => {
            // 向后加数据
            this.setState({
                data: [...this.state.data, ...data],
                allLoaded
            });
            setTimeout(() => {
                complete && complete();
            }, 200);
        }, this.count);

        this.count += 1;
    }

    onLoad = () => {
        return new Promise(resolve => {
            if (this.state.allLoaded) return resolve();
            this.getHistory(resolve);
        });
    }


    render() {
        const { style, renderRow } = this.props;
        const styles = {
            chatview: {
                height: document.documentElement.clientHeight - ((MobileDetect.isWechat || MobileDetect.isApp ? 0 : 90)),
                width: document.documentElement.clientWidth,
                backgroundColor: 'rgb(245,245,249)',
                WebkitOverflowScrolling: 'touch'
            },
            icon: {
                justifyContent: 'space-around',
                alignItems: 'center',
                textAlign: 'center',
                verticalAlign: 'middle',
                height: 100,
                width: document.documentElement.clientWidth,
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
        return <ReactChatView
            style={{ ...styles.chatview, ...style }}
            flipped={true}
            scrollLoadThreshold={50}
            onInfiniteLoad={this.onLoad}
            loadingSpinnerDelegate={!this.state.allLoaded ? <View style={styles.icon}><Icon type={require('../../assets/loading.svg')} /></View> :
                <View style={styles.icon}><div style={styles.sep} />{this.props.allLoadedText}<div style={styles.sep} /></View>}
        >
            {
                this.state.data.map((item, index) => {
                    return renderRow(item, index, this.state.data);
                })
            }
        </ReactChatView>;
    }

}

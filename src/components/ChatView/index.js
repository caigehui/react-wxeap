import React, { PropTypes, Component } from 'react';
import ReactChatView from './ChatView';
import View from '../View';
import MobileDetect from '../../utils/MobileDetect';
import { Icon } from 'antd-mobile';

export default class ChatView extends Component {
    static propTypes = {
        renderRow: PropTypes.func,
        onFetch: PropTypes.func,
        style: PropTypes.object,
        allLoadedText: PropTypes.string,
        stayPosition: PropTypes.bool
    }

    static defaultProps = {
        style: {},
        allLoadedText: '没有更多了'
    }

    state = {
        page: 1,
        data: [],
        allLoaded: false
    }

    componentDidMount() {
        this.reload();
    }

    reload = () => {
        setTimeout(() => {
            this.setState({ page: 1 });
            this.send(1);
        }, 200);
    }

    send = (page) => {
        this.props.onFetch && this.props.onFetch(page, this.fill);
    }

    fill = (data, allLoaded) => {
        const { page } = this.state;
        if (page === 1) {
            this.setState({ data, allLoaded });
        } else {
            this.setState({ data: [...this.state.data, ...data], allLoaded });
        }
        this.resolve && this.resolve();
    }


    onLoad = () => {
        return new Promise(resolve => {
            if (this.state.allLoaded) return;
            this.resolve = resolve;
            this.send(this.state.page + 1);
            this.setState({ page: this.state.page + 1 });
        });
    }


    render() {
        const { style, renderRow } = this.props;
        const styles = {
            chatview: {
                height: document.documentElement.clientHeight - ((MobileDetect.isWechat || MobileDetect.isApp ? 0 : 90)),
                width: document.documentElement.clientWidth,
                backgroundColor: 'rgb(245,245,249)',
                webkitOverflowScrolling: 'touch'
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

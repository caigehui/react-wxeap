import React, { PropTypes } from 'react';
import MobileDetect from '../../utils/mobileDetect';
import {
    ListView,
    RefreshControl,
    Icon
} from 'antd-mobile';

const styles = {
    listView: {
        height: document.documentElement.clientHeight - ((MobileDetect.isWechat || MobileDetect.isApp ? 0 : 90)),
        width: document.documentElement.clientWidth,
        backgroundColor: 'rgb(245,245,249)'
    },
    footer: {
        display: 'flex',
        width: '100%',
        height: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
        textAlign: 'center',
        verticalAlign: 'middle',
    },
    sep: {
        height: 1,
        width: '25%',
        backgroundColor: 'rgb(220,220,225)',
    }
};


let cacheData = {};

export default class extends React.Component {


    static propTypes = {
        listId: PropTypes.string.isRequired,
        refreshable: PropTypes.bool,
        header: PropTypes.string,
        renderHeader: PropTypes.func,
        renderFooter: PropTypes.func,
        pageSize: PropTypes.number.isRequired,
        renderRow: PropTypes.func.isRequired,
        onFetch: PropTypes.func.isRequired,
        renderSeparator: PropTypes.func,
        allLoadedText: PropTypes.string,
        nocache: PropTypes.bool,
        footerHidden: PropTypes.bool,
        style: PropTypes.object,
        scrollBarDiabled: PropTypes.bool,
        mode: PropTypes.oneOf(['default', 'reverse'])
    }

    static defaultProps = {
        refreshable: true,
        listId: 'temp',
        pageSize: 4,
        allLoadedText: '没有更多了',
        nocache: false,
        footerHidden: false,
        mode: 'default',
        scrollBarDiabled: false
    }

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: () => true,
        });

        // 缓存策略
        if (props.nocache) {
            cacheData[props.listId] = [];
        }

        this.state = {
            dataSource: dataSource.cloneWithRows(cacheData[props.listId] || []),
            refreshing: false,
            isLoading: false,
            page: 1,
            allLoaded: false
        };

        this.firstLoaded = true;
        this.onTopReached = false;
    }

    componentDidMount() {
        /**
         * 初始化时触发刷新
         */
        this.reload();
        /**
         * 获取Scroller
         */
        this.scroller = this.listView.refs.listview.refs.listviewscroll.domScroller.scroller;
        this.domScroller = this.listView.refs.listview.refs.listviewscroll.domScroller;
        /**
         * 设置最大scrollTo的距离
         */
        this.scroller.__maxScrollTop = 20000;

        this.props.mode === 'reverse' && this.locateToBottom();
    }

    componentDidUpdate() {

        if(this.firstLoaded && this.firstFill) {
            this.props.mode === 'reverse' && this.locateToBottom();
            this.firstLoaded = false;
            this.firstFill = false;
        }
    }

    /**
     * 触发刷新
     */
    reload = () => {
        // 延时处理，防止提前刷新导致数据不到位的情况出现
        setTimeout(() => {
            this.onRefresh();
        }, 200);
    }

    /**
     * 滚动到指定位置
     */
    scrollTo = (y) => {
        this.scroller.scrollTo(0, y, true);
    }

    /**
     * ListView定位到最底部
     */
    locateToBottom = () => {
        this.scroller.scrollTo(0, this.domScroller.content.clientHeight - this.domScroller.clientSize.y);
    }

    /**
     * 获取当前列表的数据
     */
    getListData() {
        return cacheData[this.props.listId] || [];
    }

    /**
     * 填充数据
     */
    fill = (data, allLoaded, page) => {
        try {
            data = this.props.mode === 'default' ? data : data.reverse();
            if(this.firstLoaded) {
                this.firstFill = true;
            } 
            if (!page) {
                let originData = this.state.page === 1 ? [] : cacheData[this.props.listId];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows([...originData, ...data]),
                    refreshing: false,
                    isLoading: false,
                    allLoaded
                });
                cacheData[this.props.listId] = [...originData, ...data];
            } else {
                let newData = this.state.page === 1 ? [] : cacheData[this.props.listId];
                newData.splice(this.props.pageSize * (page - 1), this.props.pageSize, ...data);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(newData),
                    refreshing: false,
                    isLoading: false,
                    allLoaded
                });
                cacheData[this.props.listId] = newData;
            }
        } catch (err) {
            console.warn(err);
        }
    }

    /**
     * 发送抓取的请求
     */
    send = (page) => {
        this.props.onFetch && this.props.onFetch(page, this.fill);
    }

    /**
     * 列表滚动到底部
     */
    onEndReached = () => {
        if(this.props.mode === 'reverse') return;
        const { isLoading, allLoaded, page } = this.state;
        if (isLoading === false && allLoaded === false) {
            if (!cacheData[this.props.listId] || cacheData[this.props.listId].length === 0) return;/* 初始化不加载 */
            this.setState({
                page: page + 1,
                isLoading: true
            });
            this.send(page + 1);
        }
    }

    /**
     * 刷新
     */
    onRefresh = () => {
        const { refreshing } = this.state;
        if (refreshing === false) {
            this.setState({ refreshing: true, page: 1 });
            this.send(1);
        }
    }

    /**
     * 列表滚动
     */
    onScroll = () => {

    }

    /**
     * 渲染反向列表的加载图片
     */
    renderReverseHeader = () => {

    }

    render() {
        const { header, pageSize, renderRow, refreshable, allLoadedText, renderHeader, scrollBarDiabled, mode } = this.props;
        const { allLoaded, isLoading, refreshing } = this.state;
        let listView = (
            <ListView
                ref={o => this.listView = o}
                dataSource={this.state.dataSource}
                initialListSize={0}
                renderHeader={mode === 'default' ? (renderHeader || header ? () => <span>{header}</span> : null) : this.renderReverseHeader}
                renderFooter={mode === 'default' ? (this.props.renderFooter ? () => this.props.renderFooter(allLoaded, isLoading) : () => this.props.footerHidden ? null :
                    <div style={styles.footer}>
                        <div style={styles.sep} />
                        {allLoaded ? allLoadedText : isLoading ? '加载中...' : '加载完毕'}
                        <div style={styles.sep} />
                    </div>) : null}
                renderRow={renderRow}
                pageSize={pageSize}
                scrollRenderAheadDistance={200}
                scrollEventThrottle={20}
                scrollerOptions={{ scrollbars: !scrollBarDiabled }}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={100}
                refreshControl={refreshable && mode === 'default' ? <RefreshControl
                    icon={<Icon type={require('../../assets/loading.svg')}>}
                    refreshing={refreshing}
                    onRefresh={this.onRefresh} /> : null}
                {...this.props}
                onScroll={this.onScroll}
                useZscroller={true}
                style={{ ...styles.listView, ...this.props.style }} />);
        return (
            <div>
                {listView}
            </div>
        );
    }
}
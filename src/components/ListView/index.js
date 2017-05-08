import React, { PropTypes } from 'react';
import MobileDetect from '../../utils/mobileDetect'
import {
    ListView,
    RefreshControl
} from 'antd-mobile';
const styles = {
    listView: {
        height: document.documentElement.clientHeight - ((MobileDetect.isWechat ? 0 : 90)),
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
        pageSize: PropTypes.number.isRequired,
        renderRow: PropTypes.func.isRequired,
        onFetch: PropTypes.func.isRequired,
        renderSeparator: PropTypes.func,
        allLoadedText: PropTypes.string,
        nocache: PropTypes.bool
    }

    static defaultProps = {
        refreshable: true,
        listId: 'temp',
        pageSize: 4,
        allLoadedText: '没有更多了',
        nocache: false
    }

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: () => true,
        });
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
    }

    reload = () => {
        this.onRefresh();
    }

    scrollTo = (y) => {
        this.listView.scrollTo(0, y);
    }

    componentDidMount() {
        this.onRefresh();
    }

    getListData() {
        return cacheData[this.props.listId] || [];
    }

    fill = (data, allLoaded, page) => {
        try {
            // 作向下兼容处理
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
                let newData = this.state.page === 1 ? [] : cacheData[this.props.listId] || [];
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

    send = (page) => {
        this.props.onFetch && this.props.onFetch(page, this.fill);
    }

    onEndReached = () => {
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

    onRefresh = () => {
        const { refreshing } = this.state;
        if (refreshing === false) {
            this.setState({ refreshing: true, page: 1 });
            this.send(1);
        }
    }

    render() {
        const { header, pageSize, renderRow, refreshable, allLoadedText, renderHeader } = this.props;
        const { allLoaded, isLoading, refreshing } = this.state;
        let listView = (
            <ListView
                ref={o => this.listView = o}
                style={styles.listView}
                dataSource={this.state.dataSource}
                initialListSize={0}
                renderHeader={renderHeader || header ? () => <span>{header}</span> : null}
                renderFooter={() =>
                    <div style={styles.footer}>
                        <div style={styles.sep} />
                        {allLoaded ? allLoadedText : isLoading ? '加载中...' : '加载完毕'}
                        <div style={styles.sep} />
                    </div>}
                renderRow={renderRow}
                pageSize={pageSize}
                scrollRenderAheadDistance={200}
                scrollEventThrottle={20}
                scrollerOptions={{ scrollbars: true }}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={100}
                refreshControl={refreshable ? <RefreshControl
                    refreshing={refreshing}
                    onRefresh={this.onRefresh} /> : null}
                {...this.props} />);
        return (
            <div>
                {listView}
            </div>
        );
    }
}
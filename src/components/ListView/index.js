import React, { PropTypes } from 'react';
import {
    ListView,
    RefreshControl
} from 'antd-mobile';
const styles = {
    listView: {
        height: document.documentElement.clientHeight * 11 / 12,
        width: document.documentElement.clientWidth,
        backgroundColor: 'rgb(245,245,249)'
    },
    footer: {
        display: 'flex',
        width: '100%',
        height: 60,
        justifyContent: 'space-around',
        alignItems:'center',
        textAlign: 'center',
        verticalAlign: 'middle',
    },
    sep: {
        height: 1,
        width: '32%',
        backgroundColor: 'rgb(220,220,225)',
    }
}


let cacheTasks = {}

export default class extends React.Component {


    static propTypes = {
        listId: PropTypes.string,
        refreshable: PropTypes.bool,
        header: PropTypes.string,
        pageSize: PropTypes.number.isRequired,
        renderRow: PropTypes.func.isRequired,
        onFetch: PropTypes.func.isRequired
    }

    static defaultProps = {
        refreshable: true,
        listId: 'temp'
    }

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => true,
        });
        
        this.state = {
            dataSource: dataSource.cloneWithRows(cacheTasks[props.listId] || []),
            refreshing: false,
            isLoading: false,
            page: 1,
            allLoaded: false
        }
    }

    reload = () => {
        this.onRefresh();
    }

    componentDidMount() {
        this.onRefresh();
    }

    send = (page) => {
        this.props.onFetch && this.props.onFetch(page, (tasks, allLoaded) => {
            let originTasks = page === 1 ? [] : cacheTasks[this.props.listId];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows([...originTasks, ...tasks]),
                refreshing: false,
                isLoading: false,
                allLoaded
            });
            cacheTasks[this.props.listId] = [...originTasks, ...tasks];
        });
    }
    onEndReached = () => {
        const { isLoading, allLoaded, page } = this.state;
        if (isLoading === false && allLoaded === false) {
            if ( !cacheTasks[this.props.listId] || cacheTasks[this.props.listId].length === 0) return;/*初始化不加载 */
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
        const { header, pageSize, renderRow, refreshable } = this.props;
        const { allLoaded, isLoading, refreshing } = this.state;
        return (
            <div>
                <ListView
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    initialListSize={0}
                    renderHeader={header ? () => <span>{header}</span> : null}
                    renderFooter={() =>
                        <div style={styles.footer}>
                            <div style={styles.sep}/>
                            {allLoaded ? '没有更多了' : isLoading ? '加载中...' : '加载完毕'}
                            <div style={styles.sep}/>
                        </div>}
                    renderRow={renderRow}
                    pageSize={pageSize}
                    scrollRenderAheadDistance={0}
                    scrollEventThrottle={20}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={30}
                    refreshControl={refreshable?<RefreshControl
                        refreshing={refreshing}
                        onRefresh={this.onRefresh} />:null}
                        {...this.props}/>
        </div>
        )
    }
}
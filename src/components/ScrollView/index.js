import React, { PropTypes, Component } from 'react';
import MobileDetect from '../../utils/MobileDetect';
import { ListView } from 'antd-mobile';

export default class ScrollView extends Component {

    static propTypes = {
        height: PropTypes.number,
        width: PropTypes.number,
        backgroundColor: PropTypes.string,
        children: PropTypes.any,
        style: PropTypes.object,
        useZscroller: PropTypes.bool
    }

    static defaultProps = {
        style: {},
        useZscroller: true
    }

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: () => true,
        });
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
        };
    }

    renderRow = () => {
        return null;
    }

    render() {
        const style = {
            height: document.documentElement.clientHeight - ((MobileDetect.isWechat || MobileDetect.isApp ? 0 : 90)),
            width: document.documentElement.clientWidth,
            backgroundColor: 'transparent'
        };
        return (
            <ListView
                style={{
                    ...style,
                    ...this.props,
                    ...this.props.style
                }}
                renderHeader={() => <div>{this.props.children}</div>}
                dataSource={this.state.dataSource}
                useZscroller={this.props.useZscroller}
                scrollerOptions={{ scrollbars: true }}
                renderRow={this.renderRow}
                pageSize={1}
            />
        );
    }
}
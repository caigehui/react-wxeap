import React, { PropTypes, Component } from 'react';
import MobileDetect from '../../utils/mobileDetect';
import { ListView } from 'antd-mobile';

export default class ScrollView extends Component {

    static propTypes = {
        height: PropTypes.number,
        width: PropTypes.number,
        backgroundColor: PropTypes.string,
        children: PropTypes.any
    }

    static defaultProps = {
        height: document.documentElement.clientHeight - ((MobileDetect.isWechat || MobileDetect.isApp ? 0 : 90)),
        width: document.documentElement.clientWidth,
        backgroundColor: 'transparent'
    }

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: () => true,
        });
        this.state = {
            dataSource: dataSource.cloneWithRows(['']),
        };
    }

    renderRow = () => {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

    render() {
        return (
            <ListView
                style={{
                    height: this.props.height,
                    width: this.props.width,
                    backgroundColor: this.props.backgroundColor
                }}
                dataSource={this.state.dataSource}
                useZscroller={true}
                scrollerOptions={{ scrollbars: true }}
                renderRow={this.renderRow}
                pageSize={1}
            />
        );
    }

}
import React, { PropTypes, Component } from 'react';
import MobileDetect from '../../utils/mobileDetect';
import { ListView } from 'antd-mobile';

export default class ScrollView extends Component {

    static propTypes = {
        height: PropTypes.number,
        width: PropTypes.number,
        backgroundColor: PropTypes.string
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
        state = {
            dataSource: dataSource.cloneWithRows([props.children]),
        }
    }

    renderRow = (children) => {
        return children
    }

    render() {
        <ListView 
            dataSource={this.state.dataSource}
            useZscroller={true}
            scrollerOptions={{ scrollbars: true }}
            renderRow={this.renderRow}
            pageSize={1}
        />
    }

}
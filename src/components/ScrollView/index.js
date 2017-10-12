import React, { PropTypes, Component } from 'react';
import MobileDetect from '../../utils/MobileDetect';
import { ListView } from 'antd-mobile';

export default class ScrollView extends Component {

    static propTypes = {
        height: PropTypes.number,
        width: PropTypes.number,
        backgroundColor: PropTypes.string,
        children: PropTypes.any,
        style: PropTypes.object
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
            height: this.props.height || document.documentElement.clientHeight - ((MobileDetect.isWechat || MobileDetect.isApp ? 0 : 90)),
            width: this.props.width || document.documentElement.clientWidth,
            backgroundColor: this.props.backgroundColor || 'transparent',
            WebkitOverflowScrolling: 'touch',
            overflow: 'scroll',
            overflowX: 'hidden'
        };
        return (
            <div style={this.props.style ? { ...style, ...this.props.style } : style}>
                {
                    React.Children.map(this.props.children, child => child)
                }
            </div>
        );
    }
}
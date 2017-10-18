import React, { Component, PropTypes } from 'react';
import { CONST,View } from 'react-wxeap';
import { Icon} from 'antd-mobile';
class ListItem extends Component {
    static propTypes = {
        content: PropTypes.string,
        pathname: PropTypes.string,
        doAction: PropTypes.func
    }
    doAction=()=>{
        this.props.doAction && this.props.doAction(this.props.pathname);
    }
    render() {
        return (
            <View style={{ width: '100%',color: CONST.SUBTITLE_COLOR,height: 90,borderBottom: '1px solid #ddd',alignItems: 'center' }} onClick={this.doAction}>
                <div style={{flex: 1}}>{this.props.content}</div>
                <div>
                    <Icon type="right" color={CONST.SUBTITLE_COLOR } />
                </div>
            </View>
        );
    }
}
export default ListItem; 
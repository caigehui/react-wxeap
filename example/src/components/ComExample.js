import React, { Component, PropTypes } from 'react';
import { CONST, View } from 'react-wxeap';
class ComExample extends Component {
    static propTypes = {
        children: PropTypes.any
    }
    render() {
        return (
            <View style={{ width: '95%', margin: '40px auto', flexDirection: 'column' }}>
                <div style={{ fontWeight: 'bolder' }}>基本示例</div>
                <View style={{ width: '100%', color: CONST.SUBTITLE_COLOR, paddingTop: 30, paddingBottom: 30, borderBottom: '1px solid #ddd', alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: 20 }} >
                    {this.props.children}
                </View>
            </View>
        );
    }
}
export default ComExample; 
import React, { Component, PropTypes } from 'react';
import { CONST, View } from 'react-wxeap';
class ComDetail extends Component {
    static propTypes = {
        children: PropTypes.any,
        title: PropTypes.string,
    }
    render() {
        return (
            <View style={{ width: '93%', margin: '40px auto', flexDirection: 'column',lineHeight: 1.5 }}>
                    <View style={{ fontWeight: 'bolder' }}>{this.props.title}</View>
                    <View style={{ width: '100%', flexDirection: 'column', color: CONST.SUBTITLE_COLOR, marginTop: 10, fontSize: 26 }} >
                        <View>
                            {this.props.children}
                        </View>
                    </View>
                </View>
        );
    }
}
export default ComDetail; 
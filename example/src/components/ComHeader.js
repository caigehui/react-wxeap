import React, { Component, PropTypes } from 'react';
import { View } from 'react-wxeap';
class Navigation extends Component {
    static propTypes = {
        children: PropTypes.any,
        goBack: PropTypes.func,
        content: PropTypes.string
    }
    doAction=()=>{
        this.props.goBack && this.props.goBack();

    }
    render() {
        return (
            <View style={{ width: '93%',margin: '40px auto', flexDirection: 'column' }}>
                <View style={{ fontWeight: 'bolder', alignItems: 'center' }}>
                    <img 
                        onClick={this.doAction} 
                        style={{ height: 45, width: 45, paddingRight: 30, marginRight: 30, borderRight: '1px solid rgb(220,220,220)' }} 
                        src={require('../assets/homePage.png')} />
                    {`${this.props.content}`}
                </View>
            </View>
        );
    }
}
export default Navigation; 
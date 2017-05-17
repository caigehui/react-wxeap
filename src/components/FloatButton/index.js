import React from 'react';
import View from '../View';
import { Icon } from 'antd-mobile';


export default class FloatButton extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func,
        style: React.PropTypes.object,
        type: React.PropTypes.any,
        color: React.PropTypes.string,
        size: React.PropTypes.oneOf['xxs','xs','sm','md','lg']
    }

    static defaultProps = {
        style: {},
        type: require('../../assets/add.svg'),
        color: 'white',
        size: 'md'
    }

    render() {
        return (
            <View style={{...styles.container, ...this.props.style}} onClick={this.props.onClick}>
                <Icon type={this.props.type}
                    color={this.props.color}
                    size={this.props.size}/>
            </View>
        );
    }
}

const styles = {
    container: {
        position: 'absolute',
        bottom: 50,
        right: 50,
        width: 80,
        height: 80,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40
    }
};
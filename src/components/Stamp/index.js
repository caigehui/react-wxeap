import React, { PropTypes, Component } from 'react';
import View from '../View';
import * as COLORS from '../../constants';
export default class Stamp extends Component {
    static propTypes = {
        colorType: PropTypes.string,// 颜色类型green,red,blue,yellow,grey
        size: PropTypes.oneOf(['s', 'm', 'l']),// 章印大小
        top: PropTypes.number,//位置距离顶部
        right: PropTypes.number,//位置——距离右侧
        text: PropTypes.string//章印内容
    }
    static defaultProps = {
        size: 'm',
        top: 0,
        right: 0,
        text: 'wxsoft',
        colorType: 'red'
    }
    getSize = () => {
        let size = 50;
        let fontSize=26;
        switch (this.props.size) {
            case 's':
                size = 80;
                fontSize=23;
                break;
            case 'm':
                size = 160;
                fontSize=33;
                break;
            case 'l':
                size = 300;
                fontSize=43;
                break;
        }
        return {size,fontSize};
    }
    getUrl = () => {
        let url = require('../../assets/stampRed.png');
        switch (this.props.colorType) {
            case 'red':
                url = require('../../assets/stampRed.png');
                break;
            case 'green':
                url = require('../../assets/stampGreen.png');
                break;
            case 'blue':
                url = require('../../assets/stampBlue.png');
                break;
            case 'yellow':
                url = require('../../assets/stampYellow.png');
                break;
            case 'grey':
                url = require('../../assets/stampGrey.png');
                break;
        }
        return url;
    }
    getColor = () => {
        let color = COLORS.RED_COLOR;
        switch (this.props.colorType) {
            case 'red':
                color = COLORS.RED_COLOR;
                break;
            case 'green':
                color = COLORS.GREEN_COLOR;
                break;
            case 'blue':
                color = COLORS.BLUE_COLOR;
                break;
            case 'yellow':
                color = COLORS.YELLOW_COLOR;
                break;
            case 'grey':
                color = COLORS.SUBTITLE_COLOR;
                break;
        }
        return color;
    }
    render() {
        const url = this.getUrl();
        const color = this.getColor();
        const {size,fontSize} = this.getSize();
        return (
            <View style={{ ...style.container, backgroundImage: `url(${url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: size, height: size, top: this.props.top, right: this.props.right }}>
                <span style={{ color: color, transform: 'rotate(-15deg)',fontSize:fontSize }} >{this.props.text}</span>
            </View>

        );
    }
}
const style = {
    container: {
        width: 150,
        height: 150,
        alignItems: 'center',
        // backgroundColor: '#ffffff',
        flexDirection:'column',
        justifyContent: 'center',
        position: 'absolute',
        top: 50,
        right: 100
    },
};
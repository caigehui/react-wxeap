import React, { PropTypes } from 'react';
import View from '../View';
import * as COLORS from '../../constants';

const colors = [COLORS.BLUE_COLOR, COLORS.RED_COLOR, COLORS.GREEN_COLOR, COLORS.YELLOW_COLOR];

export default class DefaultAvatar extends React.Component {
    
    static propTypes = {
        radius: PropTypes.number,
        id: PropTypes.number,
        name: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        id: 0
    }

    render() {
        const {
            radius,
            id,
            name,
            style
        } = this.props;
        const containerStyle = {
            width: radius * 2,
            height: radius * 2,
            borderRadius: '50%',
            fontSize: radius - 14,
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            backgroundColor: colors[id % colors.length],
        };
        return (
            <View style={{...containerStyle, ...style}}>
                {name.substring(name.length - (name.length > 2 ? 2 : 1), name.length)}
            </View>
        );
    }
}
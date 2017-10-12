import React, { Component, PropTypes } from 'react';
import * as COLORS from '../../constants';
import View from '../View';

export default class Header extends Component {

    static propTypes = {
        label: PropTypes.string,
        type: PropTypes.oneOf(['search', 'search-noresult']),
    }
    
    static defaultProps = {
        label: '查找内容',
        type: 'search'
    }

    render() {
        const { label, type } = this.props;
        return (
            <View style={styles.container}>
                <img src={type === 'search' ? require('../../assets/search.png') : require('../../assets/search-noresult.png')} style={{ height: 80 }} />
                <View style={{ alignItems: 'center', marginTop: 10, }}>
                    <span style={{ fontSize: 28, color: '#bfbfbf' }}>{label}</span>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        marginTop: 100,
        width: '100%',
        height: 500,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContents: 'center',
        backgroundColor: COLORS.BACKGROUND_COLOR
    }
};
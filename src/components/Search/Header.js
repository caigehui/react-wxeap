import React, { Component, PropTypes } from 'react';
import * as COLORS from '../../constants';
import View from '../View';

export default class Header extends Component {
    static propTypes = {
        label: PropTypes.string,
        type: PropTypes.oneOf(['search', 'search-noresult', 'condition']),
        searchCondition: PropTypes.any,
        clickCondition: PropTypes.func,
        condition: PropTypes.any
    }

    static defaultProps = {
        label: '查找内容',
        type: 'search',
        searchCondition: []
    }
    clickCondition = (label, value) => {
        this.props.clickCondition && this.props.clickCondition(label, value);
    }
    // 判断当前的condition是否被选中
    isChoice = (value) => {
        let isChoice = false;
        if (this.props.condition.length === 0) {
            isChoice = false;
        } else {
            for (let i = 0; i < this.props.condition.length; i++) {
                if (this.props.condition[i].value === value) {
                    isChoice = true;
                    break;
                }
            }
        }
        return isChoice;
    }
    render() {
        const { label, type } = this.props;
        return (
            <View style={styles.container}>
                {
                    this.props.searchCondition.length > 0 && type === 'condition' ?
                        <View style={{ flexDirection: 'column', justifyContents: 'center', alignItems: 'center', width: '100%' }}>
                            <div>指定搜索条件</div>
                            <View style={{ alignItems: 'center', justifyContent: 'space-around', width: '90%', marginTop: 30, fontSize: 28, color: COLORS.BLUE_COLOR }}>
                                {
                                    this.props.searchCondition.map((data, i) => (
                                        <View key={i} style={styles.condition} onClick={() => this.clickCondition(data.label, data.value)}>
                                            <span style={
                                                this.isChoice(data.value)
                                                    ?
                                                    { color: '#ffffff', backgroundColor: COLORS.BLUE_COLOR, padding: '10px 20px', fontSize: 26, borderRadius: 10 }
                                                    :
                                                    { borderBottom: `1px solid ${COLORS.BLUE_COLOR}`, }}>
                                                {data.label}
                                            </span>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        :
                        <View>
                            <img src={type === 'search' ? require('../../assets/search.png') : require('../../assets/search-noresult.png')} style={{ height: 80 }} />
                            <View style={{ alignItems: 'center', marginTop: 10, }}>
                                <span style={{ fontSize: 28, color: '#bfbfbf' }}>{label}</span>
                            </View>
                        </View>

                }
            </View>
        );
    }
}

const styles = {
    container: {
        marginTop: 30,
        width: '100%',
        height: 500,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContents: 'center',
        backgroundColor: COLORS.BACKGROUND_COLOR
    },
    condition: {
        width: '30%',
        marginTop: 20,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
};
import React, { PropTypes } from 'react';
import { SwipeAction, Icon } from 'antd-mobile';
import View from '../View';
import * as COLORS from '../../constants';

export default class Cell extends React.Component {

    static propTypes = {
        checked: PropTypes.bool,
        height: PropTypes.any,
        swipable: PropTypes.bool,
        checkable: PropTypes.bool,
        onClick: PropTypes.func,
        onCheck: PropTypes.func,
        actionButtons: PropTypes.array,
        renderContent: PropTypes.func,
        disabled: PropTypes.bool
    }

    static defaultProps = {
        swipable: false,
        checkable: false,
        height: 100,
        actionButtons: []
    }
    
    onCheck = (e) => {
        e.stopPropagation();
        this.props.onCheck && this.props.onCheck(!this.props.checked);
    }

    render() {
        const {
            checked,
            swipable,
            actionButtons,
            checkable,
            onClick,
            renderContent,
            height,
            disabled
        } = this.props;
        return (
            <SwipeAction autoClose right={actionButtons} disabled={!swipable}>
                <View style={{...styles.container, height}} onClick={disabled ? null : () => onClick && onClick(!checked)}>
                    {
                        checkable ?
                            <View style={styles.checkContainer} onClick={disabled ? null : this.onCheck}>
                                <View style={checked ? {...styles.check, border: `1.5px solid ${disabled ? COLORS.SUBTITLE_COLOR : COLORS.PRIMARY_COLOR}`} : styles.check}>
                                    {
                                        checked ?
                                        <Icon type="check" color={disabled ? COLORS.SUBTITLE_COLOR : COLORS.PRIMARY_COLOR}/>
                                        : null
                                    }
                                </View>
                            </View>
                            : <View style={styles.placeholder}/>
                    }
                    {renderContent(checked)}
                </View>
            </SwipeAction>
        );
    }
}

const styles = {
    container: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    checkContainer: {
        width: 100,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    placeholder: {
        width: 30,
        height: '100%',
    },
    check: {
        borderRadius: '50%',
        border: `1.5px solid ${COLORS.SUBTITLE_COLOR}`,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        height: '100%',
        alignItems: 'center'
    },

};
import React, { PropTypes } from 'react';
import { SwipeAction, Icon } from 'antd-mobile';
import View from '../View';
import * as COLORS from '../../constants';

export default class Cell extends React.Component {

    static propTypes = {
        type: PropTypes.string.isRequired,
        cellId: PropTypes.number.isRequired,
        height: PropTypes.any,
        swipable: PropTypes.bool,
        checkable: PropTypes.bool,
        onClick: PropTypes.func,
        onCheck: PropTypes.func,
        actionButtons: PropTypes.array,
        renderContent: PropTypes.func
    }

    static defaultProps = {
        type: 'defaultType',
        swipable: false,
        checkable: false,
        height: 100
    }

    static cells = {}

    static checkedCells = {}

    static checkAll = (type) => {
        Cell.cells[type].map(i => {
            if(!i.state.checked) i.onCheck();
        })
    }

    static removeAll = (type) => {
        Cell.cells[type].map(i => {
            if(i.state.checked) i.onCheck();
        })
    }

    static getCheckedIds = (type) => {
        return Cell.checkedCells[type].map(i => i.props.cellId)
    }

    constructor(props) {
        super(props);
        if(!Cell.checkedCells[props.type]) Cell.checkedCells[props.type] = [];
        if(!Cell.cells[props.type]) Cell.cells[props.type] = [];
        this.state = {
            checked: Cell.checkedCells[props.type].searchByCondition(i => i.props.cellId === props.cellId)
        }
    }

    
    componentDidMount() {
        Cell.cells[this.props.type].push(this);
    }

    componentWillUnmount() {
        Cell.cells[this.props.type] = Cell.cells[this.props.type].removeByCondition(i => i.props.cellId === this.props.cellId);
    }

    onCheck = () => {
        const { checked } = this.state;
        this.setState({
            checked: !checked
        })
        if(checked) {
            Cell.checkedCells[this.props.type] = Cell.checkedCells[this.props.type].removeByCondition(i => i.props.cellId === this.props.cellId)
        }else {
            Cell.checkedCells[this.props.type] = [...Cell.checkedCells[this.props.type], this]
        }
    }

    render() {
        const {
            swipable,
            actionButtons,
            checkable,
            onClick,
            renderContent,
            height
        } = this.props;
        const { checked } = this.state;
        return (
            <SwipeAction autoClose right={actionButtons} disabled={!swipable}>
                <View style={{...styles.container, height}} onClick={onClick}>
                    {
                        checkable ?
                            <View style={styles.checkContainer} onClick={this.onCheck}>
                                <View style={checked ? {...styles.check, border: `1.5px solid ${CONST.PRIMARY_COLOR}`} : styles.check}>
                                    {
                                        checked ?
                                        <Icon type="check" color={CONST.PRIMARY_COLOR}/>
                                        : null
                                    }
                                </View>
                            </View>
                            : null
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
    check: {
        borderRadius: '50%',
        border: `1.5px solid ${CONST.SUBTITLE_COLOR}`,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        height: '100%',
        alignItems: 'center'
    },

};
import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, DatePicker, Seperator, linking } from 'react-wxeap';
import ComDetail from 'components/ComDetail';
import ComHeader from 'components/ComHeader';
import { Button } from 'antd-mobile';

@bind(state => state.comDatePicker)
class ComDatePicker extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
        date: PropTypes.object
    }

    popupDatepicker = () => {
        const { date } = this.props;
        DatePicker({
            checked: date,
            onSelect: (newDate) => {
                this.props.dispatch({
                    type: 'comDatePicker/save',
                    payload: {
                        date: newDate,
                    }
                });
            }
        });
    }

    render() {
        const { date } = this.props;
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'DatePicker'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'基本示例'}>
                </ComDetail>
                <View style={{ justifyContent: 'center', fontSize: 34, alignItems: 'space-between' }}>
                    <Button onClick={this.popupDatepicker} style={{ width: '93%', fontWeight: 'bold' }}>
                        {date.start === '' ? '选择日期' : `已选择： ${date.label}`}
                    </Button>
                    <Seperator style={{ height: 18 }} />
                </View>
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10, lineHeight: 1.5 }}>
                        适用于用来选择时间一个时间段，一般和筛选栏搭配使用
                    </View>
                </ComDetail>
            </div>
        );
    }
}

export default ComDatePicker; 
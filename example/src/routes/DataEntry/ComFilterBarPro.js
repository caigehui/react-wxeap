import React, { Component, PropTypes } from 'react';
import { CONST, View, FilterBarPro, bind, linking, DatePicker } from 'react-wxeap';
import ComDetail from 'components/ComDetail';
import ComHeader from 'components/ComHeader';

@bind(state => state.comFilterBarPro)
class ComFilterBarPro extends Component {

    static propTypes = {
        dispatch: React.PropTypes.func,
        status: React.PropTypes.any,
        statuValue: React.PropTypes.array,
        date: React.PropTypes.any,
        isLastGrade: React.PropTypes.bool,
        conditionsPro: React.PropTypes.array
    }

    onFilterChange = (values, index) => {
        const { dispatch } = this.props;
        if (index === 0) {
            // 切换动态筛选      
            dispatch({
                type: 'comFilterBarPro/save',
                payload: {
                    statuValue: values[0],
                }
            });
        }
    }

    onFilterClick1 = (index, cb) => {
        if (index === 1) {
            const { date } = this.props;
            DatePicker({
                checked: date,
                onSelect: (newDate) => {
                    this.props.dispatch({
                        type: 'comFilterBarPro/save',
                        payload: {
                            date: newDate
                        }
                    });
                    cb(newDate.label);
                }
            });
        } else if (index === 2) {

            const { isLastGrade } = this.props;
            this.props.dispatch({
                type: 'comFilterBarPro/save',
                payload: {
                    isLastGrade: !isLastGrade
                }
            });
            if (isLastGrade) {
                cb('全部级别');
            } else {
                cb('最后一级');
            }
        } else {
            cb(null);
        }
    }

    onCustomClick = (index, cb) => {
        if (index === 2) {
            const { date } = this.props;
            DatePicker({
                checked: date,
                onSelect: (newDate) => {
                    this.props.dispatch({
                        type: 'example/save',
                        payload: {
                            date: newDate
                        }
                    });
                    cb(newDate.label, newDate);
                }
            });
        } else {
            cb(null, null);
        }
    }

    onChangePro = (values) => {
        console.log(values);
    }

    render() {
        const { status, statuValue } = this.props;
        let conditions1 = [status, [{ label: '全部日期', value: '全部日期' }], [{ label: '最后一级', value: '最后一级' }]];
        let values1 = [statuValue, ['全部日期'], ['最后一级']];
        return (
            <div style={{ width: document.documentElement.clientWidth, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
                <ComHeader
                    content={'FilterBarPro'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComDetail title={'基本示例'}>
                </ComDetail>
                <View style={{ marginTop: 50, marginBottom: 50, marginLeft: 20, marginRight: 20, fontSize: 30 }}>点击下方的筛选栏，这里会同步显示当前筛选条件</View>
                <FilterBarPro
                    filterBarId="1"
                    conditions={conditions1}
                    values={values1}
                    onChange={this.onFilterChange1}
                    onClick={this.onFilterClick1}
                    conditionsPro={this.props.conditionsPro}
                    onCustomClick={this.onCustomClick}
                    onChangePro={this.onChangePro}
                    switchBtns= {[2]}
                />
                />
				<ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10 }}>条件筛选栏组件,可对页面进行信息过滤，最多支持四个筛选栏目，栏目支持自定义,并且针对乒乓键业务额外增加了切换图标，只需要指定switchBtns属性即可。每一个筛选栏目可以设置子栏目。还有筛选面板支持“radio”“list”“custom”“date”4种类型的筛选，是一个非常强大的筛选组件</View>
                </ComDetail>
            </div>
        );
    }
}
export default ComFilterBarPro; 
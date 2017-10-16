import React, { Component, PropTypes } from 'react';
import { CONST, View, FilterBar, bind, linking, DatePicker } from 'react-wxeap';
import ComDetail from '../../components/ComDetail';
import ComHeader from '../../components/ComHeader';

@bind(state => state.comFilterBar)
class ComFilterBar extends Component {

	static propTypes = {
		dispatch: PropTypes.func,
		conditions: PropTypes.array,
		date: PropTypes.object,
		statusValues: PropTypes.array,
		dateValues: PropTypes.array,
		isReadedValues: PropTypes.array,
		isReaded: PropTypes.bool
	}

	onFilterChange = (values, index) => {
		const { dispatch, } = this.props;
		if (index === 0) {
			// 切换动态筛选
			dispatch({
				type: 'comFilterBar/save',
				payload: {
					statusValues: values[0],
				}
			});
		} else if (index === 1) {
			//
		} else {
			// 特殊选择

		}
	}

	onFilterClick = (index, cb) => {
		if (index === 0) {
			cb(null);
		} else if (index === 1) {
			if(this.props.isReaded) {
				cb('未读');
				this.props.dispatch({
					type: 'comFilterBar/save',
					payload: {
						isReadedValues: ['未读'],
						isReaded: false
					}
				});
			}else {
				cb('已读');
				this.props.dispatch({
					type: 'comFilterBar/save',
					payload: {
						isReadedValues: ['已读'],
						isReaded: true
					}
				});
			}
		} else {
			const { date } = this.props;
			DatePicker({
				checked: date,
				onSelect: (newDate) => {
					this.props.dispatch({
						type: 'comFilterBar/save',
						payload: {
							date: newDate,
							dateValues: [newDate.label]
						}
					});
					cb(newDate.label);
				}
			});

		}
	}

	render() {
		const { conditions, statusValues, isReadedValues, dateValues } = this.props;
		let values = [statusValues, isReadedValues, dateValues];
		return (
			<div style={{ width: document.documentElement.clientWidth, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
				<ComHeader
					content={'FilterBar'}
					goBack={() => {
						linking({
							pathname: '/'
						}, this.props.dispatch);
					}}
				/>
				<ComDetail title={'基本示例'}>
				</ComDetail>
				<View style={{ marginTop: 50, marginBottom: 50, marginLeft: 20, marginRight: 20, fontSize: 30 }}>点击下方的筛选栏，这里会同步显示当前筛选条件<View style={{ color: 'blue', }}>{this.props.statusValues}、{this.props.isReadedValues}、{this.props.dateValues}</View></View>
				<FilterBar
					ref={o => this.filterBar = o}
					conditions={conditions}
					values={values}
					onChange={this.onFilterChange}
					onClick={this.onFilterClick}
					switchBtns= {[1]}
				/>
				<ComDetail title={'组件介绍'}>
					<View style={{ marginTop: 10 }}>条件筛选栏组件,可对页面进行信息过滤，最多支持四个筛选栏目，栏目支持自定义,并且针对乒乓键业务额外增加了切换图标，只需要指定switchBtns属性即可。每一个筛选栏目可以设置子栏目，是一个非常强大的筛选组件</View>
				</ComDetail>
			</div>
		);
	}
}
export default ComFilterBar; 
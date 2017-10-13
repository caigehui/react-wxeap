import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, OrgPicker, Seperator, linking } from 'react-wxeap';
import ComDetail from '../../components/ComDetail';
import ComHeader from '../../components/ComHeader';
import { Button } from 'antd-mobile';

@bind(state => state.comOrgPicker)
class ComOrgPicker extends Component {

	static propTypes = {
		dispatch: PropTypes.func,
        id: PropTypes.number,
        name: PropTypes.string,
        emps: PropTypes.array,
        empId: PropTypes.string,
        empName: PropTypes.string,
        dpts: PropTypes.array,
        radioDptId: PropTypes.string,
        radioDptName: PropTypes.string,
        dptId: PropTypes.string,
        dptName: PropTypes.string,
        companyId: PropTypes.number,
        companyName: PropTypes.string,
        childCmpId: PropTypes.string,
        childCmpName: PropTypes.string,
        currentCmpId: PropTypes.string,
        currentCmpName: PropTypes.string,
	}

	// 人员单选
	onEmpRadioClick = () => {
		const { name, id, companyId } = this.props;
		OrgPicker({
			type: 'empRadio',
			onConfirm: (items) => {
				this.props.dispatch({
					type: 'comOrgPicker/save',
					payload: {
						id: items[0].id,
						name: items[0].name
					}
				});
			},
			checked: name === '' ? [] : [{ id: id, name: name }],// 先判断有没有初始值，如果有用初始值，否则将后台数据转换成checked所需要的形式
			companyId: companyId
		});
	}

	// 人员多选
	onEmpCheckClick = () => {
		const { emps, companyId } = this.props;
		OrgPicker({
			type: 'empCheck',
			onConfirm: (items) => {
				this.props.dispatch({
					type: 'comOrgPicker/save',
					payload: {
						emps: items,
						empId: items.map((i) => {
							return i.id;
						}).toString(),
						empName: items.map((i) => {
							return i.name;
						}).toString()
					}
				});
			},
			checked: emps,// emps是一个对象数组，使用时注意将empId,empName转换成需要的数组形式
			companyId: companyId
		});

	}

	// 部门单选
	onDptRadioClick = () => {
		const { radioDptId, radioDptName, companyId } = this.props;
		OrgPicker({
			type: 'dptRadio',
			onConfirm: (items) => {
				this.props.dispatch({
					type: 'comOrgPicker/save',
					payload: {
						radioDptId: items[0].id,
						radioDptName: items[0].name
					}
				});
			},
			checked: radioDptName === '' ? [] : [{ id: radioDptId, name: radioDptName }],// 先判断有没有初始值，如果有用初始值，否则将后台数据转换成checked所需要的形式
			companyId: companyId
		});
	}

	// 部门多选
	onDptCheckClick = () => {
		// 将字符串形式的dptId和dptName转换为OrgPicker的checked属性需要的数组形式
		const dptIdArr = this.props.dptId === '' ? [this.props.dptId] : this.props.dptId.split(',');
		const dptNameArr = this.props.dptName === '' ? [this.props.dptName] : this.props.dptName.split(',');
		const Arr = [];
		for (let i = 0; i < dptIdArr.length; i++) {
			let result = { id: '', name: '' };
			result.id = parseInt(dptIdArr[i]);
			result.name = dptNameArr[i];
			Arr.push(result);
		}
		const { dpts, companyId } = this.props;
		OrgPicker({
			type: 'dptCheck',
			onConfirm: (items) => {
				this.props.dispatch({
					type: 'comOrgPicker/save',
					payload: {
						dpts: items,
						dptId: items.map((i) => {
							return i.id;
						}).toString(),
						dptName: items.map((i) => {
							return i.name;
						}).toString()
					}
				});
			},
			checked: this.props.dptName === '' ? dpts : Arr,// 先判断有没有初始值，如果有用初始值，否则将后台数据转换成checked所需要的形式
			companyId: companyId
		});
	}

	// 选子公司
	onCmpCheckClick = () => {
		const { childCmpName, childCmpId, companyId } = this.props;
		OrgPicker({
			type: 'cmpCheck',
			onConfirm: (items) => {
				this.props.dispatch({
					type: 'meIndex/save',
					payload: {
						childCmpId: items[0].id,
						childCmpName: items[0].name
					}
				});
			},
			checked: childCmpName === '' ? [] : [{ id: childCmpId, name: childCmpName }],// 先判断有没有初始值，如果没有有,给它一个空数组，否则将后台数据转换成checked所需要的形式
			companyId: companyId
		});

	}

	// 切换公司
	onCmpRadioClick = () => {
		const { currentCmpName, currentCmpId, companyId } = this.props;
		OrgPicker({
			type: 'cmpRadio',
			onConfirm: (items) => {
				this.props.dispatch({
					type: 'meIndex/save',
					payload: {
						currentCmpId: items[0].id,
						currentCmpName: items[0].name
					}
				});
			},
			checked: currentCmpName === '' ? [] : [{ id: currentCmpId, name: currentCmpName }],// 先判断有没有初始值，如果没有有,给它一个空数组，否则将后台数据转换成checked所需要的形式
			companyId: companyId
		});
	}

	render() {
		const { name, empName, radioDptName, dptName, childCmpName, currentCmpName } = this.props;
		return (
			<div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>
				<ComHeader
					content={'OrgPicker'}
					goBack={() => {
						linking({
							pathname: '/'
						}, this.props.dispatch);
					}}
				/>
				<ComDetail title={'选择人员'}>
				</ComDetail>
				<View style={{
					justifyContent: 'center', fontSize: 34, alignItems: 'space-between'
				}}>
					<Button onClick={this.onEmpRadioClick} style={{ width: '93%', fontWeight: 'bold' }}>{name === '' ? '人员单选' : `已选择:  ${name}`}</Button>
					<Seperator style={{ height: 18 }} />
					<Button onClick={this.onEmpCheckClick} style={{ width: '93%', fontWeight: 'bold' }}>{empName === '' ? '人员多选' : `已选择:  ${empName}`}</Button>
				</View>
				<ComDetail title={'选择部门'}>
				</ComDetail>
				<View style={{
					justifyContent: 'center', fontSize: 34, alignItems: 'space-between'
				}}>
					<Button onClick={this.onDptRadioClick} style={{ width: '93%', fontWeight: 'bold' }}>{radioDptName === '' ? '部门单选' : `已选择:  ${radioDptName}`}</Button>
					<Seperator style={{ height: 18 }} />
					<Button onClick={this.onDptCheckClick} style={{ width: '93%', fontWeight: 'bold' }}>{dptName === '' ? '部门多选' : `已选择:  ${dptName}`}</Button>
				</View>
				<ComDetail title={'选择公司'}>
				</ComDetail>
				<View style={{
					justifyContent: 'center', fontSize: 34, alignItems: 'space-between'
				}}>
					<Button onClick={this.onCmpCheckClick} style={{ width: '93%', fontWeight: 'bold' }}>{childCmpName === '' ? '选子单位' : `已选择:  ${childCmpName}`}</Button>
					<Seperator style={{ height: 18 }} />
					<Button onClick={this.onCmpRadioClick} style={{ width: '93%', fontWeight: 'bold' }}>{currentCmpName === '' ? '切换公司' : `已选择:  ${currentCmpName}`}</Button>
				</View>
				<ComDetail title={'组件介绍'}>
					<View style={{ marginTop: 10, lineHeight: 1.5 }}>
						适用于选择人员、部门、或公司的场景,其中在选择页面点击红色人员或部门名称会取消该选择项
                    </View>
				</ComDetail>
			</div>
		);
	}
}

export default ComOrgPicker; 
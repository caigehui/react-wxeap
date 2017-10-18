import React, { PropTypes, Component } from 'react';
import { bind, Navigation, CONST, View, routerRedux } from 'react-wxeap';
import ListItem from '../components/List/ListItem';
import ListAcc from '../components/List/ListAcc'; 

@bind(state => state.exampleList)
class ExampleList extends Component {
	static propTypes = {
		dispatch: React.PropTypes.func,
		layoutKey: PropTypes.array,
		popupKey: PropTypes.array,
		dataDisplayKey: PropTypes.array,
		dataEntryKey: PropTypes.array,
		combinationKey: PropTypes.array,
		position: PropTypes.number
	}
	componentDidMount() {
		document.body .scrollTop = this.props.position;
	}
	
	componentWillUnmount() {
		this.props.dispatch({
			type: 'exampleList/save',
			payload: {
				position: document.body .scrollTop
			}
			
		});
	}

	// 跳转路由
	compush = (pathname) => {
		this.props.dispatch(routerRedux.push({
			pathname: pathname,
		}));
	}
	// 保存每一个模块的展开状态
	saveKey = (key, id) => {
		switch (id) {
			case 'layout':
				this.props.dispatch({
					type: 'exampleList/save',
					payload: {
						layoutKey: key
					}
				});
				break;
			case 'popup':
				this.props.dispatch({
					type: 'exampleList/save',
					payload: {
						popupKey: key
					}
				});
				break;
			case 'dataEntry':
				this.props.dispatch({
					type: 'exampleList/save',
					payload: {
						dataEntryKey: key
					}
				});
				break;
			case 'dataDisplay':
				this.props.dispatch({
					type: 'exampleList/save',
					payload: {
						dataDisplayKey: key
					}
				});
				break;
			case 'combination':
				this.props.dispatch({
					type: 'exampleList/save',
					payload: {
						combinationKey: key
					}
				});
				break;
		}
	}

	render() {
		
		return (
			<div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, backgroundColor: CONST.BACKGROUND_COLOR, color: CONST.TITLE_COLOR }}>
				<Navigation title="网欣移动开发组件库" hide />
				<View style={{ width: '85%', height: 150, flexDirection: 'column', paddingTop: 100, margin: '0 auto' }}>
					<div style={{ fontSize: 50, fontWeight: 'bolder' }}>React-WxEAP Mobile</div>
					<div style={{ fontSize: 28, marginTop: 30 }}>网欣移动开发组件库</div>
				</View>
				<ListAcc id={'layout'} isSpread={this.props.layoutKey} saveKey={this.saveKey} title={'布局 Layout'} >
					<ListItem content={'Navigation(导航条)'} doAction={this.compush} pathname={'/ComNavigation'} />
					<ListItem content={'View(弹性盒子)'} doAction={this.compush} pathname={'/ComView'} />
					<ListItem content={'Cell(可选列表项)'} doAction={this.compush} pathname={'/ComCell'} />
					<ListItem content={'ScrollView(滚动视图容器)'} doAction={this.compush} pathname={'/ComScrollView'} />
					<ListItem content={'Seperator(分隔线)'} doAction={this.compush} pathname={'/ComSeperator'} />
				</ListAcc>
				<ListAcc id={'popup'} isSpread={this.props.popupKey} saveKey={this.saveKey} title={'弹出层 Popup'}>
					<ListItem content={'ImageViewer(图片预览)'} doAction={this.compush} pathname={'/ComImageViewer'} />
					<ListItem content={'InputBox(弹出一个输入框)'} doAction={this.compush} pathname={'/ComInputBox'} />
					{/* <ListItem content={'OrgPicker(部门/员工/公司选择器)'} doAction={this.compush} pathname={'/ComOrgPicker'} /> */}
					<ListItem content={'DatePicker(时间选择器)'} doAction={this.compush} pathname={'/ComDatePicker'} />
					<ListItem content={'Search(弹出搜索Modal)'} doAction={this.compush} pathname={'/ComSearch'} />
				</ListAcc>
				<ListAcc id={'dataEntry'} isSpread={this.props.dataEntryKey} saveKey={this.saveKey} title={'数据录入 Data Entry'}>
					<ListItem content={'FloatButton(浮动的Button)'} doAction={this.compush} pathname={'/ComFloatButton'} />
					<ListItem content={'ImagePicker(图片选择器)'} doAction={this.compush} pathname={'/ComImagePicker'} />
					<ListItem content={'ImageUploadView(支持自定义按钮的图片选择器)'} doAction={this.compush} pathname={'/ComImageUploadView'} />
					<ListItem content={'SearchBar(搜索栏)'} doAction={this.compush} pathname={'/ComSearchBar'} />
					<ListItem content={'FilterBar(条件筛选栏)'} doAction={this.compush} pathname={'/ComFilterBar'} />
				</ListAcc>
				<ListAcc id={'dataDisplay'} isSpread={this.props.dataDisplayKey} saveKey={this.saveKey} title={'数据展示 Data Display'}>
					<ListItem content={'DefaultAvatar(头像)'} doAction={this.compush} pathname={'/ComDefaultAvatar'} />
					<ListItem content={'RichContentView(显示富文本的View)'} doAction={this.compush} pathname={'/ComRichContentView'} />
					<ListItem content={'PinchZoomView(缩放视图)'} doAction={this.compush} pathname={'/ComPinchZoomView'} />
					<ListItem content={'AccView(附件视图)'} doAction={this.compush} pathname={'/ComAccView'} />
					<ListItem content={'Stamp(盖章效果)'} doAction={this.compush} pathname={'/ComStamp'} />
				</ListAcc>
				<ListAcc id={'combination'} isSpread={this.props.combinationKey} saveKey={this.saveKey} title={'组合组件 Combination'}>
					<ListItem content={'ListView(长列表)'} doAction={this.compush} pathname={'/ComListView'} />
					<ListItem content={'ChatView(适用于聊天的长列表)'} doAction={this.compush} pathname={'/ComChatView'} />
				</ListAcc>
			</div>
		);
	}
}

export default ExampleList;

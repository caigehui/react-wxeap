import React from 'react';
import wrapProps from '../../utils/wrapProps';
import request from '../../app/request';
import View from '../View';
import ListView from '../ListView';
import { Popup, NavBar, Icon, List } from 'antd-mobile';
import * as COLORS from '../../constants';
import * as Acc from '../../utils/acc';
const ListItem = List.Item;

const colors = [COLORS.BLUE_COLOR, COLORS.RED_COLOR, COLORS.GREEN_COLOR, COLORS.YELLOW_COLOR];

class OrgPicker extends React.Component {

    static propTypes = {
        type: React.PropTypes.oneOf(['empCheck', 'empRadio', 'dptCheck', 'dptRadio']),
        checked: React.PropTypes.arrayOf(React.PropTypes.object),
        onConfirm: React.PropTypes.func,
        companyId: React.PropTypes.number
    }

    static defaultProps = {
        type: 'empRadio',
        checked: [],
        companyId: 0
    }

    static indexForType = {}

    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
            index: OrgPicker.indexForType[props.type] || [],
            loading: true,
            org: []
        };
    }

    componentDidMount() {
        setTimeout(() => {
            if(this.state.index.length === 0) {
                this.request(0);
            }else {
                let id = this.state.index[this.state.index.length - 1].id;
                this.request(id);
                this.setState({
                    index: this.state.index.removeByCondition(i => i.id === id)
                });
            }
        }, 250);
        window.addEventListener('resize', () => {
            this.forceUpdate();
        }, false);
    }

    request = (dptId) => {
        this.setState({ loading: true });
        request(`${API}EAPOrg/QueryOrg?dptId=${dptId}&companyId=${this.props.companyId}`).then(({ data }) => {
            OrgPicker.indexForType[this.props.type] = [...this.state.index, data.org[0]];
            this.setState({
                index: OrgPicker.indexForType[this.props.type],
                org: data.org,
                loading: false
            });
            this.fill([''], true);
            this.listView.scrollToTop();
        });

    }

    getNavTitle() {
        const { type } = this.props;
        if (type === 'empCheck') return '人员多选';
        else if (type === 'empRadio') return '人员单选';
        else if (type === 'dptCheck') return '部门多选';
        else return '部门单选';
    }

    onConfirm = () => {
        if(this.state.checked.length === 0) return;
        this.props.onConfirm && this.props.onConfirm(this.state.checked);
        Popup.hide();
    }

    onChange = (item) => {
        const { type } = this.props;
        switch (type) {
            case 'empCheck':
            case 'dptCheck':
                this.setState({
                    checked: this.state.checked.searchByCondition(a => a.id === item.id) ? this.state.checked.removeByCondition(a => a.id === item.id) : [...this.state.checked, item]
                });
                break;
            case 'empRadio':
            case 'dptRadio':
                this.setState({
                    checked: [item]
                });
                setTimeout(this.onConfirm, 100);
                break;
        }
    }

    onClick = (id) => {
        this.request(id);
    }

    dptLink = (dptId) => {
        let { index } = this.state;
        let newIndex = [];
        for (let i of index) {
            if (i.id === dptId) break;
            newIndex.push(i);
        }
        OrgPicker.indexForType[this.props.type] = newIndex;
        this.setState({
            index: newIndex
        });
        this.request(dptId);
    }

    renderLoading() {
        return (
            <View style={styles.loading}>
                <View style={styles.loadingText}>
                    加载中...
                </View>
            </View>
        );
    }

    renderNoEmp() {
        return (
            <View style={styles.loading}>
                <View style={styles.loadingText}>
                    该部门是空的
                </View>
            </View>
        );
    }

    renderCheckedContainer() {
        const { checked } = this.state;
        if (checked.length === 0) return null;
        let checkedEl = [];
        checked.map((item, i) => {
            checkedEl.push(<div key={i} style={{
                ...styles.item, color: COLORS.RED_COLOR
            }} >{item.name}</div>);
            if (i === checked.length - 1) return;
            checkedEl.push(<div key={`${i}-sep`} style={{
                ...styles.item, padding: 0, color: COLORS.SUBTITLE_COLOR
            }}>、</div>);
        });
        return (
            <View style={styles.checkedContainer}>
                <div style={{ ...styles.item, color: COLORS.TITLE_COLOR }}>
                    已选择：
                </div>
                {checkedEl}
            </View>
        );
    }

    renderIndexContainer() {
        const { index } = this.state;
        if (index.length === 0) return null;
        let el = [];
        index.map((dpt, i) => {
            el.push(<div key={i} onClick={() => {
                i !== index.length - 1 && this.dptLink(dpt.id);
            }} style={i === index.length - 1 ? { ...styles.item, color: COLORS.SUBTITLE_COLOR } : styles.item}>{dpt.name}</div>);
            if (i === index.length - 1) return;
            el.push(<div key={`${i}-sep`} style={{
                ...styles.item, padding: 0
            }}><Icon type="right" color={COLORS.SUBTITLE_COLOR} size="md" /></div>);
        });
        return (
            <View style={{...styles.indexContainer, width: document.documentElement.clientWidth - 50}}>
                {el}
            </View>
        );
    }

    renderPickerContainer() {
        const { org, checked } = this.state;
        return (
            <div style={styles.pickerContainer}>
                {
                    (() => {
                        switch (this.props.type) {
                            case 'empCheck':
                            case 'empRadio':
                                return (
                                    <List>
                                        {org.map((item, i) => {
                                            if (item.type !== 'all') {
                                                return (
                                                    <ListItem
                                                        key={i}
                                                        onClick={() => item.type === 'emp' ? this.onChange(item) : this.onClick(item.id)}
                                                        thumb={
                                                            item.type === 'dpt' ? 
                                                            <img src={require('../../assets/org.png')} style={styles.icon} />
                                                            :
                                                            !item.avatarHash ?
                                                                <div style={{ ...styles.icon, backgroundColor: colors[item.id % colors.length] }} >{item.name.substring(item.name.length - (item.name.length > 2 ? 2 : 1), item.name.length)}</div>
                                                                :
                                                                <img src={Acc.getThumbUrl(item.avatarHash)} style={styles.icon} />}
                                                        extra={item.type === 'emp' ?
                                                            (checked.searchByCondition(a => a.id === item.id) ?
                                                                <Icon type="check"
                                                                    size="md" color={COLORS.PRIMARY_COLOR} />
                                                                : null)
                                                            :
                                                            <Icon type="right"
                                                                size="md" color={COLORS.SUBTITLE_COLOR} />}>
                                                        {item.name}
                                                        {item.type === 'dpt' ? null : <span style={styles.job}>{item.job}</span>}
                                                    </ListItem>
                                                );
                                            } else
                                                return null;
                                        })}
                                    </List>
                                );
                            case 'dptCheck':
                            case 'dptRadio':
                                return (
                                    <List>
                                        {org.map((item, i) => {
                                            if (item.type !== 'emp') {
                                                return (
                                                    <ListItem
                                                        key={i}
                                                        thumb={<img src={item.type === 'all' ? require('../../assets/org-prt.png') : require('../../assets/org.png')} style={item.type === 'all'
                                                            ? styles.icon : { ...styles.icon, marginLeft: 20 }} />}
                                                        extra={item.isLeaf || item.type === 'all' ?
                                                            (checked.searchByCondition(a => a.id === item.id) ?
                                                                <Icon type="check"
                                                                    size="md" color={COLORS.PRIMARY_COLOR} />
                                                                : null)
                                                            :
                                                            <Icon type="right"
                                                                size="md" color={COLORS.SUBTITLE_COLOR} />
                                                        }
                                                        onClick={() => item.isLeaf || item.type === 'all' ? this.onChange(item) : this.onClick(item.id)}>
                                                        {item.name}
                                                    </ListItem>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </List>
                                );
                        }
                    })()
                }
            </div>
        );
    }

    renderHeader = () => {
        return (
            <div style={{ backgroundColor: 'white' }}>
                {this.renderCheckedContainer()}
                {this.renderIndexContainer()}
            </div>
        );
    }

    render() {
        return (
            <div style={{ ...styles.container, height: document.documentElement.clientHeight }}>
                <NavBar
                    iconName={require('../../assets/close.svg')}
                    mode="light"
                    onLeftClick={Popup.hide}
                    rightContent={this.props.type === 'empRadio' || this.props.type === 'dptRadio' ? null : <div style={styles.tick} onClick={this.onConfirm}
                    >
                        <Icon type={require('../../assets/tick.svg')} color={this.state.checked.length > 0 ? COLORS.PRIMARY_COLOR : 'rgba(74, 144, 226, 0.3)'}/>
                    </div>}
                >{this.getNavTitle()}</NavBar>
                <ListView
                    ref={o => this.listView = o}
                    style={{ height: document.documentElement.clientHeight - 90, width: '100%', backgroundColor: COLORS.BACKGROUND_COLOR }}
                    refreshable={false}
                    footerHidden={true}
                    renderHeader={this.renderHeader}
                    renderRow={() => this.state.loading ? this.renderLoading() : this.state.org.length === 1 ? this.renderNoEmp() : this.renderPickerContainer()}
                    onFetch={(page, fill) => {
                        this.fill = fill;
                        fill([''], true);
                    }} />
            </div>
        );
    }
}

const styles = {
    container: {
        width: '100%',
        backgroundColor: 'white'
    },
    checkedContainer: {
        paddingLeft: 30,
        width: '100%',
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf: 'center',
    },
    indexContainer: {
        paddingLeft: 30,
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf: 'center'
    },
    pickerContainer: {
        borderTop: `1px solid ${COLORS.BORDER_COLOR}`,
        borderBottom: `1px solid ${COLORS.BORDER_COLOR}`,
        width: '100%',
    },
    loading: {
        width: '100%',
        marginTop: 20,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.BACKGROUND_COLOR
    },
    loadingText: {
        fontSize: 28,
        color: COLORS.TITLE_COLOR,
    },
    icon: {
        display: '-webkit-flex',
        width: 70,
        height: 70,
        borderRadius: '50%',
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    item: {
        display: '-webkit-flex',
        alignItems: 'center',
        height: 50,
        fontSize: 28,
        color: 'rgb(0,126,218)',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 6
    },
    job: {
        color: 'white',
        backgroundColor: 'rgb(57, 174, 255)',
        borderRadius: 8,
        padding: '5px 10px',
        marginLeft: 15,
        fontSize: 22
    }
};

export default (options) => {
    Popup.show(<OrgPicker {...options} />, { transitionName: 'am-fade', wrapProps });
};
import React from 'react';
import wrapProps from '../../utils/wrapProps';
import request from '../../app/request';
import View from '../View';
import Cell from '../Cell';
import ListView from '../ListView';
import { Popup, NavBar, Icon, List, SearchBar } from 'antd-mobile';
import * as COLORS from '../../constants';
import * as Acc from '../../utils/Acc';
import SearchHeader from '../Search/Header';

const colors = [COLORS.BLUE_COLOR, COLORS.RED_COLOR, COLORS.GREEN_COLOR, COLORS.YELLOW_COLOR];

class OrgPicker extends React.Component {

    static propTypes = {
        type: React.PropTypes.oneOf(['empCheck', 'empRadio', 'dptCheck', 'dptRadio', 'cmpCheck', 'cmpRadio']),
        checked: React.PropTypes.arrayOf(React.PropTypes.object),
        onConfirm: React.PropTypes.func,
        enableEmpty: React.PropTypes.bool,
        customLabel: React.PropTypes.string,
        nocache: React.PropTypes.bool,
        disableCheckedDelete: React.PropTypes.bool,
        accessControl: React.PropTypes.bool
    }

    static defaultProps = {
        type: 'empRadio',
        checked: [],
    }

    static indexForType = {}

    constructor(props) {
        super(props);
        this.state = {
            originalChecked: props.checked,
            checked: props.checked,
            index: props.nocache ? [] : (OrgPicker.indexForType[props.type] || []),
            loading: true,
            org: [],
            companies: [],
            content: '',
            emps: [],
            focused: false,
            searching: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.state.index.length === 0) {
                this.request(0);
            } else {
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

    request = async (id) => {
        this.setState({ loading: true });
        if (this.props.type === 'cmpCheck') {
            // 公司多选，展示当前公司的子公司
            const { data } = await request(`${API}EAPOrg/QueryChildrenCompany?companyId=${id}`);
            OrgPicker.indexForType[this.props.type] = [...this.state.index, data.companies[0]];
            this.setState({
                index: OrgPicker.indexForType[this.props.type],
                companies: data.companies,
                loading: false
            });
        } else if (this.props.type === 'cmpRadio') {
            // 公司单选，只展示用户所在的全部公司
            const { data } = await request(`${API}EAPOrg/QueryCompany`);
            this.setState({
                companies: data.companies,
                loading: false
            });
        } else {
            if (this.props.accessControl && id === 0) {
                // 权限控制
                const { data: { me } } = await request(`${API}EAPMe/QueryMe`);
                id = me.currentCmpDptId;
            }
            const { data } = await request(`${API}EAPOrg/QueryOrg?dptId=${id}&companyId=0`);
            OrgPicker.indexForType[this.props.type] = [...this.state.index, data.org[0]];
            this.setState({
                index: OrgPicker.indexForType[this.props.type],
                org: data.org,
                loading: false
            });
        }

        // 刷新
        this.listView.refreshUI();
        this.listView.scrollToTop();
    }

    getNavTitle() {
        const { type, customLabel } = this.props;
        if (customLabel) return customLabel;
        switch (type) {
            case 'empCheck': return '人员多选';
            case 'empRadio': return '人员单选';
            case 'dptCheck': return '部门多选';
            case 'dptRadio': return '部门单选';
            case 'cmpCheck': return '子公司选择';
            case 'cmpRadio': return '切换单位';
        }
    }

    onConfirm = () => {
        if (!this.props.enableEmpty && this.state.checked.length === 0) return;
        this.props.onConfirm && this.props.onConfirm(this.state.checked);
        Popup.hide();
    }

    onChange = (item) => {
        const { type } = this.props;
        switch (type) {
            case 'empCheck':
            case 'dptCheck':
            case 'cmpCheck':
                this.setState({
                    checked: this.state.checked.searchByCondition(a => a.id === item.id) ? this.state.checked.removeByCondition(a => a.id === item.id) : [...this.state.checked, item]
                });
                break;
            case 'empRadio':
            case 'dptRadio':
            case 'cmpRadio':
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

    renderIsAllChecked = (all) => {
        const { type } = this.props;
        const { checked } = this.state;
        let newAll = [...all];
        if (type === 'cmpCheck') {
            newAll.splice(0, 1);
        }
        for (let item of newAll) {
            if (type === 'empCheck' && (item.type === 'emp' || item.type === 'prjEmp') && !checked.searchByCondition(i => i.id === item.id)) {
                return false;
            }
            if (type === 'dptCheck' && item.type === 'dpt' && !checked.searchByCondition(i => i.id === item.id)) {
                return false;
            }
            if (type === 'cmpCheck' && !checked.searchByCondition(i => i.id === item.id)) {
                return false;
            }
            if (type === 'prjCheck' && item.type === 'prj' && !checked.searchByCondition(i => i.id === item.id)) {
                return false;
            }
        }
        return true;
    }

    onClickAll = (all) => {
        const { type } = this.props;
        const { checked } = this.state;
        let newChecked = [...checked];
        let newAll = [...all];
        if (type === 'cmpCheck') {
            newAll.splice(0, 1);
        }
        if (this.renderIsAllChecked(all)) {
            for (let item of newAll) {
                if (type === 'empCheck' && !(item.type === 'emp' || item.type === 'prjEmp')) continue;
                if (type === 'dptCheck' && item.type !== 'dpt') continue;
                if (type === 'prjCheck' && item.type !== 'prj') continue;
                if (newChecked.searchByCondition(i => i.id === item.id && i.name === item.name)) {
                    newChecked = newChecked.removeByCondition(i => i.id === item.id && i.name === item.name);
                }
            }
        } else {
            for (let item of newAll) {
                if (type === 'empCheck' && !(item.type === 'emp' || item.type === 'prjEmp')) continue;
                if (type === 'dptCheck' && item.type !== 'dpt') continue;
                if (type === 'prjCheck' && item.type !== 'prj') continue;
                if (newChecked.searchByCondition(i => i.id === item.id && i.name === item.name)) {
                    newChecked = newChecked.removeByCondition(i => i.id === item.id && i.name === item.name);
                }
                newChecked.push(item);
            }
        }
        this.setState({ checked: newChecked });
    }

    renderAllChecked = (all) => {
        return (
            <Cell
                disabled={false}
                checkable={true}
                checked={this.renderIsAllChecked(all)}
                onClick={() => this.onClickAll(all)}
                onCheck={() => this.onClickAll(all)}
                renderContent={() =>
                    <View style={styles.cell}>
                        <View style={styles.label}>
                            全选
                        </View>
                    </View>}
            />
        );
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
                    暂无人员
                </View>
            </View>
        );
    }

    onCheckedClick = (item) => {
        if (this.props.disableCheckedDelete) return;
        const { checked } = this.state;
        this.setState({
            checked: checked.removeByCondition(i => i.id === item.id)
        });
    }

    renderSearchContainer() {
        const { type } = this.props;
        switch (type) {
            case 'dptCheck':
            case 'dptRadio':
            case 'cmpRadio':
            case 'cmpCheck':
                return null;
        }
        return <SearchBar placeholder="搜索" value={this.state.content} onChange={this.onSearch} onFocus={() => this.setState({ focused: true })} onBlur={() => this.setState({ focused: false })} onCancel={() => this.setState({ emps: [], content: '' })} />;
    }

    onSearch = (content) => {
        this.setState({
            content
        });
        content = content.replace(/(^\s*)|(\s*$)/g, '');
        if (content.length === 0) return this.setState({ emps: [] });
        this.setState({ searching: true });
        request(`${API}EAPOrg/Search?content=${content}`).then(({ data }) => {
            this.setState({
                emps: data.emps,
                searching: false
            });
        });
    }

    renderCheckedContainer() {
        const { checked } = this.state;
        if (checked.length === 0) return null;
        let checkedEl = [];
        checked.map((item, i) => {
            checkedEl.push(<div key={i}
                onClick={() => this.onCheckedClick(item)}
                style={{
                    ...styles.item, color: this.props.disableCheckedDelete ? COLORS.SUBTITLE_COLOR : COLORS.RED_COLOR
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
        if (this.state.focused || this.state.content.length > 0) return null;
        if (this.props.type === 'cmpRadio') return null; // 切换公司不需要Index
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
            <View style={{ ...styles.indexContainer, width: document.documentElement.clientWidth - 50 }}>
                {el}
            </View>
        );
    }

    renderSearchResult() {
        const { emps, content, searching, checked, originalChecked } = this.state;
        return (
            <div style={styles.pickerContainer}>
                {
                    content.length === 0 ?
                        <SearchHeader label="搜索人员" type="search" />
                        :
                        emps.length === 0 ?
                            <SearchHeader label={searching ? '加载中' : '没有该人员'} type={searching ? 'search' : 'search-noresult'} />
                            :
                            <List>
                                {emps.map(item => {
                                    return (
                                        <Cell
                                            disabled={this.props.disableCheckedDelete ? originalChecked.searchByCondition(i => i.id === item.id) : false}
                                            key={item.id}
                                            checkable
                                            checked={checked.searchByCondition(a => a.id === item.id)}
                                            onClick={() => this.onChange(item)}
                                            onCheck={() => this.onChange(item)}
                                            renderContent={() =>
                                                <View style={styles.cell}>
                                                    {
                                                        !item.avatarHash ?
                                                            <div style={{ ...styles.icon, backgroundColor: colors[item.id % colors.length] }} >{item.name.substring(item.name.length - (item.name.length > 2 ? 2 : 1), item.name.length)}</div>
                                                            :
                                                            <img src={Acc.getThumbUrl(item.avatarHash)} style={styles.icon} />
                                                    }
                                                    <View style={styles.label}>
                                                        {item.name}
                                                        {!item.jobName ? null : <span style={styles.job}>{item.jobName}</span>}
                                                    </View>
                                                </View>} />

                                    );
                                })}
                            </List>
                }
            </div>
        );

    }

    renderPickerContainer() {
        if (this.state.focused || this.state.content.length > 0) return this.renderSearchResult();
        const { disableCheckedDelete } = this.props;
        const { org, checked, index, companies, originalChecked } = this.state;
        return (
            <div style={styles.pickerContainer}>
                {
                    (() => {
                        switch (this.props.type) {
                            case 'empCheck':
                            case 'empRadio':
                                return (
                                    <List>
                                        {this.props.type === 'empCheck' && org.searchByCondition(i => i.type === 'emp') ? this.renderAllChecked(org) : null}
                                        {org.map(item => {
                                            if (item.type === 'all') return null;
                                            return (
                                                <Cell
                                                    disabled={disableCheckedDelete ? originalChecked.searchByCondition(i => i.id === item.id) : false}
                                                    key={item.id}
                                                    checkable={item.type === 'emp'}
                                                    checked={checked.searchByCondition(a => a.id === item.id)}
                                                    onClick={() => item.type === 'emp' ? this.onChange(item) : this.onClick(item.id)}
                                                    onCheck={() => this.onChange(item)}
                                                    renderContent={() =>
                                                        <View style={styles.cell}>
                                                            {
                                                                item.type === 'dpt' ?
                                                                    <img src={require('../../assets/org.png')} style={styles.icon} />
                                                                    :
                                                                    !item.avatarHash ?
                                                                        <div style={{ ...styles.icon, backgroundColor: colors[item.id % colors.length] }} >{item.name.substring(item.name.length - (item.name.length > 2 ? 2 : 1), item.name.length)}</div>
                                                                        :
                                                                        <img src={Acc.getThumbUrl(item.avatarHash)} style={styles.icon} />
                                                            }
                                                            <View style={styles.label}>
                                                                {item.name}
                                                                {item.type === 'dpt' || !item.jobName ? null : <span style={styles.job}>{item.jobName}</span>}
                                                            </View>
                                                            {
                                                                item.type === 'dpt' ?
                                                                    <View style={styles.arrow}>
                                                                        <Icon type="right"
                                                                            size="md" color={COLORS.SUBTITLE_COLOR} />
                                                                    </View>
                                                                    : null
                                                            }
                                                        </View>} />

                                            );
                                        })}
                                    </List>
                                );
                            case 'dptCheck':
                            case 'dptRadio':
                                return (
                                    <List>
                                        {this.props.type === 'dptCheck' && org.searchByCondition(i => i.type === 'dpt') ? this.renderAllChecked(org) : null}
                                        {org.map(item => {
                                            if (item.type === 'dpt') {
                                                return (
                                                    <Cell
                                                        disabled={disableCheckedDelete ? originalChecked.searchByCondition(i => i.id === item.id) : false}
                                                        key={item.id}
                                                        checked={checked.searchByCondition(a => a.id === item.id)}
                                                        checkable
                                                        onClick={() => item.isLeaf || (index.length === 1 && item.type === 'all') ? this.onChange(item) : this.onClick(item.id)}
                                                        onCheck={() => this.onChange(item)}
                                                        renderContent={() =>
                                                            <View style={styles.cell}>
                                                                <img src={index.length === 1 && item.type === 'all' ? require('../../assets/org-prt.png') : require('../../assets/org.png')}
                                                                    style={styles.icon} />
                                                                <View style={styles.label}>
                                                                    {item.name}
                                                                </View>
                                                                {
                                                                    !item.isLeaf && !(index.length === 1 && item.type === 'all') ?
                                                                        <View style={styles.arrow}>
                                                                            <Icon type="right"
                                                                                size="md" color={COLORS.SUBTITLE_COLOR} />
                                                                        </View>
                                                                        : null
                                                                }
                                                            </View>
                                                        } />
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </List>
                                );
                            case 'cmpCheck':
                                return (
                                    <List>
                                        {this.props.type === 'cmpCheck' && companies.length > 1 ? this.renderAllChecked(companies) : null}
                                        {companies.map((item, i) => {
                                            if (i === 0) return null;
                                            return (
                                                <Cell
                                                    disabled={disableCheckedDelete ? originalChecked.searchByCondition(i => i.id === item.id) : false}
                                                    key={item.id}
                                                    checked={checked.searchByCondition(a => a.id === item.id)}
                                                    checkable
                                                    onClick={() => item.isLeaf ? this.onChange(item) : this.onClick(item.id)}
                                                    onCheck={() => this.onChange(item)}
                                                    renderContent={() =>
                                                        <View style={styles.cell}>
                                                            <img src={require('../../assets/org.png')}
                                                                style={styles.icon} />
                                                            <View style={styles.label}>
                                                                {item.name}
                                                            </View>
                                                            {
                                                                !item.isLeaf ?
                                                                    <View style={styles.arrow}>
                                                                        <Icon type="right"
                                                                            size="md" color={COLORS.SUBTITLE_COLOR} />
                                                                    </View>
                                                                    : null
                                                            }
                                                        </View>
                                                    } />
                                            );
                                        })}
                                    </List>
                                );
                            case 'cmpRadio':
                                return (
                                    <List>
                                        {companies.map(item => {
                                            return (
                                                <Cell
                                                    disabled={disableCheckedDelete ? originalChecked.searchByCondition(i => i.id === item.id) : false}
                                                    key={item.id}
                                                    checked={checked.searchByCondition(a => a.id === item.id)}
                                                    checkable
                                                    onClick={() => this.onChange(item)}
                                                    onCheck={() => this.onChange(item)}
                                                    renderContent={() =>
                                                        <View style={styles.cell}>
                                                            <img src={require('../../assets/org.png')}
                                                                style={styles.icon} />
                                                            <View style={styles.label}>
                                                                {item.name}
                                                            </View>
                                                        </View>
                                                    } />
                                            );
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
                {this.renderSearchContainer()}
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
                        <Icon type={require('../../assets/tick.svg')} color={!this.props.enableEmpty && this.state.checked.length === 0 ? 'rgba(74, 144, 226, 0.3)' : COLORS.PRIMARY_COLOR} />
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
        padding: '15px 30px',
        alignSelf: 'center',
    },
    indexContainer: {
        paddingLeft: 30,
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf: 'center',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all'
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
    cell: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        borderBottom: `1px solid ${COLORS.BORDER_COLOR}`
    },
    label: {
        marginLeft: 20,
        flex: 1,
        height: '100%',
        alignItems: 'center',
        color: COLORS.TITLE_COLOR,
        fontSize: 32
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
    arrow: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 60
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


function show(options) {
    Popup.show(<OrgPicker {...options} />, { transitionName: 'am-fade', wrapProps });
}

export default show;
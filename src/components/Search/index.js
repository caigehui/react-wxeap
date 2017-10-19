import React, { Component, PropTypes } from 'react';
import ListView from '../ListView';
import { SearchBar, Toast } from 'antd-mobile';
import Header from './Header';
import * as COLORS from '../../constants';
import bind from '../../app/bind';
import { routerRedux } from 'dva/router';

function deprecation() {
    console.warn('Searh组件的instance，hide和show不再使用，请删除相关代码');
}

@bind(state => state.searchComponent)
export default class searchComponent extends Component {
    
        static propTypes = {
            onSearch: PropTypes.func, // 触发搜索
            renderRow: PropTypes.func, // 渲染每一行
            onCancel: PropTypes.func,// 取消查找
            placeholder: PropTypes.string,// 输入框默认的搜索数据
            label: PropTypes.string,// 默认下方icon提示文字
            notFoundLabel: PropTypes.string,// 未找到数据的提示文字
            dispatch: PropTypes.any,
            isEmpty: PropTypes.bool,
            isInit: PropTypes.bool,
            content: PropTypes.string,
            autoFocus: PropTypes.bool,
            isBack: PropTypes.bool,
            searchCondition: PropTypes.any,// 可选的搜索条件（[{label:'',value:''},{label:'',value:''}]）
            clickCondition: PropTypes.func,
            condition: PropTypes.any,// 选择的搜索条件   
        }
    
        static defaultProps = {
            label: '查找内容',
            notFoundLabel: '未找到相关内容',
            placeholder: '搜索',
            searchCondition: [],
            condition: []
        }
    
        static instance = {
            show: () => {
                deprecation();
            },
            hide: () => {
                deprecation();
            }
        };
    
        static show = () => {
            deprecation();
        };
    
        static hide = () => {
            deprecation();
        };
    
        constructor(props) {
            super(props);
            this.state = {
                focused: false, // 输入框是否聚焦
            };
        }
    
        componentDidMount() {
            if (this.props.autoFocus) {
                this.setState({ focused: true });
            }
        }
    
        onFetch = (page, fill) => {
            if (!this.props.content) return fill([], true);
            if (page === 1) Toast.loading('正在搜索', 0);
            // 触发onSearch
            let submitCondition = [];
            this.props.condition.map((data) => {
                submitCondition.push(data.value);
            });
            this.props.onSearch && this.props.onSearch(this.props.content, (list, allLoaded) => {
                if (page === 1) Toast.hide();
                this.props.dispatch({ type: 'searchComponent/save', payload: { isEmpty: list.length === 0 } });
                fill(list, allLoaded);
            }, page, submitCondition);
        }
        renderHeader = () => {
            return <Header
                label={this.props.isInit ? this.props.label : this.props.notFoundLabel}
                type={this.props.isInit ? (this.props.searchCondition.length > 0 ? 'condition' : 'search') : 'search-noresult'}
                searchCondition={this.props.searchCondition ? this.props.searchCondition : []}
                clickCondition={this.clickCondition}
                condition={this.props.condition}
            />;
        }
    
        onCancel = () => {
            this.setState({ focused: false });
            this.props.onCancel && this.props.onCancel();
            this.props.dispatch(routerRedux.goBack());
        }
    
        onFocus = () => {
            this.setState({ focused: false });
        }
    
        onSubmit = (value) => {
            // 过滤前后空格
            value = value.replace(/(^\s*)|(\s*$)/g, '');
            this.listView.fill([], true);
            this.listView.scrollToTop();
            this.props.dispatch({ type: 'searchComponent/save', payload: { isInit: !value, content: value } });
            this.setState({ focused: false });
            this.listView.reload();
        }
        clickCondition = (label, value) => {
            let check = true;
            let condition = this.props.condition;
            for (let i = 0; i < condition.length; i++) {
                if (condition[i].value === value) {
                    condition.splice(i, 1);
                    check = false;
                    break;
                }
            }
            if (check) {
                this.props.dispatch({ type: 'searchComponent/save', payload: { condition: [...condition, { label, value }] } });
            } else {
                this.props.dispatch({ type: 'searchComponent/save', payload: { condition: [...condition] } });
            }
        }
        getConditionLabel = () => {
            let lable = [];
            this.props.condition.map((data) => {
                lable.push(data.label);
            });
            return lable.toString();
        }
        onChange = (value) => {
            clearTimeout(this.setTimeout);
            const oldContent = this.props.content;
            this.props.dispatch({ type: 'searchComponent/save', payload: { content: value } });
            this.setTimeout = setTimeout(() => {
                if (oldContent !== value) {
                    this.onSubmit(value);
                    if (value.replace(/(^\s*)|(\s*$)/g, '') === '') {
                        this.props.dispatch({
                            type: 'searchComponent/save',
                            payload: { isInit: true }
                        });
                    }
                }
            }, 300);
    
            // 执行查找
    
        }
        render() {
            return (
                <div style={{ ...styles.container, height: document.documentElement.clientHeight }}>
                    <div style={styles.searchBar}>
                        <SearchBar
                            focused={this.state.focused}
                            placeholder={this.props.condition.length === 0 ? this.props.placeholder : `按“${this.getConditionLabel()}”查询`}
                            onSubmit={this.onSubmit}
                            onFocus={this.onFocus}
                            onCancel={this.onCancel}
                            showCancelButton
                            value={this.props.content}
                            onChange={(value) => {
                                this.onChange(value);
                            }}
                        // onClear={this.onClear}
                        />
                    </div>
                    <ListView
                        style={{
                            height: document.documentElement.clientHeight - 120,
                            width: '100%',
                            backgroundColor: 'rgb(245,245,249)'
                        }}
                        ref={o => this.listView = o}
                        refreshable={false}
                        listId="search"
                        pageSize={100}
                        renderRow={this.props.renderRow}
                        onFetch={this.onFetch}
                        renderHeader={this.props.isEmpty || this.props.isInit ? this.renderHeader : null}
                        nocache={this.props.isBack ? false : true}
                        stayPosition={this.props.isBack ? true : false}
                        footerHidden
                    />
                </div>
            );
        }
    }
    
    const styles = {
        container: {
            width: '100%',
            backgroundColor: COLORS.BACKGROUND_COLOR
        },
        searchBar: {
            paddingTop: 20,
            width: '100%',
            height: 90,
            overflow: 'hidden',
            borderRadius: 5,
        }
    };
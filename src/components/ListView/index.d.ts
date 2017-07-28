/// <reference types="react" />
import React from 'react';
import ListViewProps from './PropTypes';
declare class ListView extends React.Component<ListViewProps, any> {

    /**
     * 填充数据
     * @param data 
     * @param allLoaded 
     * @param page 
     */
    fill(data: any, allLoaded: boolean, page?: number): void;

    /**
     * 获取列表数据
     */
    getListData(): Array

    /**
     * 滚动到顶部
     */
    scrollToTop(): void

    /**
     * 刷新UI不刷新数据
     */
    refreshUI(): void;

    /**
     * 重新加载
     */
    reload(): void;
}

export default ListView;
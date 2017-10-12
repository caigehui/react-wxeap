/// <reference types="react" />
import React from 'react';

declare interface WXListViewProps {
    listId: string;
    style: object;
    refreshable?: boolean;
    header?: string;
    pageSize: number;
    renderRow: (rowData: any, sectionID: any, rowID: any) => React.ReactElement<any>;
    renderHeader?: () => React.ReactElement<any>;
    renderFooter?: () => React.ReactElement<any>;
    onFetch?: (page: number, fill: (data: any, allLoaded: boolean, page?: number) => void) => void;
    renderSeparator?: (sectionID: any, rowID: any) => React.ReactElement<any>;
    allLoadedText?: string;
    nocache?: boolean;
    footerHidden?: boolean;
    stayPosition?: boolean;
}

declare class WXListView extends React.Component<WXListViewProps, any> {

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

export default WXListView;
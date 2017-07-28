/// <reference types="react" />
import React from 'react';
export default interface ListViewProps {
    listId: string;
    style: object;
    refreshable?: boolean;
    header?: string;
    pageSize: number;
    renderRow: (rowData: any, sectionID: any, rowID: any) => JSX.Element;
    renderHeader?: () => JSX.Element;
    renderFooter?: () => JSX.Element;
    onFetch?: (page: number, fill: (data: any, allLoaded: boolean, page?: number) => void) => void;
    renderSeparator?: (sectionID: any, rowID: any) => JSX.Element;
    allLoadedText?: string;
    nocache?: boolean;
    footerHidden?: boolean;
    stayPosition?: boolean;
}
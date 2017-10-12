/// <reference types="react" />
import React from 'react';

declare interface ChatViewProps {
    renderRow: (item: any, index: number, data: Array) => React.ReactElement<any>;
    onFetch?: (page: number, fill: (data: any, allLoaded: boolean) => void) => void;
    style?: object;
    allLoadedText?: string;
    stayPosition?: boolean;
}

declare class ChatView extends React.Component<ChatViewProps, any> {
    /**
     * 填充数据
     * @param data 
     * @param allLoaded 
     */
    fill(data, allLoaded): void;

    /**
     * 重新加载
     */
    reload(): void;
}

export default ChatView;
/// <reference types="react" />
import React from 'react';

declare interface ChatViewProps {
    renderRow: (item: any, index: number, data: Array) => React.ReactElement<any>;
    style?: object;
    allLoadedText?: string;
    /**
     * 传0则不轮询
     */
    requestInterval?: number;
    /**
     * 每过requestInterval的时间执行一次请求
     */
    getNewMessage: (success: (data: Array, sort: Function) => void) => void;
    /**
     * 获取历史消息
     */
    getHistory: (success: (data: Array, allLoaded) => void, count: number) => void;
}

declare class ChatView extends React.Component<ChatViewProps, any> {
    /**
     * 插入一条新数据
     * @param data object
     */
    append(data: object, sort: Function) : void;

    /**
     * 移除一条数据
     * @param find func 
     * example:
     * this.chatView.remove(item => item.id === id)
     */
    remove(find: (item: object) => boolean)

    /**
     * 触发getNewMessage
     */
    getNewMessage() : void;

    /**
     * 触发getHistory
     */
    getHistory(): void;
}

export default ChatView;
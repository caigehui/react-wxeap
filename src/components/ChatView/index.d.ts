/// <reference types="react" />
import React from 'react';

declare interface ChatViewProps {
    renderRow: (item: any, index: number, data: Array) => React.ReactElement<any>;
    style?: object;
    allLoadedText?: string;
    requestInterval?: number;
    getNewMessage?: (success: (data) => void) => void;
    getHistory?: (success: (data) => void) => void;
}

declare class ChatView extends React.Component<ChatViewProps, any> {

}

export default ChatView;
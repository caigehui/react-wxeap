/// <reference types="react" />
import React from 'react';

declare interface RichContentViewProps {
    content?: string;
    style?: object;
    editable?: boolean;
    onChange?: (innerHTML: string) => void;
    contentId: string;
    enableContentChange?: boolean;
    onImageClick?: (index: number, url: string) => void;
}

declare class RichContentView extends React.Component<RichContentViewProps, any> { }

export default RichContentView;
/// <reference types="react" />
import React from 'react';

declare interface RichContentViewProps {
    content?: string;
    style?: object;
    /**
     * 是否可编辑
     */
    editable?: boolean;
    onChange?: (innerHTML: string) => void;
    /**
     * 唯一标识
     */
    contentId: string;
    /**
     * 是否允许动态刷新，默认关闭
     */
    enableContentChange?: boolean;
    onImageClick?: (index: number, url: string, imgEl: any) => void;
    /**
     * 是否固定图片高度
     */
    isFixImgHeight?: boolean;
}

declare class RichContentView extends React.Component<RichContentViewProps, any> { }

export default RichContentView;
/// <reference types="react" />
import React from 'react';

declare interface StampProps {
    /**
     * 颜色类型green,red,blue,yellow,grey
     */
    colorType?: string;
    /**
     * 章印大小
     */
    size?: 's' | 'm' | 'l';
    /**
     * 位置——距离顶部
     */
    top?: number;
    /**
     * 位置——距离右侧
     */
    right?: number;
    /**
     * 章印内容
     */
    text?: string;
}

declare class Stamp extends React.Component<StampProps, any> { }

export default Stamp;
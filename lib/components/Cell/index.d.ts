/// <reference types="react" />
import React from 'react';

declare interface ActionButton {
    text?: string;
    onPress?: Function;
    style?: object;
}

declare interface CellProps {
    /**
     * 是否启用勾选
     */
    checkable?: boolean;
    /**
     * 是否被选中
     */
    checked?: boolean;
    /**
     * 高度
     */
    height?: number;
    /**
     * 是否启用侧滑菜单
     */
    swipable?: boolean;
    /**
     * 点击回调
     */
    onClick?: Function;
    /**
     * 勾选回调
     */
    onCheck?: Function;
    /**
     * 侧滑选项
     */
    actionButtons?: Array<ActionButton>;
    /**
     * 渲染内容
     */
    renderContent?: (isChecked?: boolean) => React.ReactElement<any>;
    /**
     * 是否禁用
     */
    disabled?: boolean;
}

declare class Cell extends React.Component<CellProps, any> {}

export default Cell;
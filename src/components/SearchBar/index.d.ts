/// <reference types="react" />
import React from 'react';

declare interface SearchBarProps {
    width?: number; // 搜索条宽度
    disabled?: boolean; // 是否禁用
    onClick?: Function; // 点击SeachBar
    onSearch?: (content?: string, fill?: Function) => void; // 触发搜索
    onCancel?: Function;// 取消查找触发的回调
    renderRow?: Function;// 渲染每一行
    placeholder?: string;// 输入框默认的搜索数据
    label?: string;// 默认下方icon提示文字
    notFoundLabel?: string;// 未找到数据的提示文字
    style?: object; // 样式覆盖
}

declare class SearchBar extends React.Component<SearchBarProps, any> { }

export default SearchBar;
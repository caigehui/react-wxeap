/// <reference types="react" />
import React from 'react';

declare interface Condition {
    value: string;
    label: string;
    children?: Array<Condition>
}

declare interface FilterBarProps {
    conditions: Array<Condition>;
    values: Array<String>;
    onChange: (values: Array<String>, selectedIndex: number) => void;
    onClick: (index: number, callback: (label: string) => void) => void;
    switchBtns: Array<Number>;
}

declare class FilterBar extends React.Component<FilterBarProps, any> {
    /**
     * 设置Label
     * @param label 
     * @param index 
     */
    setLabel(label: string, index: number): void;
}

export default FilterBar;
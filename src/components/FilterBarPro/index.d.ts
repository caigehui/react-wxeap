/// <reference types="react" />
import React from 'react';

declare interface Condition {
    value: string;
    label: string;
    children?: Array<Condition>
}

declare interface ConditionPro {
    type:'radio' | 'list' | 'custom' | 'date';
    name:string;
    data?:Array<Object>;
    format?:string;
}

declare interface ValuePro {
    value: any;
    label?: string;
}

declare interface FilterBarProProps {
    conditions?: Array<Condition>;
    values?: Array<String>;
    onChange?: (values: Array<String>, selectedIndex: number) => void;
    onClick?: (index: number, callback: (label: string) => void) => void;
    switchBtns?: Array<Number>;
    filterBarId:any;
    conditionsPro?:Array<ConditionPro>;
    defaultValuesPro?:Array<ValuePro>;
    onCustomClick?:(index:number,callback:(label:string,value:any)=>void)=>void;
    onChangePro?:(values:Array<ValuePro>)=>void;
}

declare class FilterBar extends React.Component<FilterBarProProps, any> {
    /**
     * 设置Label
     * @param label 
     * @param index 
     */
    setLabel(label: string, index: number): void;
}

export default FilterBarPro;
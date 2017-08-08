/**
 * 选中的单位
 */
declare interface Item {
    id: number,
    name: string
}

declare interface OrgPickerProps {
    type: 'empCheck' | 'empRadio' | 'dptCheck' | 'dptRadio' | 'cmpCheck' | 'cmpRadio';
    checked?: Array<Item>;
    onConfirm?: (checked: Array<Item>) => void;
    enableEmpty?: boolean;
    // 自定义导航标题
    customLabel?: string;
    // 不保存层级位置
    nocache?: boolean;
    //禁止删除checked的单位
    disableCheckedDelete?: boolean;
}

/**
 * 弹出OrgPicker
 * @param props 
 */
declare function show(props: OrgPickerProps): void;

export default show;

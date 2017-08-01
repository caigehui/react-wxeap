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
}

/**
 * 弹出OrgPicker
 * @param props 
 */
declare function show(props: OrgPickerProps): void;

export default show;

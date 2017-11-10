/**
 * 选中的单位
 */
declare interface Item {
    id: number,
    name: string
}

declare interface OrgPickerProProps {
    type: 'empCheck' | 'empRadio' | 'dptCheck' | 'dptRadio' | 'cmpCheck' | 'cmpRadio';
    checked?: Array<Item>;
    onConfirm?: (checked: Array<Item>) => void;
    // 是否允许为空，默认不允许
    enableEmpty?: boolean;
    // 自定义导航标题
    customLabel?: string;
    // 不保存层级位置
    nocache?: boolean;
    //禁止删除checked的单位
    disableCheckedDelete?: boolean;
    // 权限控制（无法查看上级公司）
    accessControl?: boolean;
}

/**
 * 弹出OrgPickerPro
 * @param props 
 */
declare function show(props: OrgPickerProProps): void;

export default show;

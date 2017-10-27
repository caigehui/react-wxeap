declare interface InputBoxProps {
    /**
     * 点击确认
     */
    onConfirm?: (value: string) => void;
    /**
     * 导航栏的标题
     */
    title?: string;
    /**
     * 输入框的初始值
     */
    initialValue?: string;
    
    placeholder?: string;
    /**
     * 输入的最大长度，为0则不限制
     */
    maxLength?: number;
    /**
     * 输入的最小长度，为0则不限制
     */
    minLength?: number;
    /**
     * 类型，一般用作输入数字，不传默认为textare，需要弹出数字键盘传'number',其他类型参考mobile.ant的InputItem组件
     */
    type?: string;
}

/**
 * 弹出InputBox
 * @param props 
 */
declare function show(props: InputBoxProps): void;

export default show;

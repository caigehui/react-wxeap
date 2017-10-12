declare interface DateType {
    label: '今日' | '昨日' | '本周' | '上周' | '本月' | '上月' | '自定义日期' | '全部日期', 
    start: any, 
    end: any, 
    type: '' | '日历' | '周历' | '月历' | '季度'
}

declare interface DatePickerProps {
    /**
     * 选择日期
     */
    onSelect: (date: DateType) => void;
    /**
     * 已选择的日期
     */
    checked: DateType;
    /**
     * 格式化
     */
    format: string;
    /**
     * 类型：
     * filter：过滤，可以选择一月内，一周内等等
     * statistics: 统计，可以选择本月，本周等等
     */
    type: 'filter' | 'statistics'
}

/**
 * 弹出DatePicker
 * @param props 
 */
declare function show(props: DatePickerProps): void;

export default show;
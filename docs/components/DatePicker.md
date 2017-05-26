# DatePicker

时间选择组件

使用方法:

```
import { DatePicker } from 'react-wxeap'

DatePicker({
    checked: { 
        label: '自定义日期',
        start: '2017-05-20',
        end: '2017-05-25',
        type: '日历'
    },
    format: 'YYYY-MM-DD',
    onSelect: (newDate) => {
        console.log(newDate)
    }
})

```

**checked** : 初始化日期范围

| 属性 | 说明 | 类型 | 默认值 |
| ----|-----|------|------ |
| label | 显示的文字 | '全部日期'/'今日'/'昨日'/'本周'/'上周'/'本月'/'上月'/'自定义日期'  | '全部日期' |
| start | 开始日期 | string | '' |
| end | 结束日期 | end | '' |
| type | 如果label是自定义类型，则type代表日历的类型 | '日历'/'周历'/'月历'/'季度' | '日历' |

**format** ：日期格式

**onSelect** ：选择了新的日期，传入与`checked`相同类型的对象
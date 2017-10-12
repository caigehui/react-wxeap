# InputBox

弹出一个输入框

用法:

```
import { InputBox } from 'react-wxeap'

InputBox({
    title: '评论', // 标题
    placeholder: '请输入评论',
    initialValue: '初始值',
    maxLength: 0, // 最大长度：不指定表示不限制最大长度
    minLength: 0,  // 最小长度
    onConfirm: (value) => {
        console.log(value)
    } // 完成评论的回调函数
})

```

note: 当confirm返回true时，InputBox不关闭
# InputBox

弹出一个输入框

用法:

```
import { InputBox } from 'react-wxeap'

InputBox({
    title: '评论', // 标题
    placeholder: '请输入评论',
    maxLength: 0, // 最大长度：不指定或者为0表示不限制最大长度
    minLength: 0,  // 最小长度
    onConfirm: (value) => {
        console.log(value)
    } // 完成评论的回调函数
})

```
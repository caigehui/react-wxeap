# InputBox

弹出一个输入框

用法:

```
import { InputBox } from 'react-wxeap'

InputBox({
    type:'textarea',//类型，一般用作输入数字，不传默认为textarea。银行卡bankCard,手机号phone,密码password, 数字number,money带小数点的数字键盘
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
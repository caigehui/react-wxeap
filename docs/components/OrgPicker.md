# OrgPicker

用于部门/员工的选择

使用方法：
```
import { OrgPicker } from 'react-wxeap'
OrgPicker({
    type: 'empRaido', //'empCheck' 人员多选, 'empRadio' 人员单选, 'dptCheck' 部门多选, 'dptRadio' 部门单选, 'cmpCheck' 选子单位, 'cmpRadio' 切换公司
    checked: [{ id: 183, name: '张三' }], // 初始化传入已经选择人员
    enableEmpty: true, // 是否允许 没有选择时点击确定
    onConfirm: (items) => {

    } // items是一个对象数组，代表已选的对象（人员或部门），每个对象包括`id`和`name`两个属性。单选时其长度恒为1，多选时长度不定
})
```


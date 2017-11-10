# OrgPickerPro

用于部门/员工的选择

使用方法：
```
import { OrgPicker } from 'react-wxeap'
OrgPicker({
    type: 'empRaido', //'empCheck' 人员多选, 'empRadio' 人员单选, 'dptCheck' 部门多选, 'dptRadio' 部门单选, 'prjRadio' 项目组单选, 'prjCheck' 项目组多选,'cmpCheck' 选子单位, 'cmpRadio' 切换公司
    checked: [{ id: 183, name: '张三' }], // 初始化传入已经选择人员
    enableEmpty: true, // 是否允许 没有选择时点击确定
    onConfirm: (items) => {

    }, // items是一个对象数组，代表已选的对象（人员或部门），每个对象包括`id`和`name`两个属性。单选时其长度恒为1，多选时长度不定
    customLabel: '', // Navigation的Label
    nocache: false, // 是否保留层级位置
    disableCheckedDelete: false, //用于禁止修改已选单位
    accessControl: false, // 权限控制（无法查看上级公司）
})
```
与OrgPicker相比，增加'prjRadio' 项目组单选, 'prjCheck' 项目组多选，以及可以在人员单选和人员多选中选择项目组再根据项目组的结构选择人员
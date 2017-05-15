# OrgPicker

用于部门/员工的选择

使用方法：
```
import { OrgPicker } from 'react-wxeap'
OrgPicker({
    type: 'empRaido', //'empCheck' 人员多选, 'empRadio' 人员单选, 'dptCheck' 部门多选, 'dptRadio' 部门单选
    checked: [{ id: 183, name: '张三' }], // 已经选择人员
    companyId: 1, //公司Id
    
})
```


# Search

弹出搜索的Modal

```
import { Search } from 'react-wxeap'

Search.show({
    onSearch: (value, fill) => {
        
    }, // 搜索回调func
    renderRow: (rowData, index) => {

    }, // 渲染func
    onCancel: () => {

    }, // 取消回调func
    placeholder: '', // 搜索框的初始值
    label: '', // 提示文字
    notFoundLabel: '' // 找不到内容时的提示文字
})

Search.hide(); //强制隐藏

```
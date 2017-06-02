# Cell

`Cell`是支持`antd-mobile`中的`SwpieAction`和`CheckBox`的列表项

```
import {Cell} from 'react-wxeap'

<Cell 
    height={100}
    checkable={true}
    onClick={(isChecked) => console.log(isChecked)}
    onCheck={(isChecked) => console.log(isChecked)}
    swipable={true}
    actionButtons={[
        [
            {
            text: 'Cancel',
            onPress: () => console.log('cancel'),
            style: { backgroundColor: '#ddd', color: 'white' },
            },
            {
            text: 'Delete',
            onPress: () => console.log('delete'),
            style: { backgroundColor: '#F4333C', color: 'white' },
            },
        ]
    ]}
    renderContent={(isChecked) => {
        return <View />
    }}
    />

```

| 属性 | 说明 | 类型 | 默认值 |
| ----|-----|------|------ |
| checked | 是否选中 | bool  | false |
| height | cell的高度 | any | 100 |
| swipable    | 是否允许滑动菜单 | bool |  false  |
| checkable   | 是否允许复选框 | bool | false  |
| onClick | 点击cell | func | |
| onCheck | 点击复选框 | func | |
| actionButtons | 滑动菜单的按钮  | array |  |
| renderContent | 渲染内容  | func |   |
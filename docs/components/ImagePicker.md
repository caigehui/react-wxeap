# ImagePicker

自带压缩功能的图片选择器

```jsx
import { ImagePicker } from 'react-wxeap'
...
<ImagePicker
    files={imgs}
    onChange={(imgs, operationType) => {
        dispatch({ type: 'model/save', payload: { imgs } })
    }}
    onImageClick={ImageViewer}
    selectable={imgs.length < 3}
    maxWidth={800}/>
```


| 属性 | 说明 | 类型 | 默认值 |
| ----|-----|------|------ |
| files    | 图片文件数组,元素为对象,包含属性 url（必选, 可能还有id, orientation, 以及业务需要的其它属性     | Array  | []  |
| onChange    | files 值发生变化触发的回调函数, operationType 操作类型有添加，移除，如果是移除操作，则第三个参数代表的是移除图片的索引  | (files: Object, operationType: string, index: number): void |   |
| onImageClick   | 点击图片触发的回调  | (index: number, files: Object): void |   |
| onAddImageClick | 自定义选择图片的方法  | (): void |   |
| selectable| 是否显示添加按钮  | boolean |  true |
| maxWidth | 图片的最大宽度，如果图片的宽度超出最大值会等比压缩至最大值 | number | 1024 |
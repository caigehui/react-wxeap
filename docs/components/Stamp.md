# Stamp

`Stamp`是用于某些情况下的“章印”

```
import {Stamp} from 'react-wxeap'

<Stamp 
    colorType={'red'} 
    size={'l'} 
    right={200} 
    top={5} 
    text={'章印'}
 />

```

| 属性 | 说明 | 类型 | 默认值 |
| ----|-----|------|------ |
| colorType | 章印颜色类型 | string  | 'blue'/'red'/'yello'/'green'/'grey' |
| size | 章印尺寸 | string | 's'/'m'/'l' |
| text | 章印文本 | string |    |
| top | 距离顶部的距离 | number | 0 |
| right | 距离右侧的距离 | number | 0 |

```

note: Stamp的父元素的样式建议只定义: width,heigt,和position: 'relative'
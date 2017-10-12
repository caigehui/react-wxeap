# FloatButton

浮动的Button

使用方法:

```
import { FloatButton } from 'react-wxeap'

class Example extends from Component {

    render() {
        return (
            <View>
                <FloatButton onClick={() => console.log('onClick!')}/>
            </View>
        )
    }
}

```

| 属性 | 说明 | 类型 | 默认值 |
| ----|-----|------|------ |
| onClick    | 点击按钮     | func  |   |
| style    | 自定义样式，不推荐使用该属性  | object |   |
| type   | 内置 icon 名称或 require 资源 | string / require('xxx') |   |
| color | icon的颜色  | string | white  |
| size| icon的大小  | string |  'xxs'/'xs'/'sm'/'md'/'lg' |
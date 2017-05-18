#ScrollView

`ScrollView`是滚动视图的容器。相比于用`body`作为容器，`ScrollView`的体验更好，他拥有回弹效果，并且可以让`Navigation固定不动`

使用方法很简单:

```
import { ScrollView } from 'react-wxeap'

class Eample extends React.Component {

    render() {
        <div>
            <Navigaiton title="Example"/>
            <ScrollView height={500} width={200} backgroundColor="white">
                {//Contents Here }
            </ScrollView>
        </div>
    }
}

```

| 属性 | 说明 | 类型 | 默认值 |
| ----|-----|------|------ |
| height    | 高度     | number  |   |
| width | 宽度 | number | document.documentElement.clientWidth |
| backgroundColor    | 背景颜色  | string |  transparent  |


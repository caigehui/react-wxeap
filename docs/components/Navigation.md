# Navigation

`Navigation`是导航条，建议每个页面都要使用`Navigation`，因为`document.title`会和`Navigation`的`title`绑定

`Navigation`在微信浏览器中会自动隐藏

`Navigation`限制标题最大长度为8,超出内容会用省略号代替显示

如果想强制`隐藏`，加上`hide={true}`属性即可

如果想强制`不隐藏`，加上`autoHide={false}`属性即可

如果想定制右侧的图标，加上`rightContent`属性

如果想隐藏左边的按钮，不指定`onBack`即可

```
import { Navigation } from 'react-wxeap'

<Navigation onBack={() => {
    console.log('onBack')
}} title="新消息" hide={false}/>
```

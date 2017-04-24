# Navigation

`Navigation`是导航条，建议每个页面都要使用`Navigation`，因为`document.title`会和`Navigation`的`title`绑定

`Navigation`在微信浏览器中会自动隐藏
如果想强制隐藏，直接加上`hide`属性即可
```
import { Navigation } from 'react-wxeap'

<Navigation onBack={() => {
    console.log('onBack')
}} title="新消息" hide={false}/>
```

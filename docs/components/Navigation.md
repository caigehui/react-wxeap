# Navigation

`Navigation`有两种模式:
* 正常模式
* 主页模式

一般使用正常模式即可：
```js
import { Navigation } from 'react-wxeap'

<Navigation onBack={() => {
    console.log('onBack')
}} title="新消息" />
```

主页模式是针对工作动态高度定制的功能
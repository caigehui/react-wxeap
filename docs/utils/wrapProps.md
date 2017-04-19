# wrapProps

antd-mobile的一些Modal组件会出现点击穿透事件，传递wrapProps能够防止点击穿透

```
import { wrapProps } from 'react-wxeap';

Popup.show(<div />, { wrapProps })

```

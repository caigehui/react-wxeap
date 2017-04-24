# request 
网络请求的方法

```javascript
import { request } from 'react-wxeap'

request('http://www.baidu.com') // get请求

request('http://www.baidu.com', { id: 1111 }) // post请求，第二个参数为bodyObject

```
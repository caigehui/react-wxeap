# linking

使用linking，在App中会拦截跳转并`push`一个新页面

```javascript
import { linking } from 'react-wxeap';

// 内部路由
linking({
    pathname: '/Emp',
    query: {
        empId
    }
}, this.props.dispatch)

// 外部路由
linking({
    pathname: 'http://sdasdasdasd'
})

```
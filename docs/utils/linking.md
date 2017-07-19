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

// 在effects中

yield put(linking({
    isModel: true,
    pathname: '/Emp',
    query: {
        empId
    }
}))

// 外部路由
linking({
    pathname: 'http://sdasdasdasd'
})

// 返回
linking({
    isGoBack: true
})

// model中返回
yield put(linking({
    isGoBack: true,
    isModel: true
}))

```
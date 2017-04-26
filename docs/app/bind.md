# bind

每个业务视图需要绑定业务模型，并且将业务模型的数据映射到业务视图

示例：

**业务模型-model**
```
export default {
  namespace: 'app',
  state: {
    name: 'example app'
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
};
```

**业务视图-route**
```
import { bind } from 'react-wxeap';

class App extends React.Component {
    render() {
        return (
            <h1>{this.props.name}</h1>
        )
    }
}

const mapStateToProps = state => {
    return state.app
}

export default bind(mapStateToProps)(App)
  
```

这样业务模型的的name属性就绑定到视图中了
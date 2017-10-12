# mobileApp

适用于移动web端

## 配置

1.**在入口出引入 MobileApp**:

```
import { MobileApp } from 'react-wxeap';
```

2.**配置页面**：

* name: 页面的名称
* path: 页面的路径
* model: 业务模型，写法参考[https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md#model](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md#model)
* component: 业务视图
* createForm: 是否启动表单模式

```
let routes = [
  {
    name: 'TasksList',
    path: '/',
    model: require('./models/tasksList'),
    component: require('./routes/TasksList')
  },
  {
    name: 'TaskDetail',
    path: '/TaskDetail',
    model: require('./models/taskDetail'),
    component: require('./routes/TaskDetail'),
    createForm: true
  }
];
```

3.**配置调试地址**：

* module：web应用所属的模块名称，可选：wxcsm, wxoa
* origin: 调试服务器的EAP地址
* auth: 调试的身份认证地址

```
let options = {
  module: 'wxcsm',
  origin: 'http://192.168.0.92/WxSoft.EAP',
  auth: '/WxLoginIF.aspx?EmpNo=sy&EmpPassword=111111'
}
```

4.**启动应用**
```
const app = new MobileApp(routes, options);
app.start();
```

## 表单模式

表单模式控制可控组件，获取可控组件的值

> 可控组件：组件的值由状态控制

```
class Form extends React.Component {
  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (<div>
      <input {...getFieldProps('normal')}/>
      <input {...getFieldProps('required', {
        onChange(){}, // have to write original onChange here if you need
        rules: [{required: true}],
      })}/>
      {(errors = getFieldError('required')) ? errors.join(',') : null}
      <button onClick={this.submit}>submit</button>
    </div>)
  }
}
```

## 引用Redux中间件

可以通过第三个参数传递Redux中间件

```
const app = new MobileApp(routes, options, [locationListener]);
app.start();
```

## 数据持久化

支持自动恢复页面关闭前model的state

只需要在model中设置`persist: true`即可:

```
export default {
  namespace: '...',
  state: {
    ...
  },
  reducers: {
    ...
  },
  persist: true
}
```

## 路由生命周期

在`react-wxeap@3.3.0`以上版本，可以移除`model`中的`subscriptions`

取而代之的是在`effects`中加入以下四个路由生命周期方法：

```
effects: {
    // Push到此Route
    *onPushToRoute({ payload: { current, before } }, { call, put }) {
        console.log(`onPushToRoute: \'${current.pathname}\' from \'${before.pathname}\'`);
    },
    // Pop到此Route
    *onPopToRoute({ payload: { before, current } }) {
        console.log(`onPopToRoute: \'${current.pathname}\' from \'${before.pathname}\'`);
    },
    // 此Route将要Pop
    *routeDidPop({ payload: { current, next } }) {
        console.log(`\'${current.pathname}\' did pop to \'${next.pathname}\'`);
    },
    // 此Route将要Push
    *routeDidPush({ payload: { current, next } }) {
        console.log(`\'${current.pathname}\' did push to \'${next.pathname}\'`);
    },

    ....
}
        
```

note: current代表当前route，next代表下一个route，before代表上一个route
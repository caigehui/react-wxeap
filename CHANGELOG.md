# 2017-4-1 (version 0.5.19)
> 破坏性更新，ListView不向下兼容
* 修复了列表缓存分页失败的BUG

# 2017-4-1 (version 0.5.15)
> 破坏性更新，ListView不向下兼容
* 修复了列表缓存的BUG，ListView新增一个属性listId，现在会根据listId进行数据缓存

# 2017-4-1 (version 0.5.12)
* 新增返回到移动端首页的方法：backToHome

# 2017-4-1 (version 0.5.10)
* 修复Navigation的点击BUG

# 2017-4-1 (version 0.5.9)
* 修复Navigation的显示BUG

# 2017-3-28 (version 0.5.3)
* 修复ListView缓存引起的BUG

# 2017-3-28 (version 0.5.2)
* 新增Navigation

# 2017-3-28 (version 0.4.2)
* ListView新增属性refreshable控制是否可以下拉刷新，默认为true

# 2017-3-27 (version 0.4.1)
* 合并0.3的update
* 列表现在可以缓存数据

# 2017-3-24 (version 0.3.27)
* 新增两个数组的工具方法
* 新增Array的removeObjectsByCondition
* 对字体进行修改
* 列表边框调整
* 新增Seperator分割线

# 2017-3-22 (version 0.3.15)
* 引入babel-polyfill解决Android浏览器找不到Symbol的问题
* 增大了ListView的Footer高度
* 修改textarea字体大小25px->30px
* 新增wrapProps，防止滚动穿透

# 2017-3-21 (version 0.3.8)
* 修改了调试的身份验证机制，当options不传auth或者为空字符串时，则不进行身份验证
* 消除列表body的border


# 2017-3-20 (version 0.3.0)
* 新增ListView替换掉antd-mobile的ListView

    使用方法简单
```js
        <ListView
          ref={o => this.listView = o}
          header="巡检任务列表"
          renderRow={renderRow}
          pageSize={PAGE_SIZE}
          onFetch={this.onFetch} />}
          />}/>
```
* util中新增delay 

    引用后在effects中使用
```js

yield call(delay, 1000)//停留1s
```

# 2017-3-20 (version 0.2.2)

## Update 0.2.2

* 重做了图片预览功能
* 移植全局样式index.css到React WxEAP
* 优化了入口的语句
```js
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

let options = {
  module: 'wxcsm',
  origin: 'http://192.168.0.92/WxSoft.EAP',
  auth: '/WxLoginIF.aspx?EmpNo=sy&EmpPassword=111111'//调试的账户
}

const app = new MobileApp(routes, options);

app.start();
```
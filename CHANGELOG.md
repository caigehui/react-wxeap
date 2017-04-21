# CHANGELOG

## v1.0.0-beta 2017-4-19 by gehui.cai
* 新增Flex布局的基本元素`View`
	* 以后的布局使用`View` 
* 新增`FilterBar`，使用方法参考文档
* 重做`Navigation`组件
	* 移除了所有按钮，只保留返回按钮
	* 识别微信端，自动隐藏导航条
	* 根据`title`修改网页标题 
* 调整`constants.js`至src目录下
* 调整`ListView`
	* 新增属性：`allLoadedText`
	* 新增方法：`scrollTo`
	* 新增方法: `renderHeader`
	* 修改`header`的`padding`为0

## v0.9.2 2017-4-18 by gehui.cai
* 引入eslint检查语法

## 2017-4-17 (version 0.9.1)
修改路径`api`为`wxapi`

## 2017-4-17 (version 0.9.0)
修改request结构以匹配接口格式

## 2017-4-17 (version 0.8.8)
修复：ImageViewer图片位置错误的BUG

## 2017-4-17 (version 0.8.6)
修复：ImagePicker图片方向不正确的BUG

## 2017-4-12 (version 0.8.3)
修复：ImagePicker无法删除图片

## 2017-4-11 (version 0.8.1)
新增ImagePicker，取代antd-mobile的ImagePicker，使用方法一样，但附加了图片压缩功能

## 2017-4-11 (version 0.7.8)
新增: SessionStorage，用于替换LocalStorage

## 2017-4-10 (version 0.7.7)
修复：现在点击Navigation的Menu的阴影区域会隐藏Menu

## 2017-4-7 (version 0.7.6)
修复：htmlFilter现在会转换</p>为'\r\n'

## 2017-4-7 (version 0.7.5)
修复：htmlFilter现在不会过滤掉'\r\n'，而是过滤<br />

## 2017-4-7 (version 0.7.4)
修复：虚拟目录含有模块名会无法请求的BUG

## 2017-4-7 (version 0.7.3)
修复：ImageViewer图片重叠的问题

## 2017-4-6 (version 0.7.2)
新增ListView局部刷新，并作向下兼容的处理

## 2017-4-6 (version 0.7.2)
新增ListView局部刷新，并作向下兼容的处理

## 2017-4-6 (version 0.7.1)
修复：Navigation在微信浏览器中是没有返回按钮的

## 2017-4-6 (version 0.7.0)
新增htmlFilter工具, 用于过滤HTML标签和转义字符

## 2017-4-6 (version 0.6.4)
修复了超时间不操作断开连接的错误提示

## 2017-4-6 (version 0.6.3)
修复了Navigation绝对布局影响底层视图显示的BUG

## 2017-4-5 (version 0.6.2)
新增了LocalStorage作为不同页面之间数据的隐式传递，包括下面四个方法
* getData
* saveData
* getUserDefault
* saveUserDefault 
紧急修复列表返回无法正常刷新的问题

## 2017-4-1 (version 0.5.19)
* 修复了列表缓存分页失败的BUG

## 2017-4-1 (version 0.5.15)
> 破坏性更新，ListView不向下兼容
* 修复了列表缓存的BUG，ListView新增一个属性listId，现在会根据listId进行数据缓存

## 2017-4-1 (version 0.5.12)
* 新增返回到移动端首页的方法：backToHome

## 2017-4-1 (version 0.5.10)
* 修复Navigation的点击BUG

## 2017-4-1 (version 0.5.9)
* 修复Navigation的显示BUG

## 2017-3-28 (version 0.5.3)
* 修复ListView缓存引起的BUG

## 2017-3-28 (version 0.5.2)
* 新增Navigation

## 2017-3-28 (version 0.4.2)
* ListView新增属性refreshable控制是否可以下拉刷新，默认为true

## 2017-3-27 (version 0.4.1)
* 合并0.3的update
* 列表现在可以缓存数据

## 2017-3-24 (version 0.3.27)
* 新增两个数组的工具方法
* 新增Array的removeObjectsByCondition
* 对字体进行修改
* 列表边框调整
* 新增Seperator分割线

## 2017-3-22 (version 0.3.15)
* 引入babel-polyfill解决Android浏览器找不到Symbol的问题
* 增大了ListView的Footer高度
* 修改textarea字体大小25px->30px
* 新增wrapProps，防止滚动穿透

## 2017-3-21 (version 0.3.8)
* 修改了调试的身份验证机制，当options不传auth或者为空字符串时，则不进行身份验证
* 消除列表body的border


## 2017-3-20 (version 0.3.0)
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

## 2017-3-20 (version 0.2.2)

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
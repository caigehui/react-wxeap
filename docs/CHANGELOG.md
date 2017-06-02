# 更新日志

Note: 严格遵循[Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/)语义化版本规范。

## 2.7.0
`2017-6-2`

* 【新增】`Search`组件
* 【新增】`SearchBar`组件
* 【优化】`OrgPicker`使用`SearchBar`组件

## 2.6.0
`2017-6-1`

* 【新增】`Cell`
* 【新增】`Search`
* 【优化】使用`Cell`优化`OrgPicker`

## 2.5.0
`2017-6-1`

* 【新增】`DefaultAvatar`作为默认头像
* 【优化】`OrgPicker`没有人物头像时的背景色现在会跟Id绑定
* 【优化】`DatePicker`在iPhone4s上的显示效果

## 2.4.1
`2017-5-31`

* 【优化】`OrgPicker`现在再次打开会停留在上次浏览的部门

## 2.4.0
`2017-5-27`

* 【调整】调整图片的路径，统一变为Hash
* 【新增】util新增`acc.js`用于获取图片地址，详见文档

## 2.3.3
`2017-5-26`

* 【修复】`OrgPicker`没有选人时不能打钩

## 2.3.2
`2017-5-26`

* 【优化】`ListView`提供一个`refreshUI`方法

## 2.3.1
`2017-5-25`

* 【修复】修复`OrgPicker`的一个BUG

## 2.3.0
`2017-5-25`

* 【优化】`FilterBar`支持设置单个label
* 【新增】新增`DatePicker`

## 2.2.6 
`2017-5-25`

* 【修复】`Navigation`的标题在微信中一直闪烁的BUG
* 【修复】`OrgPicker`的一些小错误

## 2.2.5
`2017-5-24`

* 【修复】现在日期会本地化

## 2.2.3
`2017-5-24`

* 【新增】`Navigation`新增autoHide


## 2.2.2
`2017-5-24`

* 【优化】`Navigation`支持扩展

## 2.2.1
`2017-5-23`

* 【优化】`FilterBar`高度自适应
* 【修复】修复了打开`FilterBar`会在body底部添加空白内容的BUG

## 2.2.0
`2017-5-22`

* 【新增】`datetimeFormat`用于转换时间字符串

## 2.1.1
`2017-5-22`

* 【优化】`Navigation`支持隐藏返回图标

## 2.1.0
`2017-5-22`

* 【新增】`ChatView`聊天的列表
* 【优化】`ScrollView`和`ListView`

## 2.0.0
`2017-5-16`

* 【新增】`rnApp.js`作为`React Native`端入口
* 【新增】`InputBox`组件，适用于评论等业务
* 【新增】`OrgPicker`组件，用于选择部门或人员，支持单选和多选
* 【新增】`ScrollView`组件，用于内嵌滚动视图
* 【新增】`FloatButton`组件，作为浮动按钮
* 【优化】调整列表默认高度
* 【优化】列表支持隐藏`Footer`
* 【修复】修复`FilterBar`切换条件时不会隐藏菜单的BUG
* 【新增】`Navigation`和`MobileDetect`对`App`的支持
* 【修复】`ImageViewer`出现的几个问题
* 【优化】`ListView`的`reload`方法有200毫秒延迟防止数据不到位
* 【优化】`MobileApp`以支持全局刷新

## 1.1.3
`2017-5-2`

* 【修复】更新`re-carousel`以修复图片预览的BUG

## 1.1.1
`2017-4-28`

* 【优化】`MobileApp`加入了错误提示


## 1.1.0
`2017-4-27` 

* 【优化】动态识别web和rn的入口文件
* 【新增】react-native的生命周期的支持
* 【优化】新增屏幕变化的监听方法，不刷新页面而是刷新router，提升页面性能
* 【优化】更改`FilterBar`样式，允许有空格
* 【优化】新增会话丢失的全局错误处理，现在丢失会话会自动刷新页面
* 【优化】引入`redux-persist`，实现数据持久化
* 【移除】移除`sessionStorage`和`localStorage`

## 1.0.4
`2017-4-26`

* 【修复】`ImageViewer`的错误

## 1.0.3
`2017-4-25`

* 【修改】文档更新

## 1.0.2
`2017-4-24`

* 【修复】在`ListView`中给`input`加上`capture=“camera”`兼容Android设备的拍照问题

## 1.0.1 
`2017-4-24`

* 【新增】`ListView`新增`nocache`属性以支持不缓存列表数据

## 1.0.0
`2017-4-24`

* 【新增】Flex布局的基本元素`View`
	* 以后的布局使用`View` 
* 【新增】`FilterBar`，使用方法参考文档
* 【重做】`Navigation`组件
	* 移除了所有按钮，只保留返回按钮
	* 识别微信端，自动隐藏导航条
	* 根据`title`修改网页标题 
* 【调整】`constants.js`至src目录下
* 【调整】`ListView`
	* 新增属性：`allLoadedText`
	* 新增方法：`scrollTo`
	* 新增方法: `renderHeader`
	* 修改`header`的`padding`为0
* 【新增】`mobileApp`添加了一个参数`middlewares`以支持自定义中间件
* 【新增】`orientationListener.js`文件监听手机屏幕旋转，如果发生旋转则自动刷新重置布局
* 【修复】`ListView`有时无法加载更多内容的BUG


## 0.9.2
`2017-4-18`

* 【新增】引入eslint检查语法
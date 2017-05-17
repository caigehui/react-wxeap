# 更新日志

Note: 严格遵循[Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/)语义化版本规范。

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
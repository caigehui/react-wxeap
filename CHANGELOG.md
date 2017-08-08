# 更新日志

Note: 严格遵循[Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/)语义化版本规范。

## 3.0.6
`2017-8-8`

* 【优化】`OrgPicker`新增属性`nocache`用于取消层级保留
* 【优化】使用了苹果官方的全局字体
* 【优化】`OrgPicker`新增了`disableCheckedDelete`用于禁止修改已选单位
* 【修复】修复了`SearchBar`和`Search`搜索时的一些BUG

## 3.0.5
`2017-8-7`

* 【修复】开启`perisit`数据无法恢复的BUG

## 3.0.4
`2017-8-7`

* 【修复】`RichContentView`正则表达式错误引起的不显示图片的问题
* 【优化】`RichContentView`支持自定义点击图片的方法

## 3.0.1
`2017-8-4`

* 【优化】`OrgPicker`支持自定义导航栏的Label
* 【修复】修复了`Navigation`在`App`中引起的报错

## 3.0.0
`2017-8-3`

* 【重构】使用`TypeScript`编写全部组件的声明文件，支持代码提示
* 【移除】移除对`React Native`的支持，App使用只能使用2.x版本
* 【修复】`Acc`的`getImagesFromAcc`现在会忽略文件格式的大小写
* 【修复】body的css新增`position: absolute`解决一些布局问题

## 2.13.2
`2017-7-28`

* 【修复】`ImageUploadView`支持自定义input的宽度

## 2.13.0
`2017-7-28`

* 【重做】重做了`Search`组件，现在是使用路由的形式

## 2.12.1
`2017-7-27`

* 【修复】`RichContentView`点击图片后马上又消失的BUG

## 2.12.0
`2017-7-26`

* 【新增】`ImageUploadView`支持自定义图片上传
* 【优化】`InputBox`支持自动聚焦

## 2.11.5
`2017-7-24`

* 【优化】`OrgPicker`新增`enableEmpty`属性以支持不选择时点击确定
* 【优化】`InputBox`支持初始值
* 【优化】`InputBox`当`confirm`返回`true`时，`InputBox`不关闭
* 【优化】`ChatView`添加id

## 2.11.4
`2017-7-20`

* 【修复】`Navigation`标题错误

## 2.11.2
`2017-7-19`

* 【新增】`linking`，在`App`中会进行`Push`
* 【新增】`Navigation`兼容`App`的title
* 【修复】`Navigation`限制标题最大长度为8


## 2.10.21
`2017-7-17`

* 【修复】`acc`兼容`<img>`标签没有结尾的BUG
* 【修复】多个`RichContentView`的图片没有点击响应的BUG

## 2.10.17
`2017-7-17`

* 【修复】`acc`兼容内部短信的`WxAcceesoryDisplay`


## 2.10.16
`2017-7-13`

* 【优化】`ChatView`的`renderRow`返回列表数据

## 2.10.15
`2017-7-13`

* 【修复】`Navigation`的title支持动态变化

## 2.10.14
`2017-7-12`

* 【新增】全局变量`EAP`,作为`EAP`的路径

## 2.10.13
`2017-7-7`

* 【修复】`RichContentView`特定情况下图片无法预览BUG

## 2.10.12
`2017-7-5`

* 【优化】`mobileApp`支持`model`数组

## 2.10.11
`2017-7-5`

* 【优化】`ScrollView`支持关闭`useZscroller`属性

## 2.10.10
`2017-7-4`

* 【优化】`AccView`提供`title`属性
* 【升级】`antd-mobile`以修复`SearchBar`键盘类型不是搜索的问题

## 2.10.8
`2017-6-30`

* 【修复】`RichContentView`base64图片无法预览的BUG

## 2.10.7
`2017-6-30`

* 【优化】`Search`不隐藏Footer, 并加入了搜索提示

## 2.10.5
`2017-6-29`

* 【修复】`RichContentView`初始内容的BUG

## 2.10.4
`2017-6-29`

* 【修复】`Search`搜索的BUG

## 2.10.3
`2017-6-29`

* 【新增】`RichContentView`支持编辑


## 2.10.0
`2017-6-29`

* 【新增】`richContent`用于将换行符转化成P标签


## 2.9.19
`2017-6-29`

* 【优化】`Search`支持分页查询

## 2.9.16
`2017-6-27`

* 【修复】`RichContentView`过滤掉pt单位的字体大小

## 2.9.15
`2017-6-27`

* 【优化】`OrgPicker`换行
* 【优化】`View`新增两个默认的自动换行属性

## 2.9.14
`2017-6-26`

* 【修复】移除预览Header

## 2.9.13
`2017-6-26`

* 【修复】`RichContentView`换行问题
* 【修复】`Acc`图片转化问题
* 【优化】`BackToHome`代码

## 2.9.12
`2017-6-26`

* 【修复】附件预览移除header

## 2.9.11
`2017-6-23`

* 【升级】`antd-mobile`

## 2.9.10
`2017-6-23`

* 【修复】`Search`空值时不会清除列表的BUG

## 2.9.9
`2017-6-23`

* 【优化】`ListView`的stayPosition自动发送请求

## 2.9.8
`2017-6-23`

* 【优化】`ListView`的stayPosition默认关闭

## 2.9.7
`2017-6-12`

* 【修复】`RichContentView`过滤掉alt字段

## 2.9.6
`2017-6-10`

* 【优化】公司选择
* 【新增】`OrgPicker`新增`cmpCheck`和`cmpRadio`分别用于子公司选择和切换公司

## 2.9.4
`2017-6-10`

* 【优化】`FilterBar`会保存labels

## 2.9.3
`2017-6-10`

* 【优化】`ListiView`现在渲染时默认会回到在上次停留的位置

## 2.9.2
`2017-6-9`

* 【优化】`RichContentView`支持Update数据

## 2.9.1
`2017-6-8`

* 【新增】`RichContentView`富文本显示View
* 【优化】`ScrollView`支持传递style
* 【优化】`FloatButton`添加阴影

## 2.8.1
`2017-6-7`

* 【新增】`AccView`附件View

## 2.7.4
`2017-6-6`

* 【优化】`Navaigation`新增返回字样

## 2.7.3
`2017-6-5`

* 【优化】`Search`的placeholder

## 2.7.2
`2017-6-5`

* 【修复】更新`antd-mobile`以修复一些BUG

## 2.7.1
`2017-6-5`

* 【新增】`getImagesFromAccs`通过Accs获取图片

## 2.7.0
`2017-6-2`

* 【新增】`Search`组件
* 【新增】`SearchBar`组件

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
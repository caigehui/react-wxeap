# ChatView

聊天使用的列表，由下至上滚动，用法跟`ListView`类似


`React WxEAP`使用的是自定义容器，而不是body作为容器


| 属性 | 说明 | 类型 | 默认值 |
| ----|-----|------|------ |
| renderRow    | 渲染每一行     | func  | |
| onFetch | 抓取数据 | func | |
| style    | 列表样式  | object |  {}  |
| allLoadedText   | 全部加载完成的文本  | string | '没有更多了'  |
# ListView
`ListView`是高度封装的列表组件，集成了下拉刷新和上拉下载

note: 新增了

```
import { ListView } from 'react-wxeap'

	onFetch = (page, fill) => {
		fill([], true, page)
	}

    ...

	renderRow = (rowData) => {
		return <div/>
	}

    ...

    renderSeparator = (sectionID, rowID) => (
		<div />
	)

    ...

    render() {
        return 
        <ListView
        listId="TweetList"
        header=" "
        ref={o => this.listView = o}
        onFetch={this.onFetch}
        renderRow={this.renderRow}
        pageSize={PAGE_SIZE}
        renderSeparator={this.renderSeparator} />
    }
     
```

`React WxEAP`使用的是自定义容器，而不是body作为容器


| 属性 | 说明 | 类型 | 默认值 |
| ----|-----|------|------ |
| listId    | 列表的唯一标识，必须指定     | string  | 'temp'  |
| style | 样式，一般设置宽高和背景色 | object | |
| refreshable    | 是否允许下拉刷新  | bool |  true  |
| header   | 列表的标题，没有标题或为空字符串则不渲染列表的header，如果指定了`renderHeader`，该属性无效  | string | undefined  |
| renderHeader | 自定义Header | func | |
| renderFooter | 自定义Footer | func | |
| pageSize | 每页的页数，通常跟网络请求的分页的页数一致  | number |  4 |
| renderRow | 渲染每一行  |  (rowData: object): any |   |
| onFetch | 触发网络请求 | (page: number, fill: func): void |  |
| renderSeparator | 渲染分割线 | (sectionId: number, rowId: number): any| |
| nocache | 是否关闭数据缓存 | bool | false |
| allLoadedText | 全部加载完后的文本 | string | '没有更多了' |
| footerHidden | 是否隐藏footer | bool | false |

原型方法：

* fill(data, allLoaded, page): data 需要填充的数据的数组，allLoaded 是否全部加载，page 需要填充的页数
* reload() : 直接触发下拉刷新
* scrollToTop() : 会回到顶部
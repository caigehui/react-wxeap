# ListView
`ListView`是高度封装的列表组件，集成了下拉刷新和上拉下载


```
import { ListView } from 'react-wxeap'

	onFetch = (page, fill) => {
		
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
| refreshable    | 是否允许下拉刷新  | bool |  true  |
| header   | 列表的标题，没有标题或为空字符串则不渲染列表的header  | string | undefined  |
| pageSize | 每页的页数，通常跟网络请求的分页的页数一致  | number |  4 |
| renderRow | 渲染每一行  |  (rowData: object): any |   |
| onFetch | 触发网络请求 | (page: number, fill: func): void |  |
| renderSeparator | 渲染分割线 | (sectionId: number, rowId: number): any| |
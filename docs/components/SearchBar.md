# SearchBar

一个搜索条，点击后会触发`Search`

```
import { SearchBar } from 'react-wxeap'

<SearchBar
    placeholder="查找" 
    onSearch={(value, fill, page, condition) => {
		this.props.dispatch({ type: 'example/query', payload: { page, fill, pageSize: PAGE_SIZE } });
	}} 
    renderRow={this.renderRow}
    label = '查找'
    notFoundLabel = '没有数据'
    onCancel= {()=>{console.log('onCancel')}},
    searchCondition = [{label:'',value''},{label:'',value''}]
/>

```
| 属性 | 说明 | 类型 | 默认值 |
| ----|-----|------|------ |
| placeholder | 搜索框默认文字 | string  | '搜索' |
| onSearch | 查询的回调方法的 | fun(value, fill, page, condition) | value:输入的内容；condition:选择的查询条件 |
| renderRow | 渲染查询列表 | fun |    |
| notFoundLabel | 距离顶部的距离 | strign | '未找到相关内容' |
| onCancel | 取消查找时触发的方法 | fun |  |
| label | 提示文字 | string | '查找内容' |
| searchCondition | 查询条件 | Arry<Condtion> | [] |

```
note: `Search`的全部属性将通过`SearchBar`传递
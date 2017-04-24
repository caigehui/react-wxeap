# FilterBar

条件筛选栏组件

```
import { FilterBar } from 'react-wxeap';

conditions = [
    [ { label: '1', value: '1' }, { label: '2', value: '2' } ],
    [ { label: 'a', value: 'a', children: [ { label: 'a-a', value: 'a-b' } ] } ]
]

state = {
    values: [
        ['1'],
        ['a', 'a-a']
    ]
}

onFilterChange = (values, index) => {
    this.setState({ values })
}

...
render() {
    return (
        ...
        <FilterBar ref={o => this.filterBar = o} conditions={this.conditions} values={this.state.values} onChange={this.onFilterChange}>
        ...
    )
}
...

```


| 属性 | 说明 | 类型 | 默认值 |
| ----|-----|------|------ |
| conditions    | 筛选条的数据来源，最多支持4个条件     | Array  | [] |
| values    | 当前的值  | Array |  []  |
| onChange   | 条件更改的回调: values为更改后的valus，index为更改的第几个条件  | (values: Array, index: number): void |   |
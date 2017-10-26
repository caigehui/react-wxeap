# FilterBarPro

高级条件筛选栏组件

note: 不支持多个Filter渲染在同一页面下

```
import { FilterBarPro } from 'react-wxeap';

filterBarId = 1

conditions = [
    [ { label: '1', value: '1' }, { label: '2', value: '2' } ],
    [ { label: 'a', value: 'a', children: [ { label: 'a-a', value: 'a-b' } ] } ]
    [ { label: '指定条件',value: '指定条件' } ]
]

values: [
    ['1'],
    ['a', 'a-a'],
    ['指定条件']
]

conditionsPro = [
    {
        type: 'list',
	    name: '测试list',
	    data: [
		    {
			    value: '',
			    label: '全部状态'
		    },
		    {
			    value: '确认,进行中',
			    label: '未完成'
		    },
		    {
			    value: '暂停',
			    label: '暂停'
		    },
		    {
			    value: '待评审',
			    label: '待评审'
		    },
		    {
			    value: '完成',
			    label: '完成'
		    }
	    ]
    },
    {
        type: 'radio',
	    name: '测试radio'
    },
    {
        type: 'custom',
	    name: '测试custom'
    },
    {
        type: 'date',
	    name: '测试date',
        format:'YYYY/MM/DD'
    }
]

defaultValuesPro:[
    {
        value: '完成'
    },
    {
        value: true
    },
    {
        value: 'custom',
		label: 'custom'
    },
    {
        value: {
            label:'今日',
            start:'2017-10-19',
            end:'2017-10-19',
            type:''
        },
		label: '今日'
    }
]


onFilterChange = (values, index) => {
    this.setState({ values })
}

onClick = (i, cb) => {
    if(i === 2) return cb('张三') // 指定条件时，不展开下拉菜单，而是直接修改label
    cb(null) // 将label改为自定义
}

onCustomClick = (index, cb) => {
		if (index === 2) {
		    cb(label, value);
		} else {
			cb(null, null);
		}
	}

onChangePro = (values) => {
	console.log(values);
}

...
render() {
    return (
        ...
        <FilterBarPro 
            filterBarId={this.filterBarId}
            ref={o => this.filterBarPro = o} 
            conditions={this.conditions} 
            values={this.state.values} 
            onChange={this.onFilterChange} 
            onClick={this.onClick}>
            conditionsPro={this.conditionsPro}
            defaultValuesPro={this.state.defaultValuesPro}
            onCustomClick={this.onCustomClick}
            onChangePro={this.onChangePro}
        />
        ...
    )
}
...

```


| 属性 | 说明 | 类型 | 默认值 |
| ----|-----|------|------ |
| conditions | 普通筛选条的数据来源，最多支持4个条件 | Array  | [] |
| values  | 普通筛选条当前的值  | Array |  []  |
| onChange | 条件更改的回调: values为更改后的valus，index为更改的第几个条件 | (values: Array, index: number): void |   |
| onClick | 点击FilterBarPro普通筛选条, 有两个参数: i和cb，i代表点击第几个条件，cb为回调函数，传入name即可更改该条件的Label，不弹出下拉菜单；传null则不更改，并弹出下拉菜单 | func | |
| switchBtns | 需要使用“切换”图标的条件位置的数组，比如第一和三个条件用切换的图标，传入[0, 2]即可，不传即为空数组 | Array | [] |
| filterBarId | 必需,当前FilterBarPro的Id,用来缓存高级筛选的值 | number或string | |
| conditionsPro | 高级筛选面板的数据来源，可支持无限条件 | Array | [] |
| defaultValuesPro | 高级筛选面板的默认值 | Array | [] |
| onCustomClick | 点击自定义组件，更新高级筛选选面板的值，有两个参数: i和cb，i代表点击第几个条件，cb为回调函数，传入Label和value | func | |
| onChangePro | 点击高级筛选面板的完成按钮时的回调: values为更改后的valusPro  | (values: Array): void |   |

`FilterBarPro`实例有一个方法`setLabel`, 用于修改普通筛选栏label, 传入要修改的label值和label的位置
`FilterBarPro`有普通筛选栏和高级筛选面板
当使用普通筛选栏时,需要传入conditions|values|onChange|onClick
当使用高级筛选面板时,需要传入conditionsPro|onChange,如果需要自定义还要传入onCustomClick,需要默认值传入defaultValuesPro
```
this.filterBarPro.setLabel('label', 0)
```
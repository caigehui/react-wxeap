# Array的扩展

`React WxEAP`提供了四个常用的扩展方法，他们都不会改变原数组:

* removeByCondition
* findByCondition
* searchByCondition
* removeObjects

```
let a = [
    {   
        id: 0,
        name: '张三'
    },
    {
        id: 1,
        name: '李四'
    },
    {
        id: 2,
        name: '赵五'
    }
]

let b = a.removeByCondition(i => i.id === 0) //移除了张三并赋值给b，但数组a保持不变

let obj = a.findByCondition(i => i.id === 0) //将匹配条件的对象 { id: 0, name: '张三' }赋值给obj

let isExist = a.searchByCondition(i => i.id === 0) //如果匹配条件返回true，否则返回false

let c = a.removeObjects({ id: 0, name: '张三' }, { id: 1, name: '李四' }) //删除数组中相同的对象，不匹配则不删除，返回删除后的数组

```
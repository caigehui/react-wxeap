# storage

HTML5中本地数据持久化分为`localStorage`和`sessionStorage`
`localStorage`是永久性存储，除非用户清楚缓存
`sessionStorage`则在session结束时自动清楚

`React WxEAP`封装了存储方法，`localStorage`和`sessionStorage`使用方法相同:

* saveUserDefault(key, value): 一般用于保存用户设置
* getUserDefault(key, def): 获取用户设置，如果找不到则为def
* saveData(key, id, value): 二维存储数据
* getData(key, id, def): 获取二维数据
* cleanData(key, id): 清楚二维数据
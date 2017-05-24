# datetimeFormat

很多业务都会涉及到时间处理，使用`datetimeFormat`可以很简单的处理日期时间

例如服务器返回的时间`A`是：2017-5-5 22:00:59，那么一个通用的逻辑如下：

* 如果当前时间距离`A`在六小时以内，则显示时间差，比如相距3小时，显示 `3小时以前`；相距15分钟，显示`15分钟以前`
* 如果`A`在当天内，则显示`今天 22:00`，同理如果在昨天，显示`昨天 22:00`
* 如果`A`在前天或者再之前，则显示`5月5日 22:00`或者`5月5日`

datetimeFormat的参数:

* datetime: 日期字符串
* format: 格式化规则，缺省值为'YYYY-MM-DD HH:mm:ss'
* omitTime: 当日期超过两天，是否省略时间


```
import { datetimeFormat } from 'react-wxeap'

console.log(datetimeFormat('2017-5-5 22:00:59')) // 5月5日 22:00

console.log(datetimeFormat('2017/5/5 22:00:59', 'YYYY/MM/DD HH:mm:ss', true)) // 5月5日

```

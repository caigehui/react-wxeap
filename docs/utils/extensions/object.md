# Object

**compareObject**:
比较两个对象是否相同

```javascript
import { compareObject } from 'react-wxeap'

let m = { a: 1, b: 2 };
let n = { a: 2, b: 1 };

compareObject(m,n) //false
compareObject(m,m) //true

```
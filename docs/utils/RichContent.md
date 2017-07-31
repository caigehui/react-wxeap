# RichContent
提供一个名为`convert`的方法

```
import { RichContent } from 'react-wxeap'

content = '1\n2\n3';

content = RichContent.convert(content); // <p>1</p><p>2</p><p>3</p>
```
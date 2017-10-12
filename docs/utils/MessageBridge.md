# MessageBridge

可以使用`MessageBridge`类来与App进行简单的通信

// note: message的格式一定是type-payload形式
// {
//     type: 'onXXXX',
//     payload: {
//         key0: 'value0'
//     }
// }

```
import { MessageBridge } from 'react-wxeap';

// 发送消息
MessageBridge.postMessage({
    type: 'onShouldPush',
    payload: {
        url: 'https://xxx'
    }
})


function onMessage(message) {
    console.log(message);
}

// 监听消息
MessageBridge.addMessageListener(onMessage);

// 移除消息监听
MessageBridge.removeMessageListener(onMessage);
```
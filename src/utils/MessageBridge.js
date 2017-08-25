import MobileDetect from './MobileDetect';

export default class MessageBridge {

    static listeners = [];

    /**
     * 被Android端调用，接收消息
     * @param message 
     */
    static getMessageFromAndroid(message) {
        for (let listener of MessageBridge.listeners) {
            listener(JSON.parse(message));
        }
    }

    /**
     * 向Native端发送消息
     * @param message 
     */
    static postMessage(message) {
        if (!MobileDetect.isApp) return;

        let jsonStr = JSON.stringify(message);

        if (MobileDetect.isIOS) {
            window.postMessage(jsonStr, '*');
        } else if (MobileDetect.isAndroid) {
            window.android.postMessage(jsonStr);
        }
    }

    /**
     * 添加监听，接收Native发送的消息
     * @param callback 
     */
    static addMessageListener(callback) {
        if (!MobileDetect.isApp) return;

        if (MobileDetect.isIOS) {
            const listener = event => callback(JSON.parse(event.data));
            window.document.addEventListener('message', listener);
        }
        MessageBridge.listeners.push(callback);
    }


    /**
     * 移除监听
     * @param callback 
     */
    static removeMessageListener(callback) {
        if (!MobileDetect.isApp) return;

        if (MobileDetect.isIOS) {
            for (let listener of MessageBridge.listeners) {
                if (listener === callback) {
                    window.document.removeEventListener('message', listener);
                    MessageBridge.listeners = MessageBridge.listeners.removeByCondition(listener === callback);
                }
            }
        }

        
    }


}

// 使其全局变量被系统调用
window.getMessageFromAndroid = MessageBridge.getMessageFromAndroid;
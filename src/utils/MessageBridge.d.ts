export default class MessageBridge {
    /**
     * 向Native端发送消息
     * @param message 
     */
    static postMessage(message: string): void;

    /**
     * 添加监听，接收Native发送的消息
     * @param callback 
     */
    static addMessageListener(callback: (message: string) => void): void;

    /**
     * 移除监听
     * @param callback
     */
    static removeMessageListener(callback: (message: string) => void): void;
}
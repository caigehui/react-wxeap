// import { request } from 'react-wxeap';

export function SearchEmp({ content }) {
    if (content === '张') {
        return {
            emps: [
                { name: '张一' },
                { name: '张怡' },
                { name: '张毅' },
                { name: '张艺' },
                { name: '张译' }
            ]
        };
    } else {
        return { emps: [] };
    }
}

export function QueryList({ page }) {
    if (page === 1) {
        return {
            chatList: [
                { msgType: 'send', id: 77, name: '董董卿', dream: '来来来，我们一起谈谈人生，聊聊理想' },
                { msgType: 'receive', id: 1, name: '张一', dream: '我要成为新世纪赫本女神' },
                { msgType: 'send', id: 77, name: '董董卿', dream: '对不起，我已经是了' },
                { msgType: 'receive', id: 2, name: '张怡', dream: '我要吃遍所有国家的美食' },
                { msgType: 'send', id: 77, name: '董董卿', dream: '吃的时候带上我' },
                { msgType: 'receive', id: 3, name: '张毅', dream: '我要带领底层贫困人民走上富裕道路' },
                { msgType: 'receive', id: 4, name: '张艺', dream: '我要在中国掀起一场文艺复兴运动' },
                { msgType: 'receive', id: 5, name: '张译', dream: '我要让这个世界更加美好' },
                { msgType: 'send', id: 77, name: '董董卿', dream: '怎么那么多姓张的？！' },
                { msgType: 'receive', id: 6, name: '张仪', dream: '我想活过来' },
                { msgType: 'send', id: 77, name: '董董卿', dream: '你想的有点多' },
                { msgType: 'receive', id: 7, name: '韩梅梅', dream: '我要一直活在中学课本里' },
                { msgType: 'send', id: 77, name: '董董卿', dream: '你和李雷真是天生一对' },
                { msgType: 'receive', id: 8, name: '张国荣', dream: '我要大家忘记我' },
                { msgType: 'send', id: 77, name: '董董卿', dream: '风华绝代，亘古长无' },
            ]
        };
    } else if (page === 2) {
        return {
            chatList: [
                { msgType: 'receive', id: 9, name: '希特勒', dream: '我要天使把我封印' },
                { msgType: 'receive', id: 10, name: '马克思', dream: '我要在我死后不会有人发现我是错的' },
                { msgType: 'send', id: 77, name: '董董卿', dream: '小样，你就是个骗子' },
                { msgType: 'receive', id: 11, name: '猪八戒', dream: '我要有很多好吃的而且我吃不胖' },
                { msgType: 'send', id: 77, name: '董董卿', dream: '这项技能我已具备' },
                { msgType: 'receive', id: 12, name: '孙悟空', dream: '我要再无人打扰我在花果山的生活' },
                { msgType: 'send', id: 77, name: '董董卿', dream: '那你有一身本领有何用？' },
                { msgType: 'receive', id: 13, name: '祝英台', dream: '我要时间永远停留在书院的那几年' },
                { msgType: 'send', id: 77, name: '董董卿', dream: '你们的故事激励着多少学子勇敢追寻爱情' },
                { msgType: 'receive', id: 14, name: '蒲松龄', dream: '我要这世间再无鬼怪可写' },
                { msgType: 'send', id: 77, name: '董董卿', dream: '那一天永远不会到来' },
            ]
        };
    }
}
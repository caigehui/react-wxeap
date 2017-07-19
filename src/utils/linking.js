import { isApp } from './mobileDetect';
import { routerRedux } from 'dva/router';

// function awaitPostMessage() {
//   let isReactNativePostMessageReady = !!window.originalPostMessage;
//   const queue = [];
//   let currentPostMessageFn = function store(message) {
//     if (queue.length > 100) queue.shift();
//     queue.push(message);
//   };
//   if (!isReactNativePostMessageReady) {
//     // const originalPostMessage = window.postMessage;
//     Object.defineProperty(window, 'postMessage', {
//       configurable: true,
//       enumerable: true,
//       get() {
//         return currentPostMessageFn;
//       },
//       set(fn) {
//         currentPostMessageFn = fn;
//         isReactNativePostMessageReady = true;
//         setTimeout(sendQueue, 0);
//       }
//     });
//   }

//   function sendQueue() {
//     while (queue.length > 0) window.postMessage(queue.shift());
//   }
// }

export default function (lo, dispatch) {
    if (isApp) {
        const data = {
            type: 'onShouldPush',
            payload: {
                url: lo.pathname.indexOf('http') === 0 ? lo.pathname : window.location.href.substring(0, (window.location.href.lastIndexOf('/') - 2)) + lo.pathname + (() => {
                    if(!lo.query) return '';
                    let queryStr = '?';
                    for (let i in lo.query) {
                        queryStr += i;
                        queryStr += '=';
                        queryStr += lo.query[i];
                        queryStr += '&';
                    }
                    queryStr = queryStr.substring(0, queryStr.length - 1);
                    return queryStr;
                })()
            }
        };
        // awaitPostMessage();
        window.postMessage(JSON.stringify(data));
    } else {
        if (lo.pathname.indexOf('http') === 0) {
            window.location.href = lo.pathname;
        } else {
            dispatch(routerRedux.push(location));
        }
    }
}
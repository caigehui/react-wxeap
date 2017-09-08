import { isApp } from './MobileDetect';
import { routerRedux } from 'dva/router';
import MessageBridge from './MessageBridge';

export default function (lo, dispatch) {

    if (isApp) {
        if(lo.isGoBack) {
            MessageBridge.postMessage({
                type: 'onGoBack'
            });
        }
        const data = {
            type: 'onShouldPush',
            payload: {
                url: lo.pathname.indexOf('http') === 0 ? lo.pathname : window.location.href.substring(0, (window.location.href.lastIndexOf('/'))) + lo.pathname + (() => {
                    if (!lo.query) return '';
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
        MessageBridge.postMessage(data);
        return { type: 'none', payload: {} };
    } else {
        // model
        if (lo.isModel) {
            if (lo.isGoBack) {
                return routerRedux.goBack();
            } else {
                return routerRedux.push(lo);
            }
        } else if (lo.isGoBack) {
            return dispatch(routerRedux.goBack());
        }

        if (lo.pathname.indexOf('http') === 0) {
            window.location.href = lo.pathname;
        } else {
            dispatch(routerRedux.push(lo));
        }
    }
}
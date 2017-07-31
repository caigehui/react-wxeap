'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (lo, dispatch) {

    if (_MobileDetect.isApp) {
        if (lo.isGoBack) {
            window.postMessage(JSON.stringify({
                type: 'onGoBack'
            }));
        }
        var data = {
            type: 'onShouldPush',
            payload: {
                url: lo.pathname.indexOf('http') === 0 ? lo.pathname : window.location.href.substring(0, window.location.href.lastIndexOf('/')) + lo.pathname + function () {
                    if (!lo.query) return '';
                    var queryStr = '?';
                    for (var i in lo.query) {
                        queryStr += i;
                        queryStr += '=';
                        queryStr += lo.query[i];
                        queryStr += '&';
                    }
                    queryStr = queryStr.substring(0, queryStr.length - 1);
                    return queryStr;
                }()
            }
        };
        // awaitPostMessage();
        window.postMessage(JSON.stringify(data));
    } else {
        // model
        if (lo.isModel) {
            if (lo.isGoBack) {
                return _router.routerRedux.goBack();
            } else {
                return _router.routerRedux.push(lo);
            }
        } else if (lo.isGoBack) {
            return dispatch(_router.routerRedux.goBack());
        }

        if (lo.pathname.indexOf('http') === 0) {
            window.location.href = lo.pathname;
        } else {
            dispatch(_router.routerRedux.push(lo));
        }
    }
};

var _MobileDetect = require('./MobileDetect');

var _router = require('dva/router');
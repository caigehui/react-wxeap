'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (lo, dispatch) {
    if (_mobileDetect.isApp) {
        var data = {
            type: 'onShouldPush',
            payload: {
                url: lo.pathname.indexOf('http') === 0 ? lo.pathname : window.location.href.substring(0, window.location.href.lastIndexOf('/') - 2) + lo.pathname + function () {
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
        if (lo.pathname.indexOf('http') === 0) {
            window.location.href = lo.pathname;
        } else {
            dispatch(_router.routerRedux.push(location));
        }
    }
};

var _mobileDetect = require('./mobileDetect');

var _router = require('dva/router');
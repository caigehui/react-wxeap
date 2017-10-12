'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (lo, dispatch) {

    if (_MobileDetect.isApp) {
        if (lo.isGoBack) {
            _MessageBridge2.default.postMessage({
                type: 'onGoBack'
            });
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
        _MessageBridge2.default.postMessage(data);
        return { type: 'none', payload: {} };
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

var _MessageBridge = require('./MessageBridge');

var _MessageBridge2 = _interopRequireDefault(_MessageBridge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
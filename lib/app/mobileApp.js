'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/toast/style/css');

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./mobileApp.css');

var _orientationListener = require('../utils/orientationListener.js');

var _orientationListener2 = _interopRequireDefault(_orientationListener);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _dva2 = _interopRequireDefault(_dva);

var _router = require('dva/router');

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _history = require('history');

var _constants = require('../constants');

var CONSTANTS = _interopRequireWildcard(_constants);

var _reduxPersist = require('redux-persist');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MobileApp = function () {

    /**
     * 初始化App
     * @param {array} routes 
     * @param {object} options
     * @param {array} otherMiddlewares 
     */
    function MobileApp(routes, options) {
        var _this = this;

        var otherMiddlewares = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        _classCallCheck(this, MobileApp);

        this.mobileApp = (0, _dva2.default)({
            onAction: [_middleware2.default].concat(_toConsumableArray(otherMiddlewares)),
            extraEnhancers: [(0, _reduxPersist.autoRehydrate)()],
            history: (0, _router.useRouterHistory)(_history.createHashHistory)({ queryKey: true }), // 不移除_k参数 
            onError: function onError(e) {
                console.error('Global onError:', e);
                _toast2.default.info(e, 2);
            }
        });
        this.routes = routes;
        this.addModel(routes);
        this.addRouter(routes);
        this.configureAPI(options);

        (0, _orientationListener2.default)(function () {
            _this.router.forceUpdate();
        });
    }

    /**
     * 启动应用
     */


    _createClass(MobileApp, [{
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (CONSTANTS.DEV_MODE && this.auth && this.auth.length > 0) {
                fetch(this.origin + this.auth, { credentials: 'include' }).then(function () {
                    _this2.mobileApp.start('#root');
                    _this2.persist();
                });
            } else {
                this.mobileApp.start('#root');
                this.persist();
            }
        }
    }, {
        key: 'persist',
        value: function persist() {
            // 获取白名单
            var whitelist = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var route = _step.value;

                    if (route.model.persist) {
                        whitelist.push(route.model.namespace);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            (0, _reduxPersist.persistStore)(this.mobileApp._store, {
                whitelist: whitelist
            });
        }
    }, {
        key: 'addModel',
        value: function addModel(routes) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = routes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var route = _step2.value;
                    var model = route.model;

                    if (!model) {
                        console.error('react-wxeap->mobileApp: \u8DEF\u7531\'' + route.path + '\'\u7F3A\u5C11model');
                    } else {
                        this.mobileApp.model(model);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'addRouter',
        value: function addRouter(routes) {
            var _this3 = this;

            this.mobileApp.router(function (_ref) {
                var history = _ref.history;

                return _react2.default.createElement(
                    _router.Router,
                    { ref: function ref(o) {
                            return _this3.router = o;
                        }, history: history },
                    routes.map(function (route) {
                        if (!route.component || !route.path) {
                            console.error('react-wxeap->mobileApp: \u8DEF\u7531\u914D\u7F6E\u5931\u8D25 \'' + route.path + '\'');
                        }
                        return _react2.default.createElement(_router.Route, { key: route.path, path: route.path, component: route.component });
                    })
                );
            });
        }
    }, {
        key: 'configureAPI',
        value: function configureAPI(options) {
            var module = options.module,
                origin = options.origin,
                auth = options.auth;

            this.origin = origin;
            this.auth = auth;

            var APIConfig = function APIConfig(origin, module) {
                var url = window.location.href.toLowerCase();
                var end = url.lastIndexOf('/' + module);
                url = url.substring(0, end);
                return CONSTANTS.DEV_MODE ? origin + '/wxapi/' : url + '/wxapi/';
            };

            global.API = APIConfig(origin, module);
        }
    }]);

    return MobileApp;
}();

exports.default = MobileApp;
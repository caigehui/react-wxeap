'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _css = require('antd-mobile/lib/toast/style/css');

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

require('./mobileApp.css');

var _orientationListener = require('../utils/orientationListener.js');

var _orientationListener2 = _interopRequireDefault(_orientationListener);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _dva2 = _interopRequireDefault(_dva);

var _router = require('dva/router');

var _middlewares = require('./middlewares');

var _history = require('history');

var _constants = require('../constants');

var CONSTANTS = _interopRequireWildcard(_constants);

var _reduxPersist = require('redux-persist');

var _isarray = require('isarray');

var _isarray2 = _interopRequireDefault(_isarray);

var _model = require('../components/Search/model');

var _model2 = _interopRequireDefault(_model);

var _Search = require('../components/Search');

var _Search2 = _interopRequireDefault(_Search);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../../../../config/default.json');

var otherRoutes = [{
    path: '/SearchComponent',
    component: _Search2.default,
    model: _model2.default
}];

var MobileApp = (_temp = _class = function () {

    /**
     * 初始化App
     * @param {array} routes 
     * @param {array} otherMiddlewares 
     */
    function MobileApp(routes) {
        var _this = this;

        var otherMiddlewares = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        _classCallCheck(this, MobileApp);

        this.refreshUI = function () {
            _this.router && _this.router.forceUpdate();
        };

        this.mobileApp = (0, _dva2.default)({
            onAction: [_middlewares.rehydrateMiddleware, _middlewares.routingMiddleware].concat(_toConsumableArray(otherMiddlewares)),
            extraEnhancers: [(0, _reduxPersist.autoRehydrate)()],
            history: (0, _router.useRouterHistory)(_history.createHashHistory)({ queryKey: true }), // 不移除_k参数 
            onError: function onError(e) {
                console.error('Global onError:', e);
                _toast2.default.info(e, 2);
            }
        });
        routes = [].concat(_toConsumableArray(routes), otherRoutes);
        this.routes = routes;
        this.addModel(routes);
        this.addRouter(routes);
        this.configureAPI();

        (0, _orientationListener2.default)(function () {
            _this.refreshUI();
        });
        MobileApp.instance = this;
    }

    _createClass(MobileApp, [{
        key: 'start',


        /**
         * 启动应用
         */
        value: function start() {
            var _this2 = this;

            if (CONSTANTS.DEV_MODE && config.auth && config.auth.length > 0) {
                fetch('/eap' + config.auth, { credentials: 'include' }).then(function () {
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
                    var model = route.model;

                    if (!model) {
                        console.error('react-wxeap->mobileApp: \u8DEF\u7531\'' + route.path + '\'\u7F3A\u5C11model');
                    } else {
                        if ((0, _isarray2.default)(model)) {
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = model[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var i = _step2.value;

                                    if (i.persist) {
                                        whitelist.push(i.namespace);
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
                        } else {
                            if (model.persist) {
                                whitelist.push(model.namespace);
                            }
                        }
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
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = routes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var route = _step3.value;
                    var model = route.model;

                    if (!model) {
                        console.error('react-wxeap->mobileApp: \u8DEF\u7531\'' + route.path + '\'\u7F3A\u5C11model');
                    } else {
                        if ((0, _isarray2.default)(model)) {
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = model[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var i = _step4.value;

                                    this.mobileApp.model(i);
                                    i.state._pathname = route.path;
                                }
                            } catch (err) {
                                _didIteratorError4 = true;
                                _iteratorError4 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                        _iterator4.return();
                                    }
                                } finally {
                                    if (_didIteratorError4) {
                                        throw _iteratorError4;
                                    }
                                }
                            }
                        } else {
                            this.mobileApp.model(model);
                            model.state._pathname = route.path;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
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
        value: function configureAPI() {
            var url = window.location.href.toLowerCase();
            var end = url.lastIndexOf('/' + config.module);
            url = url.substring(0, end);
            global.API = CONSTANTS.DEV_MODE ? '/api/' : url + '/wxapi/';
            global.EAP = CONSTANTS.DEV_MODE ? '/eap/' : url + '/';
            global.EAP_PATH = CONSTANTS.DEV_MODE ? config.origin + '/' : url + '/';
        }
    }]);

    return MobileApp;
}(), _class.instance = null, _temp);
exports.default = MobileApp;
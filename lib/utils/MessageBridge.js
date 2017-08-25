'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _MobileDetect = require('./MobileDetect');

var _MobileDetect2 = _interopRequireDefault(_MobileDetect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageBridge = (_temp = _class = function () {
    function MessageBridge() {
        _classCallCheck(this, MessageBridge);
    }

    _createClass(MessageBridge, null, [{
        key: 'getMessageFromAndroid',


        /**
         * 被Android端调用，接收消息
         * @param message 
         */
        value: function getMessageFromAndroid(message) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = MessageBridge.listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var listener = _step.value;

                    listener(JSON.parse(message));
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
        }

        /**
         * 向Native端发送消息
         * @param message 
         */

    }, {
        key: 'postMessage',
        value: function postMessage(message) {
            if (!_MobileDetect2.default.isApp) return;

            var jsonStr = JSON.stringify(message);

            if (_MobileDetect2.default.isIOS) {
                window.postMessage(jsonStr, '*');
            } else if (_MobileDetect2.default.isAndroid) {
                window.android.postMessage(jsonStr);
            }
        }

        /**
         * 添加监听，接收Native发送的消息
         * @param callback 
         */

    }, {
        key: 'addMessageListener',
        value: function addMessageListener(callback) {
            if (!_MobileDetect2.default.isApp) return;

            if (_MobileDetect2.default.isIOS) {
                var listener = function listener(event) {
                    return callback(JSON.parse(event.data));
                };
                window.document.addEventListener('message', listener);
            }
            MessageBridge.listeners.push(callback);
        }

        /**
         * 移除监听
         * @param callback 
         */

    }, {
        key: 'removeMessageListener',
        value: function removeMessageListener(callback) {
            if (!_MobileDetect2.default.isApp) return;

            if (_MobileDetect2.default.isIOS) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = MessageBridge.listeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var listener = _step2.value;

                        if (listener === callback) {
                            window.document.removeEventListener('message', listener);
                            MessageBridge.listeners = MessageBridge.listeners.removeByCondition(listener === callback);
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
        }
    }]);

    return MessageBridge;
}(), _class.listeners = [], _temp);

// 使其全局变量被系统调用

exports.default = MessageBridge;
window.getMessageFromAndroid = MessageBridge.getMessageFromAndroid;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = datetimeFormat;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function datetimeFormat(datetime) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';
    var omitTime = arguments[2];

    var time = omitTime ? '' : ' HH:mm';
    if ((0, _moment2.default)(datetime, format).isBefore((0, _moment2.default)().subtract(6, 'hours'))) {
        return (0, _moment2.default)(datetime, format).calendar((0, _moment2.default)(), {
            sameDay: '[今天]' + time,
            nextDay: '[明天]' + time,
            nextWeek: 'MMMD[日]' + time,
            lastDay: '[昨天]' + time,
            lastWeek: 'MMMD[日]' + time,
            sameElse: 'MMMD[日]' + time
        });
    } else {
        return (0, _moment2.default)(datetime, format).fromNow();
    }
}
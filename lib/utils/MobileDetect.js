'use strict';

var _mobileDetect = require('mobile-detect');

var _mobileDetect2 = _interopRequireDefault(_mobileDetect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md = new _mobileDetect2.default(window.navigator.userAgent);

module.exports = {
  iOSVer: md.version('iOS') ? md.version('iOS') : null,
  androidVer: md.version('Android') ? md.version('Android') : null,
  isIOS: md.os() === 'iOS',
  isIOS8: md.os() === 'iOS' && parseFloat(md.version('iOS')) >= 8 && parseFloat(md.version('iOS')) < 9,
  isIOS9: md.os() === 'iOS' && parseFloat(md.version('iOS')) >= 9 && parseFloat(md.version('iOS')) < 10,
  isIOS10: md.os() === 'iOS' && parseFloat(md.version('iOS')) >= 10 && parseFloat(md.version('iOS')) < 11,
  isAndroid: md.os() === 'AndroidOS',
  isWindow: md.os() === 'WindowsMobileOS' || md.os() === 'WindowsPhoneOS',
  isMobile: md.mobile() !== null ? true : false,
  isWechat: md.match('MicroMessenger') ? true : false,
  wechatVer: md.version('MicroMessenger') ? md.version('MicroMessenger') : null,
  isApp: md.match('wxeap-app') ? true : false,
  isAppOrWX: md.version('MicroMessenger') || md.match('wxeap-app') ? true : false
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 是否为调试环境
 */
var DEV_MODE = exports.DEV_MODE = process.env.NODE_ENV !== 'production';

/**
 * 是否为浏览器环境
 */
var IS_WEB = exports.IS_WEB = window ? true : false;

/**
 * 主题颜色
 */
var PRIMARY_COLOR = exports.PRIMARY_COLOR = 'rgb(0, 126, 218)';

/**
 * 分割线颜色
 */
var BORDER_COLOR = exports.BORDER_COLOR = 'rgb(220, 220, 220)';

/**
 * 次要文颜色
 */
var SUBTITLE_COLOR = exports.SUBTITLE_COLOR = 'rgb(160, 160, 160)';
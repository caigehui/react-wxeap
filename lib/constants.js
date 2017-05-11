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
var PRIMARY_COLOR = exports.PRIMARY_COLOR = 'rgb(74, 144, 226)';

/**
 * 文字颜色
 */
var TITLE_COLOR = exports.TITLE_COLOR = 'rgb(60, 60, 60)';

/**
 * 次要文字颜色
 */
var SUBTITLE_COLOR = exports.SUBTITLE_COLOR = 'rgb(160, 160, 160)';

/**
 * 分割线颜色
 */
var BORDER_COLOR = exports.BORDER_COLOR = 'rgb(220, 220, 220)';

/**
 * 背景色
 */
var BACKGROUND_COLOR = exports.BACKGROUND_COLOR = 'rgb(245,245,249)';

/**
 * 橘红色
 */
var RED_COLOR = exports.RED_COLOR = 'rgb(242, 114, 93)';

/**
 * 绿色
 */
var GREEN_COLOR = exports.GREEN_COLOR = 'rgb(26, 193, 148)';

/**
 * 浅蓝
 */
var BLUE_COLOR = exports.BLUE_COLOR = 'rgb(78, 168, 236)';

/**
 * 黄色
 */
var YELLOW_COLOR = exports.YELLOW_COLOR = 'rgb(247, 181, 92)';
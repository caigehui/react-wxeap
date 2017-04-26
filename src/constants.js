/**
 * 是否为调试环境
 */
export const DEV_MODE = process.env.NODE_ENV !== 'production';

/**
 * 是否为浏览器环境
 */
export const IS_WEB = window ? true : false;

/**
 * 主题颜色
 */
export const PRIMARY_COLOR = 'rgb(0, 126, 218)';

/**
 * 分割线颜色
 */
export const BORDER_COLOR = 'rgb(220, 220, 220)';

/**
 * 次要文颜色
 */
export const SUBTITLE_COLOR = 'rgb(160, 160, 160)';
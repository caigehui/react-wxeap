/**
 * 获取原图
 * @param {string} hash 
 */
export function getImageUrl(hash: string): string;;

/**
 * 获取图片的缩略图
 * @param {string} hash 
 */
export function getThumbUrl(hash: string): string;

/**
 * 获取预览的地址
 * @param {int} accId 
 */
export function getPreviewPath(accId: number): string;

/**
 * 根据hash获取图片地址
 * @param {Array} imgs 
 */
export function getImagesDisplay(imgs: Array): Array;

/**
 * 根据Accs获取图片
 * @param {Array} accs 
 * @param {bool} isThumb 
 */
export function getImagesFromAccs(accs: Array, isThumb: boolean): Array;

/**
 * 获取富文本里面图片的地址
 * @param {string} oUrl 
 */
export function getImageFromContent(oUrl: string): string;
/**
 * 获取原图
 * @param {string} hash 
 */
export function getImageUrl(hash) {
    const url = API.substring(0, API.length - 6); 
    return `${url}Service/WxGetFile.ashx?hash=${hash}`;
}

/**
 * 获取图片的缩略图
 * @param {string} hash 
 */
export function getThumbUrl(hash) {
    const url = API.substring(0, API.length - 6); 
    return `${url}Service/WxGetFile.ashx?hash=${hash}&imgSize=small`;
}

/**
 * 获取预览的地址
 * @param {int} accId 
 */
export function getPreviewPath(accId) {
    const url = API.substring(0, API.length - 6);
    return `${url}Base/Lib/WxFilePreview.aspx?AccId=${accId}`;
}
/**
 * 根据hash获取图片地址
 * @param {Array} imgs 
 */
export function getImagesDisplay(imgs) {
    return imgs.map((img, i) => ({
        url: img.url ? img.url : getImageUrl(img.hash),
        id: i 
    }));
}
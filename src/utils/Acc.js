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
    return `${url}Base/Lib/WxFilePreview.aspx?AccId=${accId}&isMobile=1`;
}
/**
 * 根据hash获取图片地址
 * @param {Array} imgs 
 */
export function getImagesDisplay(imgs) {
    return imgs.map((img, i) => ({
        url: img.url ? img.url : getImageUrl(img.hash),
        thumb: img.url ? img.url : getThumbUrl(img.hash),
        id: i
    }));
}

/**
 * 根据Accs获取图片
 * @param {Array} accs 
 * @param {bool} isThumb 
 */
export function getImagesFromAccs(accs, isThumb) {
    let imgs = [];
    accs.map((acc, i) => {
        let fileExtension = acc.oName.substring(acc.oName.lastIndexOf('.') + 1).toLowerCase();
        if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif' || fileExtension === 'jpeg') { 
            imgs.push({
                url: isThumb ? getThumbUrl(acc.hash) : getImageUrl(acc.hash),
                id: i
            });
        }
    });
    return imgs;
}

/**
 * 获取富文本里面图片的地址
 * @param {string} oUrl 
 */
export function getImageFromContent(oUrl) {
    // 如果是Base64图片
    if(oUrl.indexOf('../../') < 0) return oUrl;
    // WxAccessoryDisplay
    if(oUrl.indexOf('WxAccessoryDisplay') > 0) return `${API.substring(0, API.length - 6)}Common/WxAccessoryDisplay.aspx${oUrl.substring(oUrl.indexOf('?'))}`;
    // 其他情况(大多数)
    return `${API.substring(0, API.length - 6)}Common/WxGetFile.aspx${oUrl.substring(oUrl.indexOf('?'))}`;
}
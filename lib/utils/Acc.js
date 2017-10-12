'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getImageUrl = getImageUrl;
exports.getThumbUrl = getThumbUrl;
exports.getPreviewPath = getPreviewPath;
exports.getImagesDisplay = getImagesDisplay;
exports.getImagesFromAccs = getImagesFromAccs;
exports.getImageFromContent = getImageFromContent;
/**
 * 获取原图
 * @param {string} hash 
 */
function getImageUrl(hash) {
    return EAP + 'Service/WxGetFile.ashx?hash=' + hash;
}

/**
 * 获取图片的缩略图
 * @param {string} hash 
 */
function getThumbUrl(hash) {
    return EAP + 'Service/WxGetFile.ashx?hash=' + hash + '&imgSize=small';
}

/**
 * 获取预览的地址
 * @param {int} accId 
 */
function getPreviewPath(accId) {
    return EAP + 'Base/Lib/WxFilePreview.aspx?AccId=' + accId + '&isMobile=1';
}
/**
 * 根据hash获取图片地址
 * @param {Array} imgs 
 */
function getImagesDisplay(imgs) {
    return imgs.map(function (img, i) {
        return {
            url: img.url ? img.url : getImageUrl(img.hash),
            thumb: img.url ? img.url : getThumbUrl(img.hash),
            id: i
        };
    });
}

/**
 * 根据Accs获取图片
 * @param {Array} accs 
 * @param {bool} isThumb 
 */
function getImagesFromAccs(accs, isThumb) {
    var imgs = [];
    accs.map(function (acc, i) {
        var fileExtension = acc.oName.substring(acc.oName.lastIndexOf('.') + 1).toLowerCase();
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
function getImageFromContent(oUrl) {
    // 如果是Base64图片
    if (oUrl.indexOf('../../') < 0) return oUrl;
    // WxAccessoryDisplay
    if (oUrl.indexOf('WxAccessoryDisplay') > 0) return EAP + 'Common/WxAccessoryDisplay.aspx' + oUrl.substring(oUrl.indexOf('?'));
    // 其他情况(大多数)
    return EAP + 'Common/WxGetFile.aspx' + oUrl.substring(oUrl.indexOf('?'));
}
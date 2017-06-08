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
    var url = API.substring(0, API.length - 6);
    return url + 'Service/WxGetFile.ashx?hash=' + hash;
}

/**
 * 获取图片的缩略图
 * @param {string} hash 
 */
function getThumbUrl(hash) {
    var url = API.substring(0, API.length - 6);
    return url + 'Service/WxGetFile.ashx?hash=' + hash + '&imgSize=small';
}

/**
 * 获取预览的地址
 * @param {int} accId 
 */
function getPreviewPath(accId) {
    var url = API.substring(0, API.length - 6);
    return url + 'Base/Lib/WxFilePreview.aspx?AccId=' + accId;
}
/**
 * 根据hash获取图片地址
 * @param {Array} imgs 
 */
function getImagesDisplay(imgs) {
    return imgs.map(function (img, i) {
        return {
            url: img.url ? img.url : getImageUrl(img.hash),
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
        var fileExtension = acc.oName.substring(acc.oName.lastIndexOf('.') + 1);
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
    return API.substring(0, API.length - 6) + 'Common/WxGetFile.aspx' + oUrl.substring(oUrl.indexOf('?'));
}
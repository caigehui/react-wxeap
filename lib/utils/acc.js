"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getImageUrl = getImageUrl;
exports.getThumbUrl = getThumbUrl;
exports.getPreviewPath = getPreviewPath;
function getImageUrl(hash) {
    var url = API.substring(0, API.length - 6);
    return url + "Service/WxGetFile.ashx?imgSize=general&hash=" + hash;
}
function getThumbUrl(hash) {
    var url = API.substring(0, API.length - 6);
    return url + "Service/WxGetFile.ashx?imgSize=small&hash=" + hash;
}
function getPreviewPath(accId) {
    var url = API.substring(0, API.length - 6);
    return url + "Base/Lib/WxFilePreview.aspx?AccId=" + accId;
}
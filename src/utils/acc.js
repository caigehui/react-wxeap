export function getImageUrl(hash) {
    const url = API.substring(0, API.length - 6); 
    return `${url}Service/WxGetFile.ashx?imgSize=general&hash=${hash}`;
}
export function getThumbUrl(hash) {
    const url = API.substring(0, API.length - 6); 
    return `${url}Service/WxGetFile.ashx?imgSize=small&hash=${hash}`;
}
export function getPreviewPath(accId) {
    const url = API.substring(0, API.length - 6);
    return `${url}Base/Lib/WxFilePreview.aspx?AccId=${accId}`;
}
export default function backToHome() {
    location.href=`${(() => API.slice(0, API.indexOf('api')))()}Base/Main/WxTouchMain.aspx`
}
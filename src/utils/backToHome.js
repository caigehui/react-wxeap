export default function backToHome() {
    location.href = `${API.slice(0, API.indexOf('wxapi'))}Base/Main/Mobile/index.html`;
}
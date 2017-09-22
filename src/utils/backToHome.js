import { DEV_MODE } from '../constant';
export default function backToHome() {
    if(DEV_MODE) {
        const config = require('../../../../config/default.json');
        return location.href = `${config.origin}/Base/Main/WxTouchMain.aspx`;
    }
    return location.href = `${EAP}Base/Main/WxTouchMain.aspx`;
}
import { DEV_MODE } from '../constants';
export default function backToHome() {
    if(DEV_MODE) {
        const config = require('../../../../config/default.json');
        return location.href = `${config.origin}/Base/Main/WxTouchMain.aspx`;
    }
    return location.href = `${EAP}Base/Main/WxTouchMain.aspx`;
}
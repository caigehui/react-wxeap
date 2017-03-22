import "babel-polyfill"
import request from './util/request';
import MobileApp from './app/mobileApp';
import bind from './util/bind';
import { routerRedux } from 'dva/router';
import { DEV_MODE } from './app/constants';
import ImageViewer from './components/ImageViewer';
import ListView from './components/ListView';
import delay from './util/delay';
import './index.css';
export {
    DEV_MODE,
    MobileApp,
    request,
    delay,
    bind,
    routerRedux,
    ImageViewer,
    ListView
}

//npm config set registry https://registry.npm.taobao.org
//npm config set registry http://registry.npmjs.org
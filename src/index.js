import "babel-polyfill"
import request from './util/request';
import MobileApp from './app/mobileApp';
import bind from './app/bind';
import { routerRedux } from 'dva/router';
import { DEV_MODE } from './app/constants';
import ImageViewer from './components/ImageViewer';
import ListView from './components/ListView';
import delay from './util/delay';
import wrapProps from './util/wrapProps';
import Seperator from './components/Seperator';
import './index.css';
import './util/array';
import backToHome from './util/backToHome';
import Navigation from './components/Navigation';
import * as LocalStorage from './util/localStorage';
export {
    DEV_MODE,
    MobileApp,
    wrapProps,
    request,
    delay,
    bind,
    routerRedux,
    ImageViewer,
    ListView,
    Seperator,
    Navigation,
    backToHome,
    LocalStorage
}

//npm config set registry https://registry.npm.taobao.org
//npm config set registry http://registry.npmjs.org
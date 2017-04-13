import "babel-polyfill"
import request from './utils/request';
import MobileApp from './app/mobileApp';
import bind from './app/bind';
import { routerRedux } from 'dva/router';
import { DEV_MODE } from './app/constants';
import ImageViewer from './components/ImageViewer';
import ListView from './components/ListView';
import delay from './utils/delay';
import wrapProps from './utils/wrapProps';
import Seperator from './components/Seperator';
import './index.css';
import './utils/array';
import backToHome from './utils/backToHome';
import Navigation from './components/Navigation';
import * as LocalStorage from './utils/localStorage';
import * as SessionStorage from './utils/sessionStorage';
import htmlFilter from './utils/htmlFilter';
import ImagePicker from './components/ImagePicker';
import * as MobileDetect from './utils/mobileDetect';
import { compareObject } from './utils/object'
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
    LocalStorage,
    SessionStorage,
    htmlFilter,
    ImagePicker,
    MobileDetect,
    compareObject
}

//npm config set registry https://registry.npm.taobao.org
//npm config set registry http://registry.npmjs.org
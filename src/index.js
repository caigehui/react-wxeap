import 'babel-polyfill';
import './index.css';
import './utils/array';
import MobileApp from './app/mobileApp';
import bind from './app/bind';
import { routerRedux } from 'dva/router';
import { DEV_MODE } from './constants';
import ImageViewer from './components/ImageViewer';
import ListView from './components/ListView';
import Seperator from './components/Seperator';
import Navigation from './components/Navigation';
import ImagePicker from './components/ImagePicker';
import View from './components/View';
import FilterBar from './components/FilterBar';
import request from './utils/request';
import delay from './utils/delay';
import wrapProps from './utils/wrapProps';
import backToHome from './utils/backToHome';
import * as LocalStorage from './utils/localStorage';
import * as SessionStorage from './utils/sessionStorage';
import htmlFilter from './utils/htmlFilter';
import * as MobileDetect from './utils/mobileDetect';
import { compareObject } from './utils/object';
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
    compareObject,
    View,
    FilterBar
};

// npm config set registry https://registry.npm.taobao.org
// npm config set registry http://registry.npmjs.org
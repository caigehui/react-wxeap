/**
 * react web 入口
 */
import 'babel-polyfill';
import './utils/extensions/array';
export { compareObject } from './utils/extensions/object';
export { default as MobileApp } from './app/mobileApp';
export { default as bind } from './app/bind';
export { routerRedux } from 'dva/router';
export { DEV_MODE } from './constants';
export { default as ImageViewer } from './components/ImageViewer';
export { default as ListView } from './components/ListView';
export { default as Seperator } from './components/Seperator';
export { default as Navigation } from './components/Navigation';
export { default as ImagePicker } from './components/ImagePicker';
export { default as View } from './components/View';
export { default as FilterBar } from './components/FilterBar';
export { default as request } from './app/request';
export { default as delay } from './utils/delay';
export { default as wrapProps } from './utils/wrapProps';
export { default as backToHome } from './utils/backToHome';
export { default as htmlFilter } from './utils/htmlFilter';
import * as LocalStorage from './utils/storage/localStorage';
import * as SessionStorage from './utils/storage/sessionStorage';
import * as MobileDetect from './utils/mobileDetect';
export {
    LocalStorage,
    SessionStorage,
    MobileDetect
};
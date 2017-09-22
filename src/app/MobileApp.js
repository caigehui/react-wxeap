import './mobileApp.css';
import OrientationListener from '../utils/orientationListener.js';
import React from 'react';
import dva from 'dva';
import { Router, Route } from 'dva/router';
import { rehydrateMiddleware, routingMiddleware } from './middlewares';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import * as CONSTANTS from '../constants';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Toast } from 'antd-mobile';
import isArray from 'isarray';
import searchModel from '../components/Search/model';
import Search from '../components/Search';
const config = require('../../../../config/default.json');

const otherRoutes = [
    {
        path: '/SearchComponent',
        component: Search,
        model: searchModel
    }
];

export default class MobileApp {

    /**
     * 初始化App
     * @param {array} routes 
     * @param {array} otherMiddlewares 
     */
    constructor(routes, otherMiddlewares = []) {
        this.mobileApp = dva({
            onAction: [rehydrateMiddleware, routingMiddleware, ...otherMiddlewares],
            extraEnhancers: [autoRehydrate()],
            history: useRouterHistory(createHashHistory)({ queryKey: true }),// 不移除_k参数 
            onError(e) {
                console.error('Global onError:', e);
                Toast.info(e, 2);
            },
        });
        routes = [...routes, ...otherRoutes];
        this.routes = routes;
        this.addModel(routes);
        this.addRouter(routes);
        this.configureAPI();

        OrientationListener(() => {
            this.refreshUI();
        });
        MobileApp.instance = this;
    }

    static instance = null

    /**
     * 启动应用
     */
    start() {
        if (CONSTANTS.DEV_MODE && config.auth && config.auth.length > 0) {
            fetch(`/eap${config.auth}`, { credentials: 'include' }).then(() => {
                this.mobileApp.start('#root');
                this.persist();
            });
        } else {
            this.mobileApp.start('#root');
            this.persist();
        }
    }

    refreshUI = () => {
        this.router && this.router.forceUpdate();
    }

    persist() {
        // 获取白名单
        let whitelist = [];
        for (let route of this.routes) {
            const { model } = route;
            if (!model) {
                console.error(`react-wxeap->mobileApp: 路由\'${route.path}\'缺少model`);
            } else {
                if (isArray(model)) {
                    for (let i of model) {
                        if (i.persist) {
                            whitelist.push(i.namespace);
                        }
                    }
                } else {
                    if (model.persist) {
                        whitelist.push(model.namespace);
                    }
                }
            }
        }
        persistStore(this.mobileApp._store, {
            whitelist
        });
    }

    addModel(routes) {
        for (let route of routes) {
            let { model } = route;
            if (!model) {
                console.error(`react-wxeap->mobileApp: 路由\'${route.path}\'缺少model`);
            } else {
                if (isArray(model)) {
                    for (let i of model) {
                        this.mobileApp.model(i);
                        i.state._pathname = route.path;
                    }
                } else {
                    this.mobileApp.model(model);
                    model.state._pathname = route.path;
                }
            }

        }
    }

    addRouter(routes) {
        this.mobileApp.router(({ history }) => {
            return (
                <Router ref={o => this.router = o} history={history}>
                    {routes.map(route => {
                        if (!route.component || !route.path) {
                            console.error(`react-wxeap->mobileApp: 路由配置失败 \'${route.path}\'`);
                        }
                        return <Route key={route.path} path={route.path} component={route.component} />;
                    })}
                </Router>
            );
        });
    }

    configureAPI() {
        let url = window.location.href.toLowerCase();
        let end = url.lastIndexOf(`/${config.module}`);
        url = url.substring(0, end);
        global.API = CONSTANTS.DEV_MODE ? '/api/' : `${url}/wxapi/`;
        global.EAP = CONSTANTS.DEV_MODE ? '/eap/' : `${url}/`;
    }
}
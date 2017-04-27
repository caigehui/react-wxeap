import './mobileApp.css';
import OrientationListener from '../utils/orientationListener.js';
import React from 'react';
import dva from 'dva';
import { Router, Route } from 'dva/router';
import mobileMiddleware from './mobileMiddleware';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import * as CONSTANTS from '../constants';
import { persistStore, autoRehydrate } from 'redux-persist';
export default class MobileApp {

    /**
     * 初始化App
     * @param {array} routes 
     * @param {object} options
     * @param {array} middlewares 
     */
    constructor(routes, options, middlewares = []) {
        this.mobileApp = dva({
            onAction: [mobileMiddleware, ...middlewares],
            extraEnhancers: [autoRehydrate()],
            history: useRouterHistory(createHashHistory)({ queryKey: true }),// 不移除_k参数 
            onError(e) {
                console.error('Global onError:', e);
            },
        });
        this.routes = routes;
        this.addModel(routes);
        this.addRouter(routes);
        this.configureAPI(options);

        OrientationListener(() => {
            this.router.forceUpdate();
        });
    }

    /**
     * 启动应用
     */
    start() {
        if (CONSTANTS.DEV_MODE && this.auth && this.auth.length > 0) {
            fetch(this.origin + this.auth, { credentials: 'include' }).then(() => {
                this.mobileApp.start('#root');
                this.persist();
            });
        } else {
            this.mobileApp.start('#root');
            this.persist();
        }
    }

    persist() {
        // 获取白名单
        let whitelist = [];
        for(let route of this.routes) {
            if(route.model.persist) {
                whitelist.push(route.model.namespace);
            }
        }
        persistStore(this.mobileApp._store, { 
            whitelist
        });
    }

    addModel(routes) {
        for (let route of routes) {
            const { model } = route;
            this.mobileApp.model(model);
        }
    }

    addRouter(routes) {
        this.mobileApp.router(({ history }) => {
            return (
                <Router ref={o => this.router = o} history={history}>
                    {routes.map(route => <Route key={route.path} path={route.path} component={route.component} />)}
                </Router>
            );
        });
    }

    configureAPI(options) {
        const { module, origin, auth } = options;
        this.origin = origin;
        this.auth = auth;

        const APIConfig = (origin, module) => {
            let url = window.location.href.toLowerCase();
            let end = url.lastIndexOf(`/${module}`);
            url = url.substring(0, end);
            return CONSTANTS.DEV_MODE ? `${origin}/wxapi/` : `${url}/wxapi/`;
        };

        global.API = APIConfig(origin, module);
    }
}
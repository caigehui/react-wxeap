import { AppRegistry, AsyncStorage } from 'react-native';
import dva from 'dva/mobile';
import { persistStore, autoRehydrate } from 'redux-persist';
import middleware from './middleware';

export default class RnApp {

    /**
     * 初始化React Native App
     * @param {array} routes 
     * @param {object} options
     * @param {array} otherMiddlewares 
     */
    constructor(models, options, otherMiddlewares = []) {
        this.rnApp = dva({
            onAction: [middleware, ...otherMiddlewares],
            extraEnhancers: [autoRehydrate()],
            onError(e) {
                console.error('Global onError:', e);
            }
        });

        this.models = models;
        this.options = options;

        for (let model of models) {
            this.rnApp.model(model);
        }

        /**
         * 忽略下列版本的警告
         * react-native: 0.44.0
         * react-navigation: 1.0.0-beta.9
         * */
        /* eslint-disable */
        console.ignoredYellowBox = ['Warning: View.propTypes'];
        /* eslint-enable */
    }

    /**
     * 启动应用
     */
    start() {
        const App = this.rnApp.start();
        // 获取数据持久化的白名单
        let whitelist = [];
        for (let model of this.models) {
            if (model.persist) {
                whitelist.push(model.namespace);
            }
        }
        persistStore(this.rnApp._store, {
            whitelist,
            storage: AsyncStorage
        });
        AppRegistry.registerComponent(this.options.appName, () => App);
    }

    addRouter(router) {
        this.rnApp.router(router);
    }
} 
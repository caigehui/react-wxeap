const path = require('path');
const config = require('./config/default.json');
const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  path.resolve(__dirname, 'src/assets'),  // 业务代码本地私有 svg 存放目录
  path.resolve(__dirname, 'node_modules/react-wxeap/lib/assets')
];

export default {
  svgSpriteLoaderDirs: svgSpriteDirs,
  entry: "src/index.js",
  publicPath: "./",
  env: {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        "transform-decorators-legacy",
        ["import", { "style": "css", "libraryName": "antd-mobile" }],
        ['module-resolver', {
          'root': ['../lib'],
          'alias': {
            'components': './components',
            'asset': './asset',
            'util': './util',
            'constant': './constant'
          }
        }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        "transform-decorators-legacy",
        ["import", { "style": "css", "libraryName": "antd-mobile" }],
        ['module-resolver', {
          'root': ['../lib'],
          'alias': {
            'components': './components',
            'asset': './asset',
            'util': './util',
            'constant': './constant'
          }
        }]
      ]
    }
  },
  proxy: {
    "/api": {
      "target":`${config.origin}/wxapi`,
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    },
    "/eap": {
      "target": config.origin,
      "changeOrigin": true,
      "pathRewrite": { "^/eap" : "" }
    }
  },
}
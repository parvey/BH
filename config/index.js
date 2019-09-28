'use strict'

const path = require('path')

module.exports = {

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    cacheBusting: true,
    cssSourceMap: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    devtool: 'cheap-module-eval-source-map',
    host: '0.0.0.0',
    port:9999,
    proxyTable:{
        '/bh_api':{
          target:"http://bh.procase.wiki/api/",
          changeOrigin:true,
          pathRewrite:{
            '^/bh_api':'http://bh.procase.wiki/api/'
          }
        }
    },
  }
}

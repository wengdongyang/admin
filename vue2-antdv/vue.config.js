/** @format */

const { resolve } = require('path');
const { defineConfig } = require('@vue/cli-service');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  productionSourceMap: process.env.NODE_ENV === 'development',
  pages: { index: { entry: 'src/main.ts', title: '驾驶舱项目Vue2+ant' } },
  css: {
    loaderOptions: {
      less: {
        lessOptions: { javascriptEnabled: true },
        // additionalData: `@import "${resolve('/src/styles/mixins/index.less')}";`, // less前置
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@src', resolve('src'));
  },
  devServer: {
    open: true,
    proxy: {
      '/screenAdmin': { target: 'http://10.2.0.215:8050', changeOrigin: true },
      '/town/adminapi': { target: 'http://10.2.0.215:8060', changeOrigin: true },
    },
  },
});

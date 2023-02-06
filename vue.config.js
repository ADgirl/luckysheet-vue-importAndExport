module.exports = {
  lintOnSave: false,
  // 它支持webPack-dev-server的所有选项
  devServer: {
    host: '0.0.0.0',
    port:
      process.env.VUE_APP_FLAG === 'rsd' || process.env.VUE_APP_FLAG === 'sjkf'
        ? 10001
        : 19998, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器

    // 配置多个代理
    proxy: {
      '^dii/luckysheet/': {
        target: 'http://192.168.50.59:9004',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/common/api': '/'
        }
      },
    },
    disableHostCheck: true,
  },

}
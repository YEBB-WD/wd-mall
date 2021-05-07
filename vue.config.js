module.exports = {
  publicPath: '/wd-mall/',
  outputDir: 'docs',

  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'zh',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  /*
  devServer: {
    proxy: {
      '/': {
        target: 'http://dev3.wdplatform.com/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }*/
}

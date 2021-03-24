module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  chainWebpack(config) {
    if (
      typeof process.env.VUE_APP_ENVIRONMENT !== 'undefined' &&
      process.env.VUE_APP_ENVIRONMENT.toLowerCase() === 'production'
    ) {
      config.plugin('copy').tap(options => {
        options[0][0].ignore.push('robots.txt');
        return options;
      });
    }
    if(config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css')
      extractCSSPlugin && extractCSSPlugin.tap(() => [{
        filename: '[name].css',
        chunkFilename: '[name].css'
      }]);
    }
  },
  configureWebpack: {
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js'
    }
  }
};
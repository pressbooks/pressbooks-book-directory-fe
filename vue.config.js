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
  }
};
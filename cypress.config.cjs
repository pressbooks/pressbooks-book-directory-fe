const { defineConfig } = require('cypress')

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
  video: false,
  fixturesFolder: 'e2e/fixtures',
  screenshotsFolder: 'e2e/screenshots',
  videosFolder: 'e2e/videos',
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  pageLoadTimeout: 10000,
  modifyObstructiveCode: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./e2e/plugins/index.cjs')(on, config)
    },
    baseUrl: 'http://127.0.0.1:3001',
    specPattern: 'e2e/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'e2e/support/index.js',
  },
})

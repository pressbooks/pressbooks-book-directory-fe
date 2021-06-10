// vite.config.js
import { createVuePlugin } from 'vite-plugin-vue2';
import { injectHtml } from 'vite-plugin-html';
import cleanup from './src/utils/cleanup';

module.exports = {
  plugins: [createVuePlugin(/*options*/),injectHtml(), cleanup],
  server: {
    port: 3001
  }
};

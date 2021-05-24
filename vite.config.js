// vite.config.js
import { createVuePlugin } from 'vite-plugin-vue2';

module.exports = {
  plugins: [createVuePlugin(/*options*/)],
  server: {
    port: 3001
  }
};
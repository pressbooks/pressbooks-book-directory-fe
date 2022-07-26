import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import cleanup from './src/utils/cleanup.js';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [vue(), createHtmlPlugin({
      inject: {
        data: {
          environment: process.env.NODE_ENV,
          GA: env.VITE_APP_GA_MEASUREMENT_ID,
          GUA: env.VITE_APP_GUA_MEASUREMENT_ID,
        }
      }
    }), cleanup()],
    server: {
      port: 3001
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]'
        }
      }
    }
  };
});

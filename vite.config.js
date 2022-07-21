import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import cleanup from "./src/utils/cleanup.js";
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), createHtmlPlugin(
        {
            inject: {
                data: {
                    VITE_APP_GA_MEASUREMENT_ID: 'OPP',
                }
            }
        }
    ), cleanup()],
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
})

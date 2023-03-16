import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import inject from '@rollup/plugin-inject';
// import SSR from 'vite-ssr/plugin';
import path from 'path';
// import { fileURLToPath, URL } from 'url';

const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()], //, inject({ $: 'jquery' })
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './src/components'),
			'@services': path.resolve(__dirname, './src/services'),
			'@helpers': path.resolve(__dirname, './src/helpers'),
			'@plugins': path.resolve(__dirname, './src/plugins'),
			'@stores': path.resolve(__dirname, './src/stores'),
			'@models': path.resolve(__dirname, './src/models'),
			'@router': path.resolve(__dirname, './src/router'),
			'@views': path.resolve(__dirname, './src/views'),
			'@public': path.resolve(__dirname, './public'),
			'@dist': path.resolve(__dirname, './dist'),
			'@src': path.resolve(__dirname, './src'),
			'@': path.resolve(__dirname, './src'),
			'~': path.resolve(__dirname, './')
			// '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
			// '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
			// '@helpers': fileURLToPath(new URL('./src/helpers', import.meta.url)),
			// '@plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
			// '@layout': fileURLToPath(new URL('./src/layouts', import.meta.url)),
			// '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
			// '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
			// '@models': fileURLToPath(new URL('./src/models', import.meta.url)),
			// '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
			// '@public': fileURLToPath(new URL('./public', import.meta.url)),
			// // '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
			// // '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
			// // '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
			// '@dist': fileURLToPath(new URL('./dist', import.meta.url)),
			// // '@src': fileURLToPath(new URL('./src', import.meta.url)),
			// '@': fileURLToPath(new URL('./src', import.meta.url)),
			// '~': fileURLToPath(new URL('./', import.meta.url))
		}
	}
});
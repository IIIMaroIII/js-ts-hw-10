import { defineConfig } from 'vite';
import { glob } from 'glob';

export default defineConfig(({ command }) => {
	return {
		define: {},
		root: 'src',
		build: {
			sourcemap: true,
			rollupOptions: {
				input: glob.sync('./src/*.html'),
				output: {
					manualChunks(id) {
						if (id.includes('node_modules')) {
							return 'vendor';
						}
					},
					entryFileNames: chunkInfo => {
						if (chunkInfo.name === 'commonHelpers') {
							return 'commonHelpers.js';
						}
						return '[name].js';
					},
					assetFileNames: assetInfo => {
						if (assetInfo.name && assetInfo.name.endsWith('.html')) {
							return '[name].[ext]';
						}
						return 'assets/[name]-[hash][extname]';
					},
				},
			},
			outDir: '../dist',
			emptyOutDir: true,
		},
	};
});

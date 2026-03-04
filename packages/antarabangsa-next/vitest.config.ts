import path from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

import tsconfig from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [react(), tsconfig()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './setupTests.ts',
	},
	resolve: {
		alias: {
			'@antarabangsa-next': '/src',
			'@lanun/antarabangsa': path.resolve(__dirname, '../antarabangsa/src'),
		},
	},
})

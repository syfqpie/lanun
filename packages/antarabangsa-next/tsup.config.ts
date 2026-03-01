import path, { resolve } from 'path'
import { cpSync } from 'fs'
import { defineConfig } from 'tsup'

export default defineConfig({
	entry: {
		index: resolve(__dirname, 'src/index.ts'),
	},
	format: ['esm', 'cjs'],
	dts: true,
	bundle: true,
	sourcemap: true,
	clean: true,
	minify: false,
	outDir: 'dist',
	tsconfig: 'tsconfig.lib.json',
	target: 'es2022',
	external: ['react', 'react-dom', 'react/jsx-runtime'],
	esbuildOptions(options) {
		options.alias = {
			'@': path.resolve(__dirname, 'src'),
		}
	},
	async onSuccess() {
		cpSync('../../LICENSE', './dist/LICENSE')
	},
})

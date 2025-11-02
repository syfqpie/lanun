import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		dts({
			tsconfigPath: resolve(__dirname, 'tsconfig.lib.json'),
			rollupTypes: true,
			insertTypesEntry: true,
		}),
	],
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, 'src/main.ts'),
			name: '@lanun/react-kit',
			formats: ['cjs', 'es'],
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			input: resolve(__dirname, 'src/main.ts'),
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': '/src',
		},
	},
})

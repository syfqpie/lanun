import path, { resolve } from 'path'
import { cpSync } from 'fs'
import { readFile } from 'fs/promises'
import { defineConfig } from 'tsup'

const CLIENT_DIRS = ['client']
const directoryRegex = new RegExp(
	`src[\\\\/](${CLIENT_DIRS.join('|')})(?:[\\\\/]|$)`,
)

export default defineConfig({
	entry: {
		index: resolve(__dirname, 'src/index.ts'),
		'client/index': resolve(__dirname, 'src/client/index.ts'),
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
	esbuildPlugins: [
		{
			name: 'use-client-banner',
			setup(build) {
				build.onLoad({ filter: /\.[jt]s?$/ }, async (args) => {
					const relativePath = path.relative(process.cwd(), args.path)
					if (directoryRegex.test(relativePath)) {
						const contents = await readFile(args.path, 'utf8')
						return {
							contents: `"use client";\n${contents}`,
							loader: path.extname(args.path).slice(1) as
								| 'ts'
								| 'tsx'
								| 'js'
								| 'jsx',
						}
					}

					return null
				})
			},
		},
	],
	esbuildOptions(options) {
		options.alias = {
			'@antarabangsa': path.resolve(__dirname, 'src'),
		}
	},
	async onSuccess() {
		cpSync('../../LICENSE', './dist/LICENSE')
	},
})

import { config } from '@lanun/eslint-config/next'

/** @type {import('eslint').Linter.Config} */
export default [
	...config,
	{
		rules: { '@next/next/no-html-link-for-pages': 'off' },
	},
	{
		ignores: ['node_modules', 'dist', '.turbo'],
	},
]

import { config } from '@lanun/eslint-config/next'

/** @type {import('eslint').Linter.Config} */
export default [
	...config,
	{
		ignores: ['node_modules', 'dist', '.turbo'],
	},
]

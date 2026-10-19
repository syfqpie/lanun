import { config } from '@lanun/eslint-config/next'
import { config as prettier } from '@lanun/eslint-config/prettier'
import { config as onlyWarn } from '@lanun/eslint-config/only-warn'

/** @type {import('eslint').Linter.Config} */
export default [
	...config,
	...prettier,
	...onlyWarn,
	{
		rules: { '@next/next/no-html-link-for-pages': 'off' },
	},
	{
		ignores: ['node_modules', 'dist', '.turbo'],
	},
]

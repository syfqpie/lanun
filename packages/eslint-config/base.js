import js from '@eslint/js'
import tseslint from 'typescript-eslint'

/**
 * Base ESLint configs. Contains no formatting rules; add
 * `@lanun/eslint-config/prettier` or `@lanun/eslint-config/stylistic`.
 *
 * @type {import('eslint').Linter.Config[]}
 * */
export const config = [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		name: '@lanun/base',
		rules: {
			curly: ['error', 'multi-line'],
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-debugger': 'error',
			'@typescript-eslint/no-explicit-any': [
				'error',
				{
					ignoreRestArgs: true,
				},
			],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
		},
	},
	{
		name: '@lanun/base-ignores',
		ignores: ['**/node_modules/**', '**/dist/**', '**/.turbo/**'],
	},
]

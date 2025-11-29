import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import onlyWarn from 'eslint-plugin-only-warn'
import prettierPlugin from 'eslint-plugin-prettier/recommended'

import tseslint from 'typescript-eslint'

/**
 * Base ESLint configs.
 *
 * @type {import('eslint').Linter.Config[]}
 * */
export const config = [
	js.configs.recommended,
	eslintConfigPrettier,
	...tseslint.configs.recommended,
	{
		name: '@lanun/prettier-config',
		plugins: {
			prettier: prettierPlugin.plugins.prettier,
		},
		rules: {
			...prettierPlugin.rules,
			'prettier/prettier': [
				'warn',
				{
					endOfLine: 'auto',
				},
			],
		},
	},
	{
		name: '@lanun/only-warn-config',
		plugins: {
			onlyWarn,
		},
	},
	{
		ignores: ['dist/**', 'node_modules'],
	},
	{
		name: '@lanun/base',
		rules: {
			'comma-dangle': [
				'warn',
				{
					arrays: 'always-multiline',
					objects: 'always-multiline',
					imports: 'always-multiline',
					exports: 'always-multiline',
					functions: 'always-multiline',
				},
			],
			'eol-last': ['error', 'always'],
			'quote-props': ['error', 'as-needed'],
			'padded-blocks': ['error', { blocks: 'never' }],
			quotes: ['error', 'single', { allowTemplateLiterals: true }],
			semi: ['error', 'never'],
			'template-curly-spacing': ['warn', 'never'],
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
]

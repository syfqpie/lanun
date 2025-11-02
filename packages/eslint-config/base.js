import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import onlyWarn from 'eslint-plugin-only-warn'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'

/**
 * Base configs
 *
 * @type {import('eslint').Linter.Config[]}
 * */
export const config = [
	js.configs.recommended,
	eslintConfigPrettier,
	...tseslint.configs.recommended,
	{
		plugins: {
			prettier: prettierPlugin.plugins.prettier,
			turbo: turboPlugin,
		},
		rules: {
			...prettierPlugin.rules,
			'prettier/prettier': [
				'warn',
				{
					endOfLine: 'auto',
				},
			],
			'turbo/no-undeclared-env-vars': 'warn',
		},
	},
	{
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
					exports: 'never',
					functions: 'always-multiline',
				},
			],
			'eol-last': ['error', 'always'],
			'object-curly-spacing': ['warn', 'always'],
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

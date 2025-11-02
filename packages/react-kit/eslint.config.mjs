import { config } from '@lanun/eslint-config/react-internal'

/** @type {import('eslint').Linter.Config} */
export default [
	...config,
	{
		ignores: ['node_modules', 'dist', '.turbo', 'storybook-static'],
	},
]
// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'

// export default tseslint.config(
// 	{ ignores: ['dist'] },
// 	{
// 		extends: [js.configs.recommended, ...tseslint.configs.recommended],
// 		files: ['**/*.{ts,tsx,js}'],
// 		languageOptions: {
// 			ecmaVersion: 2020,
// 			globals: globals.browser,
// 		},
// 		plugins: {
// 			'react-hooks': reactHooks,
// 			'react-refresh': reactRefresh,
// 		},
// 		rules: {
// 			...reactHooks.configs.recommended.rules,
// 			'react-refresh/only-export-components': [
// 				'warn',
// 				{ allowConstantExport: true },
// 			],
// 			indent: ['error', 'tab', { SwitchCase: 1 }],
// 			'no-tabs': ['error', { allowIndentationTabs: true }],
// 			'no-console': 'off',
// 			'no-useless-constructor': 'off',
// 			'object-curly-spacing': ['error', 'always'],
// 			'template-curly-spacing': ['error', 'always'],
// 			'padded-blocks': ['error', { blocks: 'never' }],
// 			'quotes': ['error', 'single'],
// 			'semi': ['error', 'never'],
// 			'eol-last': ['error', 'always'],
// 			'comma-dangle': ['error', 'always-multiline'],
// 			'@typescript-eslint/no-unused-vars': [
// 				'error', {
// 					argsIgnorePattern: '^_',
// 					varsIgnorePattern: '^_',
// 				},
// 			],
// 		},
// 	},
// )

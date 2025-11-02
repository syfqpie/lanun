import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'

import { config as baseConfig } from './base.js'

/**
 * React config
 *
 * @type {import('eslint').Linter.Config[]} */
export const config = [
	...baseConfig,
	{
		name: '@lanun/react/recommended',
		...pluginReact.configs.flat.recommended,
		languageOptions: {
			...pluginReact.configs.flat.recommended.languageOptions,
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
		plugins: {
			react: pluginReact,
		},
		rules: {
			quotes: ['error', 'single', { allowTemplateLiterals: true }],
		},
	},
	{
		name: '@lanun/react-hooks',
		plugins: {
			'react-hooks': pluginReactHooks,
		},
		settings: { react: { version: 'detect' } },
		rules: {
			...pluginReactHooks.configs.recommended.rules,
			'react-hooks/exhaustive-deps': 'off',
		},
	},
	{
		name: '@lanun/react-core',
		rules: {
			'jsx-quotes': ['error', 'prefer-double'],
			'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
			'react/jsx-curly-spacing': [
				'warn',
				{
					when: 'never',
					children: true,
					spacing: {
						objectLiterals: 'never',
					},
				},
			],
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': [0],
		},
	},
]

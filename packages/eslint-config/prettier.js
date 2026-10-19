import eslintConfigPrettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier/recommended'

/**
 * Prettier formatting. Place after other configs so it can disable conflicting rules.
 * Prettier options come from the project's own prettier config.
 *
 * @type {import('eslint').Linter.Config[]}
 * */
export const config = [
	eslintConfigPrettier,
	{
		name: '@lanun/prettier',
		plugins: {
			prettier: prettierPlugin.plugins.prettier,
		},
		rules: {
			'prettier/prettier': ['warn', { endOfLine: 'auto' }],
			'eol-last': ['error', 'always'],
		},
	},
]

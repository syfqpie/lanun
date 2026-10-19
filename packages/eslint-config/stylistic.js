import stylistic from '@stylistic/eslint-plugin'

/**
 * Formatting through `@stylistic/eslint-plugin`, an alternative to Prettier.
 * Do not combine with `@lanun/eslint-config/prettier`.
 *
 * @type {import('eslint').Linter.Config[]}
 * */
export const config = [
	stylistic.configs.customize({
		braceStyle: '1tbs',
		commaDangle: 'always-multiline',
		semi: false,
		quotes: 'single',
	}),
]

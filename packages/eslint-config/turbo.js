import turboPlugin from 'eslint-plugin-turbo'

/**
 * Turborepo ESLint configs
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
	{
		name: '@lanun/turborepo-config',
		plugins: {
			turbo: turboPlugin,
		},
		rules: {
			'turbo/no-undeclared-env-vars': 'warn',
		},
	},
]

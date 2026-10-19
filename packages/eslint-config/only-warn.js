import onlyWarn from 'eslint-plugin-only-warn'

/**
 * Downgrades every rule to a warning.
 *
 * @type {import('eslint').Linter.Config[]}
 * */
export const config = [
	{
		name: '@lanun/only-warn',
		plugins: {
			onlyWarn,
		},
	},
]

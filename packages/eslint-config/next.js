import { defineConfig, globalIgnores } from 'eslint/config'
import { FlatCompat } from '@eslint/eslintrc'

import { config as reactConfig } from './react.js'

const compat = new FlatCompat()

/**
 * Next ESLint configs.
 *
 * @type {import('eslint').Linter.Config[]}
 * */
export const config = defineConfig([
	...compat.extends('plugin:@next/next/core-web-vitals'),
	...reactConfig,
	globalIgnores([
		'.lanun/**',
		'.next/**',
		'.out/**',
		'.build/**',
		'next-env.d.ts',
	]),
])

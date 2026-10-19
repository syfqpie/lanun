import { config as baseConfig } from './base.js'
import { config as prettierConfig } from './prettier.js'
import { config as onlyWarnConfig } from './only-warn.js'

/** @type {import('eslint').Linter.Config[]} */
export default [...baseConfig, ...prettierConfig, ...onlyWarnConfig]

import { createContext } from 'react'

import type { LocaleContextValue } from './types'

/**
 * Context used to store locale and translation configuration.
 * Should be provided via {@link TranslationProvider}.
 */
export const LocaleContext = createContext<LocaleContextValue | null>(null)

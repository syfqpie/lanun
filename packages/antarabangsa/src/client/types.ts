import { ReactNode } from 'react'

import type { Locale, TranslationConfig } from '@/core/types'

/**
 * Context value containing the active locale and translation config.
 */
export interface LocaleContextValue {
	/**
	 * The current active locale.
	 */
	locale: Locale

	/**
	 * Translation configuration including dictionaries and default locale.
	 */
	config: TranslationConfig
}

/**
 * Props for {@link TranslationProvider}.
 */
export interface TranslationProviderProps {
	/**
	 * Active locale for the subtree.
	 */
	locale: string

	/**
	 * Translation configuration containing dictionaries and fallback locale.
	 */
	config: TranslationConfig

	/**
	 * React children that will have access to locale and translation utilities.
	 */
	children: ReactNode
}

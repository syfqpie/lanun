import { useContext } from 'react'

import { createTranslation } from '@/core/translation'
import { LocaleContext } from './context'

/**
 * Hook to access the translation function and current locale.
 *
 * Internally creates a translation function using {@link createTranslation}.
 *
 * @throws {Error} If used outside of {@link TranslationProvider}.
 * @returns An object containing:
 * - `t`: Translation function
 * - `locale`: Active locale
 *
 * @example
 * const { t } = useTranslation()
 * t('page.title')
 */
export const useTranslation = () => {
	const ctx = useContext(LocaleContext)

	if (!ctx) throw new Error('useLocale must be used within TranslationProvider')

	const { locale, config } = ctx
	const t = createTranslation(locale, config)
	return { t, locale }
}

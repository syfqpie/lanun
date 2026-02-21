import { useContext } from 'react'

import { LocaleContext } from './context'

/**
 * Hook to access the current locale from context.
 *
 * @throws {Error} If used outside of {@link TranslationProvider}.
 * @returns An object containing the active `locale`.
 *
 * @example
 * const { locale } = useLocale()
 */
export const useLocale = () => {
	const ctx = useContext(LocaleContext)
	if (!ctx) throw new Error('useLocale must be used within TranslationProvider')

	return { locale: ctx.locale }
}

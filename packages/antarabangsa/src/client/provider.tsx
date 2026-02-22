import { LocaleContext } from './context'
import type { TranslationProviderProps } from './types'

/**
 * Provides locale and translation configuration to components via context.
 *
 * Must wrap any component tree that uses {@link useLocale} or {@link useTranslation}.
 *
 * @example
 * <TranslationProvider locale="ms" config={config}>
 *   <App />
 * </TranslationProvider>
 */
export const TranslationProvider = ({
	locale,
	config,
	children,
}: TranslationProviderProps) => {
	return (
		<LocaleContext.Provider value={{ locale, config }}>
			{children}
		</LocaleContext.Provider>
	)
}

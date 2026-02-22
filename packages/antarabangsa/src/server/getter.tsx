import { createTranslation } from '@/core/translation'
import { TranslationConfig } from '@/core/types'

/**
 * Creates and returns a translation utility object for a given locale.
 *
 * This is a convenience wrapper around {@link createTranslation} that bundles
 * the generated `t` function together with the active locale. It is useful for
 * passing around a consistent translation context in apps (e.g. per request,
 * per page, or per component tree).
 *
 * @param locale - The active locale used to resolve translations.
 * @param config - Translation configuration containing all dictionaries and the default fallback locale.
 * @returns An object containing:
 * - `t`: The translation function for resolving localized strings.
 * - `locale`: The active locale used to create the translation function.
 *
 * @example
 * const { t, locale } = getTranslation("ms", {
 *   defaultLocale: "ms",
 *   translations: {
 *     ms: { page: { title: "Hai" } }
 *   }
 * })
 *
 * t("page.title") // "Hai"
 * locale // "ms"
 */
export const getTranslation = (locale: string, config: TranslationConfig) => {
	const t = createTranslation(locale, config)
	return { t, locale }
}

import { TranslationConfig } from '@/types'
import { getByPath } from '@/utils'

/**
 * Creates a translation function for a given locale.
 *
 * The returned function:
 * - Resolves translation keys from the active locale
 * - Falls back to the default locale when missing
 * - Falls back to the key itself if no translation exists
 * - Supports nested keys via dot path notation (e.g. `"page.title"`)
 * - Supports placeholder interpolation using `{placeholder}` syntax
 *
 * @param locale - The active locale to resolve translations from.
 * @param config - Translation configuration containing dictionaries and fallback locale.
 * @returns A translation function `t(key, values?)` that returns a localized string.
 *
 * @example
 * const t = createTranslation("ms", {
 *   defaultLocale: "ms",
 *   translations: {
 *     ms: { page: { title: "Hai {name}" } }
 *   }
 * })
 *
 * t("page.title", { name: "Mat" }) // "Hi Mat"
 *
 * @example
 * // Fallback to default locale if missing
 * const t = createTranslation("fr", {
 *   defaultLocale: "ms",
 *   translations: {
 *     ms: { page: { title: "Hai" } },
 *     fr: {}
 *   }
 * })
 *
 * t("page.title") // "Hai"
 */
export const createTranslation = (
	locale: string,
	{ translations, defaultLocale }: TranslationConfig,
) => {
	const defaultTranslations = translations[defaultLocale]
	const localeTranslations = translations[locale]

	/**
	 * Resolves a translation string by key and optionally interpolates values.
	 *
	 * @param key - Translation key, supports dot path access (e.g. `"page.title"`).
	 * @param values - Optional placeholder values to interpolate into the string.
	 * Placeholders use `{name}` syntax.
	 * @returns The localized string with interpolated values.
	 */
	return (key: string, values?: Record<string, string | number>): string => {
		let tpl =
			getByPath(localeTranslations, key) ??
			getByPath(defaultTranslations, key) ??
			key

		if (values) {
			for (const [placeholder, value] of Object.entries(values)) {
				tpl = tpl.replace(new RegExp(`{${placeholder}}`, 'g'), String(value))
			}
		}

		return tpl
	}
}

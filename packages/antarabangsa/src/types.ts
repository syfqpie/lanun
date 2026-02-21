/**
 * A locale identifier (e.g. "my", "en-MY", "en").
 * Used as the top level key for the translations record.
 */
export type Locale = string

/**
 * A translation key.
 * Can be a flat key `("page.title")` or a nested path resolved at runtime.
 */
export type TranslationKeys = string

/**
 * A map of locale to translation dictionary.
 *
 * Each locale contains a dictionary of translation keys to localized strings.
 * Keys may represent flat keys `("page.title")` or nested objects when using
 * dot path resolution.
 *
 * @example
 * {
 *   en: { "page.title": "Hello" }
 * }
 *
 * @example
 * {
 *   en: { page: { title: "Hello" } }
 * }
 */
export type Translations = Record<
	Locale,
	Record<TranslationKeys, string> | Record<string, unknown>
>

/**
 * Configuration object used to create a translation function.
 */
export interface TranslationConfig {
	/**
	 * All available translations grouped by locale.
	 */
	translations: Translations

	/**
	 * The fallback locale used when a key is missing in the active locale.
	 */
	defaultLocale: Locale
}

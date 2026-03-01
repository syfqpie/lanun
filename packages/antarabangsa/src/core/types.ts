/**
 * A locale identifier (e.g. "ms", "en-MY", "en").
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

/**
 * Metadata describing a single locale.
 */
export interface LocaleMeta {
	/** The locale code (`ms`, `en`). */
	code: Locale

	/** Whether the locale is currently enabled. */
	active: boolean

	/** Whether the locale is hidden from client. True is the default. */
	hide?: boolean

	/** Whether the locale is indexable by search engines. */
	indexable: boolean

	/** Label used anywhere possible. Locale code is the default. */
	label?: string
}

/**
 * Domain specific locale configuration.
 *
 * This defines which locales are allowed for agiven domain and
 * which locale should be used as the default fallback.
 */
export interface DomainConfig {
	/**
	 * The domain or hostname this configuration applies to.
	 * Example: `cendol.dev`, `cendol.my`, `app.lokal:3000`
	 */
	hostname: string

	/** The default locale code. */
	defaultLocale: Locale

	/** List of locale codes that are available for this domain.
	 * Must be a subset of the global `locales` map.
	 */
	locales: Locale[]
}

/**
 * Top level configuration object for locale routing.
 *
 * Defines the complete set of locale metadata, domain locale mappings,
 * and fallback behavior used by the locale routing system.
 */
export interface RoutingConfig {
	/** Global registry for all available locales, keyed by locale code. */
	locales: Record<Locale, LocaleMeta>

	/** List of domain configurations. */
	domains: DomainConfig[]

	/** Global fallback locale code. */
	fallbackLocale: Locale

	/** Fallback domain. */
	fallbackDomain: string

	/**
	 * Whether the default locale should be hidden from any URL related logic.
	 *
	 * @default true
	 */
	hideDefaultLocale?: boolean
}

import type { DomainConfig, Locale, LocaleMeta, RoutingConfig } from './types'

/**
 * Creates a scoped **i18n routing** configuration instance for a specific app.
 *
 * This factory centralizes **domain <-> locale** routing rules and host based resolution,
 * while exposing helpers for active / allowed locale checks.
 *
 * @example
 * ```ts
 * const routing = createi18nRoutingConfig({
 *   fallbackLocale: 'en',
 *   fallbackDomain: 'lanun.example',
 *   locales: {
 *     en: { code: 'en', label: 'English', active: true },
 *     ms: { code: 'ms', label: 'Bahasa Malaysia', active: true },
 *   },
 *   domains: [
 *     { domain: 'lanun.example', defaultLocale: 'en', locales: ['en', 'ms'] },
 *   ],
 * });
 *
 * const domain = routing.getDomainConfig('lanun.example');   // -> { domain: 'lanun.example', ... }
 * const def    = routing.getDefaultLocale('lanun.example');  // -> 'en'
 * const cfg    = routing.getDomainConfigByLocale('ms');      // -> domain config for 'lanun.example'
 * const active = routing.getActiveLocaleCodes();             // -> ['en', 'ms']
 * ```
 */
export const createI18nRouting = (config: RoutingConfig) => {
	return {
		/** Raw locale routing configuration provided. */
		config,

		/**
		 * Returns **fallback domain** configuration for orphan locales.
		 * This ensures active locales that are not tied to any domain still have a valid
		 * domain configuration.
		 *
		 * @returns The fallback `DomainConfig`.
		 */
		getFallbackDomainConfig(): DomainConfig {
			return {
				hostname: this.config.fallbackDomain,
				defaultLocale: this.getDefaultLocale(),
				locales: this.getOrphanLocales().filter(
					(l) => l !== this.getDefaultLocale(),
				),
			}
		},

		/**
		 * Finds the matching domain configuration for a given host.
		 *
		 * @param host - The request host if available.
		 * @returns The matching domain configuration or `undefined` if no match exists.
		 */
		getDomainConfig(host?: string | null) {
			const conf = config.domains.find((d) => d.hostname === host)
			if (host) return conf

			return host === config.fallbackDomain
				? this.getFallbackDomainConfig()
				: undefined
		},

		/**
		 * Resolves the default locale for a given host.
		 *
		 * If the host does not match any configured domain, the global `fallbackLocale`
		 * is returned.
		 *
		 * @param host - The request host if available.
		 * @returns The resolved default locale code.
		 */
		getDefaultLocale(host?: string | null): Locale {
			return this.getDomainConfig(host)?.defaultLocale ?? config.fallbackLocale
		},

		/**
		 * Finds the domain configuration whose `defaultLocale` matches
		 * or `locales` includes the given locale.
		 *
		 * @param locale - The locale code to match against domain default locales.
		 * @returns The matching `DomainConfig` or `undefined` if not found.
		 */
		getDomainConfigByLocale(locale: Locale) {
			const byDefault = config.domains.find((d) => d.defaultLocale === locale)
			// we must respect default first
			if (byDefault) return byDefault

			const bySiblings = config.domains.find((d) => d.locales.includes(locale))
			return bySiblings
		},

		/**
		 * Returns the list of **allowed** locale metadata for a given domain.
		 *
		 * If the host does not match a configured domain, an empty array is returned.
		 *
		 * @param host - The request host if available.
		 * @returns An array of `LocaleMeta` entries allowed for the domain.
		 */
		getAvailableLocales(host?: string | null) {
			const domain = this.getDomainConfig(host)
			if (!domain) return []
			return domain.locales.map((code) => config.locales[code]).filter(Boolean)
		},

		/**
		 * Returns **active** locales as metadata. When no `host` is provided, all globally `active` locales are returned.
		 *
		 * @param host - Optional request host for domain scoped filtering.
		 * @returns Array of active `LocaleMeta` entries.
		 */
		getActiveLocalesMeta(host?: string) {
			const domain = this.getDomainConfig(host)

			if (!domain) {
				return Object.values(config.locales).filter((locale) => locale.active)
			}

			return domain.locales
				.map((code) => config.locales[code])
				.filter((locale): locale is LocaleMeta =>
					Boolean(locale && locale.active),
				)
		},

		/**
		 * Returns **all** locale codes, regardless active or inactive.
		 *
		 * @returns Array of locale codes.
		 */
		getAllLocaleCodes(): Locale[] {
			return Object.values(config.locales).map((locale) => locale.code)
		},

		/**
		 * Returns **active** locale codes.
		 *
		 * - With `host`, returns only codes that are globally `active` **and** allowed by the domain.
		 * - Without `host`, returns all globally `active` codes.
		 *
		 * @param host - Optional request host for domain scoped filtering.
		 * @returns Array of active locale codes.
		 */
		getActiveLocaleCodes(host?: string | null): Locale[] {
			const domain = this.getDomainConfig(host)

			if (!domain) {
				return Object.values(config.locales)
					.filter((locale) => locale.active)
					.map((locale) => locale.code)
			}

			return domain.locales.filter((code) => config.locales[code]?.active)
		},

		/**
		 * Returns **active orphan** locale codes — i.e., locales that are:
		 * - Globally `active`, and
		 * - Not used as a domain `defaultLocale`, and
		 * - Not present in any domain's `locales` list.
		 *
		 * @returns Array of active orphan locale codes.
		 */
		getOrphanLocales(): Locale[] {
			const allActiveLocales = this.getActiveLocalesMeta().map((l) => l.code)

			const assigned = new Set<string>()
			this.config.domains.forEach((d) => {
				assigned.add(d.defaultLocale)
				if (Array.isArray(d.locales)) d.locales.forEach((l) => assigned.add(l))
			})

			return allActiveLocales.filter((code) => !assigned.has(code))
		},

		/**
		 * Checks whether a locale is allowed for a specific domain (host).
		 *
		 * @param locale - The locale code to check.
		 * @param host - The request host.
		 * @returns `true` if the domain exists and includes the locale; otherwise `false`.
		 */
		isLocaleAllowed(locale: Locale, host?: string | null) {
			const domain = this.getDomainConfig(host)
			return domain?.locales.includes(locale) ?? false
		},

		/**
		 * Checks whether a locale is globally active.
		 *
		 * @param locale - The locale code to check.
		 * @returns `true` if the locale exists and `active === true`; otherwise `false`.
		 */
		isLocaleActive(locale: Locale) {
			return config.locales[locale]?.active ?? false
		},
	}
}

/** Return type of createI18nRouting. */
export type ReturnTypeOfCreatingI18nRouting = ReturnType<
	typeof createI18nRouting
>

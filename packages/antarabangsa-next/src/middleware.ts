import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ReturnTypeOfCreatingI18nRouting } from '@lanun/antarabangsa'

import { parsePathname } from './utils'
import type { MiddlewareOptions } from './types'

/**
 * Creates a Next.js middleware that handles locale routing.
 *
 * @param routing - Locale routing configuration
 * @param options - Middleware options
 * @returns A Next.js middleware function for handling locales
 */
export const createi18nMiddleware = (
	routing: ReturnTypeOfCreatingI18nRouting,
	options: MiddlewareOptions = {},
) => {
	const { noLocaleRoutes = [] } = options
	const { hideDefaultLocale = true } = routing.config

	/**
	 * Checks whether the current path is a locale prefixed route for a route
	 * that must *not* carry a locale (e.g., sitemap index, certain assets).
	 *
	 * Example (if `noLocaleRoutes` includes '/sitemap-index.xml'):
	 *   '/ms/sitemap-index.xml' -> true
	 *   '/en/sitemap-index.xml' -> true
	 *   '/sitemap-index.xml'    -> false
	 *
	 * Conditions to return true:
	 * - The first segment looks like a locale *and* that locale is globally active.
	 * - The rest of path (without the locale) is in `noLocaleRoutes`.
	 */
	const isPrefixedNoLocaleRoute = (pathname: string) => {
		const { locale, rest } = parsePathname(pathname)

		return (
			!!locale &&
			routing.getActiveLocaleCodes().includes(locale) &&
			noLocaleRoutes.includes(rest)
		)
	}

	return (request: NextRequest) => {
		const { nextUrl, headers } = request
		const host = headers.get('host') ?? undefined
		const pathname = nextUrl.pathname

		const { locale: localeCandidate, rest: restPath } = parsePathname(pathname)

		const domainConfig = routing.getDomainConfig(host)
		const localeConfig = localeCandidate
			? routing.getDomainConfigByLocale(localeCandidate)
			: undefined
		const fallbackConfig = routing.getFallbackDomainConfig()

		// Choose a default locale to fall back to for redirects / rewrites.
		// Priority:
		// 1) Current host's domain defaultLocale (if host is a known domain)
		// 2) The domain that owns the `localeCandidate` (if any)
		// 3) Global fallback defaultLocale
		const defaultLocale =
			domainConfig?.defaultLocale ??
			localeConfig?.defaultLocale ??
			fallbackConfig.defaultLocale

		// Scenario 1: Locale prefixed route that must not be localized.
		// If pathname resolved matches a route that should never be localized
		// (e.g. `/sitemap-index.xml`), redirect to the unprefixed pathname.
		//
		// Example:
		//   `/ms/sitemap-index.xml` -> redirect to `/sitemap-index.xml`
		if (isPrefixedNoLocaleRoute(pathname)) {
			const url = nextUrl.clone()
			url.pathname = restPath
			return NextResponse.redirect(url)
		}

		const isActive = localeCandidate && routing.isLocaleActive(localeCandidate)
		const isValidLocale =
			localeCandidate && routing.getAllLocaleCodes().includes(localeCandidate)
		const isConfirmedLocale = isActive && isValidLocale

		// Scenario 2: Inactive locale prefix, redirect to default locale.
		// If the first segment looks like a locale but it's not globally active,
		// normalize the URL by replacing it with the resolved default locale.
		//
		// Example:
		//   `/th/about`  -> redirect to `/ms/about` (assuming `ms` default and `th` is inactive)
		// ------------------------------------------------------------------
		if (localeCandidate && isValidLocale && !isActive) {
			const url = nextUrl.clone()
			url.pathname = `/${defaultLocale}${restPath}`
			return NextResponse.redirect(url)
		}

		// Scenario 3: Locale exists but is NOT allowed on the current domain.
		// Enforce domain - locale ownership. If the pathname has a valid locale that
		// belongs to a different domain, redirect the user to that domain
		// preserving the path.
		//
		// Example:
		// - Host: `lanun.example`        Path: `/th/about`
		// - `th` belongs to `th.lanun.example` -> redirect host to `th.lanun.example`
		if (
			isConfirmedLocale &&
			(domainConfig || localeConfig) &&
			!routing.isLocaleAllowed(localeCandidate, host)
		) {
			const target =
				routing.getDomainConfigByLocale(localeCandidate) ?? fallbackConfig

			if (target.hostname !== domainConfig?.hostname) {
				const url = nextUrl.clone()
				url.host = target.hostname
				return NextResponse.redirect(url)
			}
		}

		// Scenario 3: Hide default locale prefix if enabled.
		//
		// Example (hideDefaultLocale = true):
		//   `/ms/about` -> redirect to `/about` if `ms` is default
		//   `/en`       -> redirect to `/` if `en` is default
		if (
			hideDefaultLocale &&
			localeCandidate === defaultLocale &&
			pathname.startsWith(`/${defaultLocale}`)
		) {
			const url = nextUrl.clone()
			url.pathname = restPath === '/' ? '/' : restPath
			return NextResponse.redirect(url)
		}

		// Scenario 4: No locale in pathname, should rewrite to default locale.
		// If the request has no locale prefix, we will internally rewrite to with
		// default locale path. This will allow routes resolve correctly while keeping
		// the browser URL unchanged.
		//
		// Example:
		//   `/`      -> rewrite to `/ms/` internally if `ms` is default
		//   `/about` -> rewrite to `/ms/about` internally if `ms` is default
		if (!localeCandidate || !isValidLocale) {
			const url = nextUrl.clone()
			url.pathname = `/${defaultLocale}${pathname}`
			return NextResponse.rewrite(url)
		}

		// Scenario 5: Valid and allowed locale  on this domain, should pass through
		return NextResponse.next()
	}
}

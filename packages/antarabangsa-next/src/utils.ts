import type { Locale } from '@lanun/antarabangsa'

/**
 * Splits a pathname into the leading locale segment (if any) and the rest.
 *
 * Examples:
 * - `/ms/about`  -> `{ locale: 'ms', slug: '/about' }`
 * - `/en`        -> `{ locale: 'en', slug: '/' }`
 * - `/about`     -> `{ locale: undefined, slug: '/about' }`
 *
 * Notes:
 * - We strip trailing slashes from `slug` (except for root which stays '/').
 * - `locale` is *not validated* here, it's just the first segment, a possible locale.
 */
export const parsePathname = (pathname: string) => {
	const segments = pathname.split('/')
	const locale = segments[1] as Locale | undefined
	const rest = `/${segments.slice(2).join('/')}`.replace(/\/+$/, '') || '/'
	return { locale, rest }
}

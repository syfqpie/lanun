import { createI18nRouting } from '@lanun/antarabangsa'
import { createi18nMiddleware } from '@lanun/antarabangsa-next'

import { isDev } from './env'

const domains = {
	dev: {
		default: 'app.lokal:3000',
		// ms: 'ms.app.lokal:3000',
	},
	prod: {
		default: 'antarabangsa.cendol.dev',
		// ms: 'ms.antarabangsa.cendol.dev',
	},
}

const conf = {
	fallbackDomain: isDev ? domains.dev.default : domains.prod.default,
	fallbackLocale: 'en',
	locales: {
		en: { code: 'en', active: true, indexable: true },
		'en-MY': { code: 'en-MY', active: true, indexable: true },
		// ms: { code: 'ms', active: true, indexable: true },
	},
	domains: [
		// {
		// 	hostname: isDev ? domains.dev.ms : domains.prod.ms,
		// 	defaultLocale: 'ms',
		// 	locales: ['en-MY'],
		// },
	],
	hideDefaultLocale: true,
}

const routing = createI18nRouting(conf)

export const proxy = createi18nMiddleware(routing)

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	// You may need to adjust it to ignore static assets in `/public` folder
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

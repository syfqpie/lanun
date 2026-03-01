/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/server', () => {
	class MockNextResponse {
		static redirect(url: URL) {
			return { type: 'redirect', url }
		}
		static rewrite(url: URL) {
			return { type: 'rewrite', url }
		}
		static next() {
			return { type: 'next' }
		}
	}
	return { NextResponse: MockNextResponse }
})

class MockURL extends URL {
	clone() {
		return new MockURL(this.toString())
	}
}

import { createi18nMiddleware } from '../middleware'
import { createI18nRouting } from '@lanun/antarabangsa'

const makeRequest = (path: string, host: string) => ({
	nextUrl: new MockURL(`https://${host}${path}`),
	headers: {
		get: (key: string) => (key === 'host' ? host : null),
	},
})

const config = {
	fallbackDomain: 'fallback.lanun.example',
	fallbackLocale: 'en',
	locales: {
		en: { code: 'en', active: true, indexable: true },
		'en-MY': { code: 'en-MY', active: true, indexable: true },
		ja: { code: 'ja', active: true, indexable: true },
		ms: { code: 'ms', active: true, indexable: true },
		th: { code: 'th', active: false, indexable: true },
	},
	domains: [
		{ hostname: 'lanun.example', defaultLocale: 'en', locales: ['en'] },
		{ hostname: 'ms.lanun.example', defaultLocale: 'ms', locales: ['en-MY'] },
	],
	hideDefaultLocale: true,
}
const unhideDefaultConfig = {
	...config,
	hideDefaultLocale: false,
}

describe('createi18nMiddleware', () => {
	const routing = createI18nRouting(config)

	it('should strips locale for noLocaleRoutes (case 0)', () => {
		const mw = createi18nMiddleware(routing, {
			noLocaleRoutes: ['/sitemap-index.xml'],
		})

		const req = makeRequest('/ms/sitemap-index.xml', 'ms.lanun.example')
		const res = mw(req as any)

		expect(res.type).toBe('redirect')
		expect((res.url as any).pathname).toBe('/sitemap-index.xml')
	})

	it('should redirects inactive locale (case 1)', () => {
		const mw = createi18nMiddleware(routing)

		const req = makeRequest('/th/about', 'lanun.example')
		const res = mw(req as any)

		expect(res.type).toBe('redirect')
		expect((res.url as any).pathname).toBe('/en/about')
	})

	it('should redirects to correct domain for locale (case 2) - default locale', () => {
		const mw = createi18nMiddleware(routing)

		const req = makeRequest('/ms/about', 'lanun.example')
		const res = mw(req as any)

		expect(res.type).toBe('redirect')
		expect((res.url as any).host).toBe('ms.lanun.example')
	})

	it('should redirects to correct domain for locale (case 2) - child locale', () => {
		const mw = createi18nMiddleware(routing)

		const req = makeRequest('/en-MY/about', 'lanun.example')
		const res = mw(req as any)

		expect(res.type).toBe('redirect')
		expect((res.url as any).host).toBe('ms.lanun.example')
		expect((res.url as any).pathname).toBe('/en-MY/about')
	})

	it('should hides default locale (case 3)', () => {
		const mw = createi18nMiddleware(routing)

		const req = makeRequest('/en/about', 'lanun.example')
		const res = mw(req as any)

		expect(res.type).toBe('redirect')
		expect((res.url as any).pathname).toBe('/about')
	})

	it('should rewrites root path to default locale (case 4)', () => {
		const mw = createi18nMiddleware(routing)

		const req = makeRequest('/', 'lanun.example')
		const res = mw(req as any)

		expect(res.type).toBe('rewrite')
		expect((res.url as any).pathname).toBe('/en/')
	})

	it('should handle invalid locale as slug (case 4)', () => {
		const mw = createi18nMiddleware(routing)

		const req = makeRequest('/xx/about', 'lanun.example')
		const res = mw(req as any)

		expect(res.type).toBe('rewrite')
		expect((res.url as any).pathname).toBe('/en/xx/about')
	})

	it('should passes through valid locale (case 5)', () => {
		const mw = createi18nMiddleware(routing)

		const req = makeRequest('/en-MY/about', 'ms.lanun.example')
		const res = mw(req as any)

		expect(res.type).toBe('next')
	})

	const unhideDefaultRouting = createI18nRouting(unhideDefaultConfig)

	it(`shouldn't hides default locale and go thru (case 5)`, () => {
		const mw = createi18nMiddleware(unhideDefaultRouting)

		const req = makeRequest('/en/about', 'lanun.example')
		const res = mw(req as any)

		expect(res.type).toBe('next')
	})
})

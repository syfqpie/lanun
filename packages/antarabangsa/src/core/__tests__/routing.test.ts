import { describe, it, expect } from 'vitest'

import { createI18nRouting } from '@antarabangsa/core'
import type { Locale, RoutingConfig } from '@antarabangsa/core/types'

describe('createI18nRouting', () => {
	const siteConfig: RoutingConfig = {
		fallbackLocale: 'en',
		fallbackDomain: 'fallback.lanun.example',
		locales: {
			en: {
				code: 'en',
				active: true,
				indexable: true,
				label: 'English',
			},
			'en-MY': {
				code: 'en-MY',
				active: true,
				indexable: true,
				label: 'English (Malaysia)',
			},
			ja: { code: 'ja', active: true, indexable: true },
			ms: {
				code: 'ms',
				active: true,
				indexable: true,
				hide: false,
				label: 'Bahasa Malaysia',
			},
			id: {
				code: 'id',
				active: true,
				indexable: false,
				label: 'Bahasa Indonesia',
			},
			th: {
				code: 'th',
				active: false,
				indexable: true,
				hide: true,
				label: 'Thai',
			},
		},
		domains: [
			{
				hostname: 'lanun.example',
				defaultLocale: 'en',
				locales: ['en', 'ja'],
			},
			{
				hostname: 'ms.lanun.example',
				defaultLocale: 'en-MY',
				locales: ['en-MY', 'ms'],
			},
			{
				hostname: 'th.lanun.example:3000',
				defaultLocale: 'th',
				locales: ['th'],
			},
		],
	}

	const routing = createI18nRouting(siteConfig)

	it('should exposes the original config', () => {
		expect(routing.config).toBe(siteConfig)
	})

	it('getDomain: should matches by exact host (including port); returns undefined when unknown', () => {
		expect(routing.getDomainConfig('ms.lanun.example')?.defaultLocale).toBe(
			'en-MY',
		)
		expect(
			routing.getDomainConfig('th.lanun.example:3000')?.defaultLocale,
		).toBe('th')
		expect(routing.getDomainConfig('th.lanun.example')).toBeUndefined()
		expect(routing.getDomainConfig('unknown.host')).toBeUndefined()
		expect(routing.getDomainConfig()).toBeUndefined()
	})

	it('getDefaultLocale: should uses domain default or global fallback', () => {
		expect(routing.getDefaultLocale('lanun.example')).toBe('en')
		expect(routing.getDefaultLocale('th.lanun.example:3000')).toBe('th')
		// unknown host: global fallback
		expect(routing.getDefaultLocale('nope.tld')).toBe('en')
		// undefined host: global fallback
		expect(routing.getDefaultLocale()).toBe('en')
	})

	it('getDomainConfigByLocale: should finds a domain that includes locale in its config', () => {
		expect(routing.getDomainConfigByLocale('ms')?.hostname).toBe(
			'ms.lanun.example',
		)
		expect(routing.getDomainConfigByLocale('th')?.hostname).toBe(
			'th.lanun.example:3000',
		)
		// orphan
		expect(routing.getDomainConfigByLocale('id')).toBeUndefined()
	})

	it('getOrphanLocales: should returns active & unassigned locales only', () => {
		// 'id' is active and not assigned to any domain as default/allowed
		// 'th' is inactive -> excluded
		// 'en', 'en-MY', 'ja', 'ms' are assigned across domains
		expect(routing.getOrphanLocales()).toEqual(['id'])
	})

	it('getFallbackDomainConfig: should synthesizes fallback with orphan locales (excluding fallback default locale)', () => {
		const fallback = routing.getFallbackDomainConfig()
		expect(fallback.hostname).toBe('fallback.lanun.example')
		expect(fallback.defaultLocale).toBe('en')
		// 'id' is orphan & active; exclude defaultLocale ('en') from list
		expect(fallback.locales).toEqual(['id'])
	})

	it('getDomainConfigByLocale: should resolves default > assigned > undefined', () => {
		const forDefault = routing.getDomainConfigByLocale('th')
		expect(forDefault?.hostname).toBe('th.lanun.example:3000')

		const forAssigned = routing.getDomainConfigByLocale('ms')
		expect(forAssigned?.hostname).toBe('ms.lanun.example')

		const forOrphan = routing.getDomainConfigByLocale('id')
		expect(forOrphan).toBe(undefined)
	})

	it('getAvailableLocales: should returns allowed metadata for the matched domain only', () => {
		const ex = routing.getAvailableLocales('lanun.example')
		expect(ex.map((m) => m?.code)).toEqual(['en', 'ja'])

		// verify metadata fields (indexable/togglerConfig) are preserved
		const cendol = routing.getAvailableLocales('ms.lanun.example')
		const msMeta = cendol.find((m) => m?.code === 'ms')
		expect(msMeta?.indexable).toBe(true)
		expect(msMeta?.label).toBe('Bahasa Malaysia')
		expect(msMeta?.hide).toBe(false)

		const none = routing.getAvailableLocales('unknown.host')
		expect(none).toEqual([])
	})

	it('getActiveLocalesMeta: should returns active metadata globally or scoped to a host', () => {
		const globalActive = routing.getActiveLocalesMeta()
		expect(globalActive.map((m) => m.code).sort()).toEqual(
			['en', 'en-MY', 'ja', 'ms', 'id'].sort(),
		)

		const cendolActive = routing.getActiveLocalesMeta('ms.lanun.example')
		expect(cendolActive.map((m) => m.code).sort()).toEqual(
			['en-MY', 'ms'].sort(),
		)

		const exampleActive = routing.getActiveLocalesMeta('lanun.example')
		expect(exampleActive.map((m) => m.code).sort()).toEqual(['en', 'ja'].sort())

		const unknownHostActive = routing.getActiveLocalesMeta('nope.tld')
		// unknown host -> treated like global (no domain) -> all active
		expect(unknownHostActive.map((m) => m.code).sort()).toEqual(
			['en', 'en-MY', 'ja', 'ms', 'id'].sort(),
		)

		// ensure we carry through indexable/togglerConfig fields (no mutations)
		const idMeta = globalActive.find((m) => m.code === 'id')
		expect(idMeta?.indexable).toBe(false)
	})

	it('getActiveLocaleCodes: should returns active codes globally or scoped to a host', () => {
		const globalCodes = routing.getActiveLocaleCodes()
		expect(globalCodes.sort()).toEqual(['en', 'en-MY', 'ja', 'ms', 'id'].sort())

		const exampleCodes = routing.getActiveLocaleCodes('lanun.example')
		expect(exampleCodes.sort()).toEqual(['en', 'ja'].sort())

		const cendolCodes = routing.getActiveLocaleCodes('ms.lanun.example')
		expect(cendolCodes.sort()).toEqual(['en-MY', 'ms'].sort())

		const unknownHostCodes = routing.getActiveLocaleCodes('nope.tld')
		expect(unknownHostCodes.sort()).toEqual(
			['en', 'en-MY', 'ja', 'ms', 'id'].sort(),
		)
	})

	it('isLocaleAllowed: should checks domain allow list (host aware)', () => {
		expect(routing.isLocaleAllowed('ja', 'lanun.example')).toBe(true)
		expect(routing.isLocaleAllowed('ms', 'lanun.example')).toBe(false)
		expect(routing.isLocaleAllowed('id', 'lanun.example')).toBe(false)
		expect(routing.isLocaleAllowed('en', 'unknown.host')).toBe(false)
		expect(routing.isLocaleAllowed('th', 'th.lanun.example:3000')).toBe(true)
		expect(routing.isLocaleAllowed('th', 'th.lanun.example')).toBe(false)
	})

	it('isLocaleActive: should checks global active state', () => {
		expect(routing.isLocaleActive('en')).toBe(true)
		expect(routing.isLocaleActive('th')).toBe(false)
		expect(routing.isLocaleActive('does-not-exist' as Locale)).toBe(false)
	})
})

import { describe, it, expect } from 'vitest'

import {
	createTranslation,
	getTranslation,
} from '@antarabangsa/core/translation'
import type { TranslationConfig } from '@antarabangsa/core/types'

const config: TranslationConfig = {
	defaultLocale: 'ms',
	translations: {
		ms: {
			page: { title: 'Hai {name}' },
			common: { cancel: 'Batal' },
		},
		fr: {
			page: { title: 'Bonjour {name}' },
		},
	},
}

describe('createTranslation', () => {
	it('returns translation for active locale', () => {
		const t = createTranslation('fr', config)
		expect(t('page.title')).toBe('Bonjour {name}')
	})

	it('falls back to default locale when key missing', () => {
		const t = createTranslation('fr', config)
		expect(t('common.cancel')).toBe('Batal')
	})

	it('returns key when translation not found in any locale', () => {
		const t = createTranslation('fr', config)
		expect(t('unknown.key')).toBe('unknown.key')
	})

	it('supports nested dot path access', () => {
		const t = createTranslation('ms', config)
		expect(t('page.title')).toBe('Hai {name}')
	})

	it('interpolates placeholder values', () => {
		const t = createTranslation('ms', config)
		expect(t('page.title', { name: 'Mat' })).toBe('Hai Mat')
	})

	it('interpolates multiple placeholders', () => {
		const multiConfig: TranslationConfig = {
			defaultLocale: 'ms',
			translations: {
				ms: {
					greeting: 'Hai {name}, anda mempunyai {count} pesanan',
				},
			},
		}

		const t = createTranslation('ms', multiConfig)
		expect(t('greeting', { name: 'Mat', count: 3 })).toBe(
			'Hai Mat, anda mempunyai 3 pesanan',
		)
	})
})

describe('getTranslation', () => {
	it('returns t function and locale', () => {
		const { t, locale } = getTranslation('fr', config)

		expect(locale).toBe('fr')
		expect(typeof t).toBe('function')
	})

	it('t resolves translations for provided locale', () => {
		const { t } = getTranslation('fr', config)
		expect(t('page.title')).toBe('Bonjour {name}')
	})

	it('t falls back to default locale', () => {
		const { t } = getTranslation('fr', {
			defaultLocale: 'ms',
			translations: {
				ms: { common: { cancel: 'Batal' } },
				fr: {},
			},
		})

		expect(t('common.cancel')).toBe('Batal')
	})
})

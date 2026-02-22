import { describe, it, expect } from 'vitest'
import { getTranslation } from '@/server/getter'
import type { TranslationConfig } from '@/core/types'

const config: TranslationConfig = {
	defaultLocale: 'ms',
	translations: {
		ms: {
			page: { title: 'Hai' },
		},
		fr: {
			page: { title: 'Bonjour' },
		},
	},
}

describe('getTranslation', () => {
	it('returns t function and locale', () => {
		const { t, locale } = getTranslation('fr', config)

		expect(locale).toBe('fr')
		expect(typeof t).toBe('function')
	})

	it('t resolves translations for provided locale', () => {
		const { t } = getTranslation('fr', config)
		expect(t('page.title')).toBe('Bonjour')
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

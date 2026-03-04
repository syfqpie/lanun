import { getTranslation as getTranslationFn } from '@lanun/antarabangsa'
import type { Locale, TranslationConfig } from '@lanun/antarabangsa'
import { defineI18n } from 'fumadocs-core/i18n'

import enTrx from '@/locales/en.json'

export const i18n = defineI18n({
	defaultLanguage: 'en',
	languages: ['en', 'ms'],
	hideLocale: 'default-locale',
})

export const translations: TranslationConfig = {
	defaultLocale: 'en',
	translations: {
		en: enTrx,
	},
}

export const getTranslation = (locale: Locale) => {
	return getTranslationFn(locale, translations)
}

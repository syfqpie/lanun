import React from 'react'
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'

import { TranslationProvider, useLocale, useTranslation } from '@/client'
import type { TranslationConfig } from '@/types'

const config: TranslationConfig = {
	defaultLocale: 'my',
	translations: {
		my: { page: { title: 'Hai' } },
		fr: { page: { title: 'Bonjour' } },
	},
}

describe('TranslationProvider + hooks', () => {
	it('useLocale returns current locale', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<TranslationProvider locale="fr" config={config}>
				{children}
			</TranslationProvider>
		)

		const { result } = renderHook(() => useLocale(), { wrapper })
		expect(result.current.locale).toBe('fr')
	})

	it('useTranslation returns t and locale', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<TranslationProvider locale="fr" config={config}>
				{children}
			</TranslationProvider>
		)

		const { result } = renderHook(() => useTranslation(), { wrapper })

		expect(result.current.locale).toBe('fr')
		expect(result.current.t('page.title')).toBe('Bonjour')
	})

	it('useTranslation falls back to default locale', () => {
		const fallbackConfig: TranslationConfig = {
			defaultLocale: 'my',
			translations: {
				my: { common: { cancel: 'Batal' } },
				fr: {},
			},
		}

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<TranslationProvider locale="fr" config={fallbackConfig}>
				{children}
			</TranslationProvider>
		)

		const { result } = renderHook(() => useTranslation(), { wrapper })
		expect(result.current.t('common.cancel')).toBe('Batal')
	})

	it('throws if used outside provider (useLocale)', () => {
		expect(() => renderHook(() => useLocale())).toThrowError(
			'useLocale must be used within TranslationProvider',
		)
	})

	it('throws if used outside provider (useTranslation)', () => {
		expect(() => renderHook(() => useTranslation())).toThrowError(
			'useLocale must be used within TranslationProvider',
		)
	})
})

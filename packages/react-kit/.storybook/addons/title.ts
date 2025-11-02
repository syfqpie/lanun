import { API } from '@storybook/manager-api'
import { API_LeafEntry } from 'storybook/internal/types'

export const setTitle = (api: API, pageTitle: string) => {
	const setTitleForStory = () => {
		let storyData: API_LeafEntry | null = null

		try {
			storyData = api.getCurrentStoryData()
		} catch (_e) {
			// pass
		}

		document.title =
			storyData !== null && storyData !== undefined && storyData.title
				? `${storyData.title.replace(/\//g, ' / ')} ⋅ ${pageTitle}`
				: pageTitle
	}

	return new MutationObserver(() => {
		if (document.title.endsWith('Storybook')) {
			setTitleForStory()
		}
	}).observe(document.querySelector('title')!, {
		childList: true,
		subtree: true,
		characterData: true,
	})
}

import { addons } from '@storybook/manager-api'

import theme from './theme'
import { setTitle } from './addons/title'
import { addGithubLink, addNPMLink } from './addons/links'

const PAGE_TITLE = '@lanun/react-kit'
const REPO_URL = 'https://github.com/syfqpie/lanun'
const PACKAGE_URL = 'https://www.npmjs.com/package/@lanun/react-kit'

addons.setConfig({
	theme: theme,
})

addons.register('title-addon', (api) => {
	setTitle(api, PAGE_TITLE)
})

addons.register('github-link-addon', () => {
	addGithubLink(REPO_URL)
})

addons.register('npm-link-addon', () => {
	addNPMLink(PACKAGE_URL)
})

import { addons, types } from '@storybook/manager-api'

const addLink = (url: string, badge: string, title: string) => {
	const id = `${title.toLowerCase()}-link`
	const altStr = `${title} link`

	return addons.add(id, {
		type: types.TOOL,
		title: title,
		render: () => {
			return (
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					<img src={badge} alt={altStr} style={{ height: '20px' }} />
				</a>
			)
		},
	})
}

export const addGithubLink = (repoURL: string) => {
	const title = 'GitHub'
	const badge =
		'https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)'
	addLink(repoURL, badge, title)
}

export const addNPMLink = (packageLink: string) => {
	const title = 'NPM'
	const badge = 'https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff'
	addLink(packageLink, badge, title)
}

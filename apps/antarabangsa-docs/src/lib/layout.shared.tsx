import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export const gitConfig = {
	user: 'syfqpie',
	repo: 'lanun',
	branch: 'main',
}

export const baseOptions = (): BaseLayoutProps => {
	return {
		nav: {
			title: '@lanun/antarabangsa',
		},
		githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
	}
}

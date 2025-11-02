import { create } from '@storybook/theming/create'
import type { ThemeVars } from '@storybook/theming'

const theme: ThemeVars = create({
	base: 'light',

	brandTitle: '@lanun/react-kit',
	brandUrl: '/',
	brandImage: './piekit-logo.png',
	brandTarget: '_self',

	fontBase: '"Open Sans", sans-serif',
	fontCode: 'monospace',

	colorPrimary: '#1e88e5',
	colorSecondary: '#101828',

	appBg: '#f3f4f6', // sidebar
	appBorderColor: '#e0e0e0',
	appBorderRadius: 8,
})

export default theme

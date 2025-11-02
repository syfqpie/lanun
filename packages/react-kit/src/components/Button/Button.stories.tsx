import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	args: {
		children: 'Click me',
		variant: 'primary',
		testId: 'ta-btn',
		onClick: () => {
			console.log('Button clicked')
		},
	},
	argTypes: {
		alignment: {
			control: 'radio',
			description: 'Set button alignment',
			options: ['start', 'center', 'end'],
			table: {
				category: 'Props',
				defaultValue: {
					summary: 'center',
				},
				type: {
					summary: 'start | center | end',
				},
			},
		},
		appearance: {
			description: 'Set button appearance',
			control: 'radio',
			options: ['solid', 'outline'],
			table: {
				category: 'Props',
				defaultValue: {
					summary: 'solid',
				},
				type: {
					summary: 'solid | outline',
				},
			},
		},
		children: {
			description: 'Children content',
			table: {
				category: 'Props',
				defaultValue: {
					summary: 'null',
				},
				type: {
					summary: 'ReactNode',
				},
			},
		},
		disabled: {
			description: 'Set button disabled state',
			control: 'boolean',
			table: {
				category: 'Props',
				defaultValue: {
					summary: 'false',
				},
				type: {
					summary: 'boolean',
				},
			},
		},
		full: {
			description: 'Set button to be full width or follow content width',
			control: 'boolean',
			table: {
				category: 'Props',
				defaultValue: {
					summary: 'false',
				},
				type: {
					summary: 'boolean',
				},
			},
		},
		size: {
			name: 'Size',
			description: 'Set button size',
			control: 'radio',
			options: ['xs', 'sm', 'md', 'lg'],
			table: {
				category: 'Props',
				defaultValue: {
					summary: 'md',
				},
				type: {
					summary: 'xs | sm | md | lg',
				},
			},
		},
		testId: {
			description: 'Test automation ID',
			control: 'text',
			table: {
				category: 'Props',
				defaultValue: {
					summary: 'undefined',
				},
				type: {
					summary: 'string',
				},
			},
		},
		variant: {
			description: 'Set button color variant',
			control: 'radio',
			options: ['primary', 'success', 'error'],
			table: {
				category: 'Props',
				defaultValue: {
					summary: 'primary',
				},
				type: {
					summary: 'primary | ssuccess | error',
				},
			},
		},
		onClick: {
			action: 'clicked',
			description: 'Callback fired when the button clicked.',
			table: {
				category: 'Callbacks',
				defaultValue: {
					summary: 'undefined',
				},
				type: {
					summary:
						'(event?: React.MouseEventHandler<HTMLButtonElement> | undefined) => void',
				},
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Button>

export const Basic: Story = {
	render: (args) => {
		return (
			<Button {...args} variant="primary">
				Click me
			</Button>
		)
	},
}

export const Variant: Story = {
	render: (args) => {
		return (
			<div style={{ display: 'flex', gap: '10px' }}>
				<Button {...args} variant="primary">
					Primary
				</Button>
				<Button {...args} variant="success">
					Success
				</Button>
				<Button {...args} variant="error">
					Error
				</Button>
			</div>
		)
	},
}

export const Size: Story = {
	render: (args) => {
		return (
			<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
				<Button {...args} size="xs">
					Extra small
				</Button>
				<Button {...args} size="sm">
					Small
				</Button>
				<Button {...args} size="md">
					Medium
				</Button>
				<Button {...args} size="lg">
					Large
				</Button>
			</div>
		)
	},
}

export const Outline: Story = {
	render: (args) => {
		return (
			<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
				<Button {...args} appearance="outline" variant="primary">
					Primary
				</Button>
				<Button {...args} appearance="outline" variant="success">
					Success
				</Button>
				<Button {...args} appearance="outline" variant="error">
					Error
				</Button>
			</div>
		)
	},
}

export const Disabled: Story = {
	render: (args) => {
		return (
			<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
				<Button {...args} disabled variant="primary">
					Primary
				</Button>
				<Button {...args} disabled variant="success">
					Success
				</Button>
				<Button {...args} disabled variant="error">
					Error
				</Button>

				<Button {...args} appearance="outline" disabled variant="primary">
					{' '}
					Outline Primary
				</Button>
				<Button {...args} appearance="outline" disabled variant="success">
					{' '}
					Outline Success
				</Button>
				<Button {...args} appearance="outline" disabled variant="error">
					{' '}
					Outline Error
				</Button>
			</div>
		)
	},
}

export const Full: Story = {
	render: (args) => {
		return (
			<div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
				<Button {...args} full>
					Primary
				</Button>
				<Button {...args} appearance="outline" full>
					Outline
				</Button>
			</div>
		)
	},
}

export const Alignment: Story = {
	render: (args) => {
		return (
			<div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
				<Button {...args} alignment="start">
					Start
				</Button>
				<Button {...args} alignment="center">
					Center
				</Button>
				<Button {...args} alignment="end">
					End
				</Button>
			</div>
		)
	},
}

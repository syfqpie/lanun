import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'

const meta: Meta<typeof Card> = {
	title: 'Components/Card',
	component: Card,
	args: {
		testId: 'ta-card',
	},
	argTypes: {
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
	},
}

export default meta

type Story = StoryObj<typeof Card>

export const Basic: Story = {
	render: (args) => {
		return (
			<div style={{ width: '10em' }}>
				<Card {...args}>
					<div>Hello world</div>
				</Card>
			</div>
		)
	},
}

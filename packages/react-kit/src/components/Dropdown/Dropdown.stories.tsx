import type { Meta, StoryObj } from '@storybook/react'
import Dropdown from './Dropdown'

const meta: Meta<typeof Dropdown> = {
	title: 'Components/Dropdown',
	component: Dropdown,
	args: {
		items: [
			{ label: 'Item 1', value: 'item_1' },
			{ label: 'Item 2', value: 'item_2' },
		],
		label: 'Select option',
		size: 'sm',
		testId: 'ta-dropdown',
		onChange: (val) => {
			console.log(`Option ${val} clicked`)
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Placeholder text for the dropdown button.',
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
		items: {
			control: 'object',
			description:
				'An array of selectable options. See the **DropdownItem** type below',
			table: {
				category: 'Props',
				defaultValue: {
					summary: '[]',
				},
				type: {
					summary: 'DropdownItem[]',
				},
			},
		},
		size: {
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
		onChange: {
			action: 'changed',
			description: 'Callback fired when the value changes.',
			table: {
				category: 'Callbacks',
				defaultValue: {
					summary: 'undefined',
				},
				type: {
					summary: '(ev: FormEvent<HTMLDivElement> | string | number) => void',
				},
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Dropdown>

export const Basic: Story = {
	render: (args) => {
		return <Dropdown {...args} />
	},
}

export const Size: Story = {
	render: (args) => {
		return (
			<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
				<Dropdown {...args} size="xs" label="Extra small" />
				<Dropdown {...args} size="sm" label="Small" />
				<Dropdown {...args} size="md" label="Medium" />
				<Dropdown {...args} size="lg" label="Large" />
			</div>
		)
	},
}

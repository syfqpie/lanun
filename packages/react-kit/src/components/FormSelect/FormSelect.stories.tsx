import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import FormSelect from './FormSelect'

const meta: Meta<typeof FormSelect> = {
	title: 'Components/FormSelect',
	component: FormSelect,
	args: {
		options: [
			{ label: 'Option 1', value: 'option1' },
			{ label: 'Option 2', value: 'option2' },
			{ label: 'Option 3', value: 'option3' },
		],
		testId: 'ta-select',
	},
	argTypes: {
		disabled: {
			control: 'boolean',
			description:
				'If set to `true`, the select will have disabled appearance.',
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
		errorMessages: {
			control: 'object',
			description:
				'Array of error messages, shown if `hasError` is set to true.',
			table: {
				category: 'Props',
				defaultValue: {
					summary: '[]',
				},
				type: {
					summary: 'string[]',
				},
			},
		},
		groupClassName: {
			control: 'text',
			description:
				'Allows you to apply additional styling to the container that wraps the input field and label.',
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
		hasError: {
			control: 'boolean',
			description:
				'If set to `true`, the select appearance will change to `error` variant.',
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
		label: {
			control: 'text',
			description: 'Sets a text label above the select field.',
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
		options: {
			control: 'object',
			description:
				'An array of selectable options. See the **SelectOption** type below',
			table: {
				category: 'Props',
				defaultValue: {
					summary: '[]',
				},
				type: {
					summary: 'SelectOption[]',
				},
			},
		},
		placeholder: {
			control: 'text',
			description:
				'Sets a temporary hint inside the select field, displayed when it is empty.',
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
		testId: {
			control: 'text',
			description: 'Tag to be used for testing purposes.',
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
		value: {
			control: 'object',
			description: `The input control's value.`,
			table: {
				category: 'Props',
				defaultValue: {
					summary: 'undefined',
				},
				type: {
					summary: 'string | readonly string[] | number | undefined',
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
					summary: '(ev: string) => void',
				},
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof FormSelect>

export const BasicUsage: Story = {
	args: {
		label: 'Fruit',
		placeholder: 'Select fruit',
	},
	render: (args) => {
		// eslint-disable-next-line
		const [value, setValue] = useState('option1')

		return (
			<div>
				<FormSelect
					{...args}
					value={value}
					onChange={(val) => {
						if (typeof val === 'string') {
							setValue(val)
						}
					}}
				/>
				p {value}
			</div>
		)
	},
}

export const Basic: Story = {
	args: {
		label: 'Fruit',
		placeholder: 'Select fruit',
	},
}

export const Disabled: Story = {
	args: {
		label: 'Fruit',
		placeholder: 'Select fruit',
		disabled: true,
	},
}

export const ErrorStateWithMessage: Story = {
	args: {
		label: 'Fruit',
		placeholder: 'Select fruit',
		hasError: true,
		errorMessages: ['Field required'],
	},
}

export const WithGroupClassName: Story = {
	args: {
		className: '!bg-gray-600',
		groupClassName: 'bg-blue-400/30 p-4 rounded-md',
		label: 'Fruit',
		placeholder: 'Select fruit',
	},
}

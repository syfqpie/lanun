import type { Meta, StoryObj } from '@storybook/react'
import FormInput from './FormInput'

const meta: Meta<typeof FormInput> = {
	title: 'Components/FormInput',
	component: FormInput,
	args: {
		label: 'Name',
		placeholder: 'Enter name',
		testId: 'ta-input',
	},
	argTypes: {
		disabled: {
			control: 'boolean',
			description: 'If set to `true`, the input will have disabled appearance.',
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
				'If set to `true`, the input appearance will change to `error` variant.',
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
			description: 'Sets a text label above the input field.',
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
	},
}

export default meta

type Story = StoryObj<typeof FormInput>

export const Basic: Story = {}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
}

export const ErrorStateWithMessage: Story = {
	args: {
		hasError: true,
		errorMessages: ['Field required'],
	},
}

export const WithGroupClassName: Story = {
	args: {
		className: '!bg-gray-600',
		groupClassName: 'bg-blue-400/30 p-4 rounded-md',
	},
}

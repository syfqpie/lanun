import { fireEvent, render, screen } from '@testing-library/react'
import { expect, describe, it, vi } from 'vitest'
import FormSelect from './FormSelect'

describe('FormSelect', () => {
	const defaultProps = {
		testId: 'select',
		label: 'Choose Option',
		options: [
			{ label: 'Option A', value: 'a' },
			{ label: 'Option B', value: 'b' },
		],
		placeholder: 'Select something',
		onChange: vi.fn(),
	}

	const withErrorProps = {
		...defaultProps,
		hasError: true,
		errorMessages: ['Required field', 'Invalid value'],
	}

	it('renders with all test tags', () => {
		render(<FormSelect {...withErrorProps} />)
		expect(screen.queryByTestId('select-form')).toBeInTheDocument()
		expect(screen.queryByTestId('select-label')).toBeInTheDocument()
		expect(screen.queryByTestId('select-toggler')).toBeInTheDocument()
		expect(screen.queryByTestId('select-error-msg-0')).toBeInTheDocument()
		expect(screen.queryByTestId('select-error-msg-1')).toBeInTheDocument()
	})

	it('renders all options when opened', () => {
		render(<FormSelect {...defaultProps} />)

		fireEvent.click(screen.getByTestId('select-toggler'))

		expect(screen.getByTestId('select-option-0')).toHaveTextContent('Option A')
		expect(screen.getByTestId('select-option-1')).toHaveTextContent('Option B')
	})

	it('renders disabled state', () => {
		render(<FormSelect {...defaultProps} disabled={true} />)
		expect(screen.queryByTestId('select-toggler')).toBeDisabled()
		expect(screen.queryByTestId('select-toggler')).toHaveClass(
			'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-60',
		)
	})

	it('renders error messages correctly', () => {
		render(<FormSelect {...withErrorProps} hasError={false} />)
		expect(screen.queryByTestId('select-form')).toBeInTheDocument()
		expect(screen.queryByTestId('select-label')).toBeInTheDocument()
		expect(screen.queryByTestId('select-toggler')).toBeInTheDocument()
		expect(screen.queryByTestId('select-error-msg-0')).not.toBeInTheDocument()
		expect(screen.queryByTestId('select-error-msg-1')).not.toBeInTheDocument()

		render(
			<FormSelect
				{...withErrorProps}
				hasError={true}
				testId="select-visible"
			/>,
		)
		expect(screen.queryByTestId('select-visible-form')).toBeInTheDocument()
		expect(screen.queryByTestId('select-visible-label')).toBeInTheDocument()
		expect(screen.queryByTestId('select-visible-toggler')).toBeInTheDocument()
		expect(
			screen.queryByTestId('select-visible-error-msg-0'),
		).toBeInTheDocument()
		expect(
			screen.queryByTestId('select-visible-error-msg-1'),
		).toBeInTheDocument()
	})

	it('renders label and placeholder', () => {
		render(<FormSelect {...defaultProps} />)
		expect(screen.getByTestId('select-label')).toHaveTextContent(
			'Choose Option',
		)
		expect(screen.getByText('Select something')).toBeInTheDocument()
	})

	it('groupClassName passed correctly', () => {
		render(
			<FormSelect {...defaultProps} groupClassName="testclass1 testclass4" />,
		)
		expect(screen.getByTestId('select-form')).toHaveClass(
			'testclass1',
			'testclass4',
		)
	})

	it('opens dropdown on click', () => {
		render(<FormSelect {...defaultProps} />)

		const toggler = screen.getByTestId('select-toggler')
		fireEvent.click(toggler)

		expect(screen.getByTestId('select-options-container')).toBeInTheDocument()
	})

	it('calls onChange when an option is selected and value changed', () => {
		render(<FormSelect {...defaultProps} />)

		fireEvent.click(screen.getByTestId('select-toggler'))
		fireEvent.click(screen.getByTestId('select-option-1'))
		expect(defaultProps.onChange).toHaveBeenCalledWith('b')
		expect(screen.getByTestId('select-selected-label')).toHaveTextContent(
			'Option B',
		)
	})

	it('renders selected option visually correct', () => {
		render(<FormSelect {...defaultProps} />)

		fireEvent.click(screen.getByTestId('select-toggler'))
		expect(screen.getByTestId('select-option-1')).toHaveClass(
			'hover:bg-gray-300',
		)

		fireEvent.click(screen.getByTestId('select-option-1'))
		expect(defaultProps.onChange).toHaveBeenCalledWith('b')
		expect(screen.getByTestId('select-selected-label')).toHaveTextContent(
			'Option B',
		)

		fireEvent.click(screen.getByTestId('select-toggler'))
		expect(screen.getByTestId('select-option-1')).toHaveClass(
			'bg-gray-900 text-white',
		)
	})
})

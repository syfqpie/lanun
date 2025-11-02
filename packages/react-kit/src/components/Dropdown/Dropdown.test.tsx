import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Dropdown from './Dropdown'

const items = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
]

describe('Dropdown', () => {
	it('renders with test tag', () => {
		render(<Dropdown testId="test-dropdown-id" />)
		expect(screen.getByTestId('test-dropdown-id')).toBeInTheDocument()
	})

	it('renders correctly with default props', () => {
		render(<Dropdown label="Select an option" items={items} />)
		expect(screen.getByText('Select an option')).toBeInTheDocument()
	})

	it('opens dropdown on button click', () => {
		render(<Dropdown label="Select an option" items={items} />)
		const button = screen.getByText('Select an option')
		fireEvent.click(button)
		expect(screen.getByText('Option 1')).toBeInTheDocument()
		expect(screen.getByText('Option 2')).toBeInTheDocument()
		expect(screen.getByText('Option 3')).toBeInTheDocument()
	})

	it('closes dropdown after selection', async () => {
		const testId = 'test'
		render(<Dropdown label="Select an option" items={items} testId={testId} />)
		const button = screen.getByTestId(`${testId}-toggle`)
		fireEvent.click(button)
		fireEvent.click(screen.getByTestId(`${testId}-option-0`))
		expect(screen.queryByTestId(`${testId}-option-0`)).not.toBeInTheDocument()
	})

	it('calls onChanged', () => {
		const mockOnChange = vi.fn()
		render(
			<Dropdown
				label="Select an option"
				items={items}
				onChange={(ev) => mockOnChange(ev)}
			/>,
		)

		const button = screen.getByText('Select an option')
		fireEvent.click(button)
		const option = screen.getByText('Option 2')
		fireEvent.click(option)
		expect(mockOnChange).toHaveBeenCalled()
		expect(mockOnChange).toHaveBeenCalledWith('option2')
	})
})

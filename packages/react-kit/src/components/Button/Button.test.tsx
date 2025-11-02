import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
	it('renders content correctly', () => {
		render(<Button>Click</Button>)
		expect(screen.getByText('Click')).toBeInTheDocument()
	})

	it('renders with test tag', () => {
		render(<Button testId="test-btn-id">Click</Button>)
		expect(screen.getByTestId('test-btn-id')).toBeInTheDocument()
	})

	it('renders different sizes', () => {
		const sizes = ['xs', 'sm', 'md', 'lg'] as const
		const sizeClasses = {
			xs: ['px-2', 'py-1', 'text-xs', 'rounded-lg'],
			sm: ['px-2.5', 'py-1.5', 'text-base md:text-sm', 'rounded-lg'],
			md: ['px-4', 'py-2', 'text-sm', 'rounded-lg'],
			lg: ['px-4.5', 'py-2.5', 'text-base', 'rounded-lg'],
		}

		sizes.forEach((size) => {
			render(<Button size={size}>{size}</Button>)
			const button = screen.getByText(size)
			sizeClasses[size].forEach((expectedClass) => {
				expect(button).toHaveClass(expectedClass)
			})
		})
	})

	it('renders a solid button', () => {
		const variants = ['primary', 'success', 'error'] as const
		variants.forEach((variant) => {
			render(
				<Button variant={variant} appearance="solid">
					{variant}
				</Button>,
			)
			const button = screen.getByText(variant)
			expect(button).not.toHaveClass('bg-transparent')
			expect(button.className).toMatch(new RegExp(`bg-${variant}*`))
		})
	})

	it('renders a outline button', () => {
		const variants = ['primary', 'success', 'error'] as const
		variants.forEach((variant) => {
			render(
				<Button variant={variant} appearance="outline">
					{variant}
				</Button>,
			)
			const button = screen.getByText(variant)
			expect(button).toHaveClass('bg-transparent')
			expect(button.className).toMatch(new RegExp(`text-${variant}*`))
			expect(button.className).toMatch(new RegExp(`border-${variant}*`))
			expect(button.className).toMatch(new RegExp('bg-transparent'))
		})
	})

	it('applies full width when full prop is true', () => {
		render(<Button full>Click</Button>)
		expect(screen.getByText('Click')).toHaveClass('w-full')
	})

	it('applies alignment classes correctly', () => {
		const alignments = ['start', 'center', 'end'] as const
		alignments.forEach((alignment) => {
			render(<Button alignment={alignment}>{alignment}</Button>)
			expect(screen.getByText(alignment)).toHaveClass(`justify-${alignment}`)
		})
	})

	it('disables button when disabled prop is true', () => {
		render(<Button disabled>Click</Button>)
		const button = screen.getByText('Click')
		expect(button).toBeDisabled()
		expect(button).toHaveClass(
			'disabled:cursor-not-allowed disabled:opacity-30',
		)
	})

	it('handles click events', async () => {
		const user = userEvent.setup()
		const handleClick = vi.fn()
		render(<Button onClick={handleClick}>Click</Button>)
		await user.click(screen.getByText('Click'))
		expect(handleClick).toHaveBeenCalled()
	})

	it('applies focus styles correctly', async () => {
		const user = userEvent.setup()
		render(<Button>Click</Button>)
		const button = screen.getByText('Click')

		await user.tab()
		expect(button).toHaveFocus()
		expect(button).toHaveClass('focus:ring-2')
	})
})

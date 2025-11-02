import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Card from './Card'

describe('Card', () => {
	it('renders with test tag', () => {
		render(<Card testId="ta-card" />)
		expect(screen.getByTestId('ta-card')).toBeInTheDocument()
	})

	it('renders with content', () => {
		render(<Card testId="ta-card">Hello world</Card>)
		expect(screen.getByTestId('ta-card')).toHaveTextContent('Hello world')
	})
})

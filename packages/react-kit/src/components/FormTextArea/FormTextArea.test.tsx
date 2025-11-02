import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FormTextArea from './FormTextArea'

describe('FormTextArea', () => {
	it('renders with all test tags', () => {
		render(
			<FormTextArea
				testId="test-formtextarea-id"
				label="form"
				hasError={true}
				errorMessages={['Field required']}
			/>,
		)
		expect(
			screen.queryByTestId('test-formtextarea-id-form'),
		).toBeInTheDocument()
		expect(
			screen.queryByTestId('test-formtextarea-id-label'),
		).toBeInTheDocument()
		expect(
			screen.queryByTestId('test-formtextarea-id-textarea'),
		).toBeInTheDocument()
		expect(
			screen.queryByTestId('test-formtextarea-id-error-msg-0'),
		).toBeInTheDocument()
	})

	it('renders without non required options', () => {
		render(<FormTextArea testId="test-formtextarea-id" />)
		expect(
			screen.queryByTestId('test-formtextarea-id-form'),
		).toBeInTheDocument()
		expect(
			screen.queryByTestId('test-formtextarea-id-label'),
		).not.toBeInTheDocument()
		expect(
			screen.queryByTestId('test-formtextarea-id-textarea'),
		).toBeInTheDocument()
		expect(
			screen.queryByTestId('test-formtextarea-id-error-msg-0'),
		).not.toBeInTheDocument()
	})
})

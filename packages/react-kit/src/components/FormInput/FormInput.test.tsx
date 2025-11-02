import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FormInput from './FormInput'

describe('FormInput', () => {
	it('renders with all test tags', () => {
		render(
			<FormInput
				testId="test-forminput-id"
				label="form"
				hasError={true}
				errorMessages={['Field required']}
			/>,
		)
		expect(screen.queryByTestId('test-forminput-id-form')).toBeInTheDocument()
		expect(screen.queryByTestId('test-forminput-id-label')).toBeInTheDocument()
		expect(screen.queryByTestId('test-forminput-id-input')).toBeInTheDocument()
		expect(
			screen.queryByTestId('test-forminput-id-error-msg-0'),
		).toBeInTheDocument()
	})

	it('renders without non required options', () => {
		render(<FormInput testId="test-forminput-id" />)
		expect(screen.queryByTestId('test-forminput-id-form')).toBeInTheDocument()
		expect(
			screen.queryByTestId('test-forminput-id-label'),
		).not.toBeInTheDocument()
		expect(screen.queryByTestId('test-forminput-id-input')).toBeInTheDocument()
		expect(
			screen.queryByTestId('test-forminput-id-error-msg-0'),
		).not.toBeInTheDocument()
	})
})

import { InputHTMLAttributes } from 'react'
import { TestComponentMixin } from '@/types/mixins'

export type FormInputProps = TestComponentMixin &
	InputHTMLAttributes<HTMLInputElement> & {
		label?: string
		groupClassName?: string
		hasError?: boolean
		errorMessages?: string[]
	}

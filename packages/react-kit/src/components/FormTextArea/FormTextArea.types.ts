import { TextareaHTMLAttributes } from 'react'
import { TestComponentMixin } from '@/types/mixins'

export type FormTextAreaProps = TestComponentMixin &
	TextareaHTMLAttributes<HTMLTextAreaElement> & {
		label?: string
		groupClassName?: string
		hasError?: boolean
		errorMessages?: string[]
	}

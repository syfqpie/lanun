import { HTMLAttributes } from 'react'
import { TestComponentMixin } from '@/types/mixins'

export interface SelectOption {
	label: string
	value: string
}

export type FormSelectProps = TestComponentMixin &
	HTMLAttributes<HTMLDivElement> & {
		disabled?: boolean
		errorMessages?: string[]
		label?: string
		groupClassName?: string
		hasError?: boolean
		options?: SelectOption[]
		placeholder?: string
		value?: string | readonly string[] | number
		onChange?: (value: string) => void
	}

import { HTMLAttributes } from 'react'
import { TestComponentMixin } from '@/types/mixins'
import { Size } from '@/types/base'

export interface DropdownItem {
	label: string
	value: string | number
}

export type DropdownProps = TestComponentMixin &
	HTMLAttributes<HTMLDivElement> & {
		label?: string
		items?: DropdownItem[]
		size?: Size
		onChange?: (value: string | number) => void
	}

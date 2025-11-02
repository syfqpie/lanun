import { ComponentPropsWithRef } from 'react'
import { TestComponentMixin } from '@/types/mixins'
import { Size } from '@/types/base'

export type ButtonProps = TestComponentMixin &
	ComponentPropsWithRef<'button'> & {
		alignment?: 'start' | 'center' | 'end'
		appearance?: 'solid' | 'outline'
		size?: Size
		variant?: 'primary' | 'success' | 'error'
		full?: boolean
	}

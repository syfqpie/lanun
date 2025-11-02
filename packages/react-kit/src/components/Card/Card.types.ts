import { HTMLAttributes } from 'react'
import { TestComponentWithChildrenMixin } from '@/types/mixins'

export type CardProps = TestComponentWithChildrenMixin &
	HTMLAttributes<HTMLDivElement>

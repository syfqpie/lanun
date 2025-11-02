import { PropsWithChildren } from 'react'

export type TestComponentMixin = {
	testId?: string
}

export type TestComponentWithChildrenMixin = TestComponentMixin &
	PropsWithChildren

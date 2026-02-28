import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface CreateAntarabangsaMiddlewareOptions {
	hideDefaultLocale?: boolean
}

export const createAntarabangsaMiddleware = ({
	hideDefaultLocale = true,
}: CreateAntarabangsaMiddlewareOptions) => {
	return (req: NextRequest) => {
		const { nextUrl } = req
		const { pathname } = nextUrl

		return NextResponse.next()
	}
}

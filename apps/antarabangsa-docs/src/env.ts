export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV as
	| 'development'
	| 'staging'
	| 'production'

export const isDev = APP_ENV === 'development'
export const isStaging = APP_ENV === 'staging'
export const isProduction = APP_ENV === 'production'

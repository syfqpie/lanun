/**
 * Configuration options for the locale middleware factory.
 */
export type MiddlewareOptions = {
	/**
	 * List of pathname routes that should never be locale prefixed.
	 * Values must be provided as absolute pathnames starting with `/`.
	 *
	 * @defaultValue []
	 */
	noLocaleRoutes?: string[]
}

/**
 * Safely resolves a dot-path string (e.g. "page.title") from an object.
 *
 * This enables accessing nested translation objects using flat string keys.
 *
 * @param obj - The object to resolve the path from.
 * @param path - Dot-separated path (e.g. "page.title").
 * @returns The resolved string value if found, otherwise `undefined`.
 *
 * @example
 * getByPath({ page: { title: "Hello" } }, "page.title") // "Hello"
 */

export const getByPath = (obj: unknown, path: string): string | undefined => {
	return path.split('.').reduce<any>((acc, part) => {
		if (acc && typeof acc === 'object') {
			return acc[part]
		}
		return undefined
	}, obj)
}

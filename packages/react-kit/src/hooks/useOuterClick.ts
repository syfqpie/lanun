import React from 'react'

/**
 * useOuterClick
 *
 * A custom hook that detects clicks or touch events outside a referenced element
 * and triggers a callback function.
 *
 * @description
 * This hook is useful for closing dropdowns, modals, popovers, or any UI component
 * that should dismiss when clicking outside of its boundaries.
 *
 * @param callback - The function to execute when an outside click is detected.
 * @param options - Optional configuration object to control event listeners.
 * @param options.mouseup - Whether to listen for 'mouseup' events (default: true).
 * @param options.mousedown - Whether to listen for 'mousedown' events (default: false).
 *
 * @example
 * const ref = useOuterClick<HTMLDivElement>(() => {
 *   setIsOpen(false) // Close dropdown or modal
 * })
 *
 * return <div ref={ref}>Content</div>
 */

export const useOuterClick = <T extends HTMLElement = HTMLBodyElement>(
	callback: () => void,
	options: { mouseup?: boolean; mousedown?: boolean } = {
		mouseup: true,
		mousedown: false,
	},
) => {
	const ref = React.useRef<T | null>(null)
	const { mouseup = true, mousedown = false } = options

	React.useEffect(() => {
		const onClickOutside = (event: MouseEvent | TouchEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback()
			}
		}

		document.addEventListener('touchend', onClickOutside)

		if (mouseup) document.addEventListener('mouseup', onClickOutside)
		if (mousedown) document.addEventListener('mousedown', onClickOutside)

		return () => {
			document.removeEventListener('touchend', onClickOutside)
			if (mouseup) document.removeEventListener('mouseup', onClickOutside)
			if (mousedown) document.removeEventListener('mousedown', onClickOutside)
		}
	}, [callback, mouseup, mousedown])

	return ref
}

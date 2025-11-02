import React from 'react'
import clsx from 'clsx'

import type { ButtonProps } from './Button.types'

const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	alignment = 'center',
	appearance = 'solid',
	size = 'md',
	full = false,
	className,
	testId,
	children,
	...props
}) => {
	return (
		<button
			{...props}
			data-testid={testId}
			className={clsx(
				'font-normal transition-all duration-150',
				'inline-flex items-center justify-center flex-shrink-0 gap-x-1.5',
				'focus:outline-none focus-visible:outline-none focus:ring-2',
				'disabled:cursor-not-allowed disabled:opacity-30 border',
				{
					// size
					'px-2 py-1 text-xs rounded-lg': size === 'xs',
					'px-2.5 py-1.5 text-base md:text-sm rounded-lg': size === 'sm',
					'px-4 py-2 text-sm rounded-lg': size === 'md' || size === undefined,
					'px-4.5 py-2.5 text-base rounded-lg': size === 'lg',

					// solid
					'text-white': appearance === 'solid',
					'bg-primary-900 enabled:hover:bg-primary-950 enabled:focus:ring-primary-500/30 border-primary-900 enabled:hover:border-primary-950 enabled:focus:border-primary-500/30':
						appearance === 'solid' && variant === 'primary',
					'bg-success-500 enabled:hover:bg-success-600 enabled:focus:ring-success-500/30 border-success-500 enabled:hover:border-success-600 enabled:focus:border-success-500/30':
						appearance === 'solid' && variant === 'success',
					'bg-error-500 enabled:hover:bg-error-600 enabled:focus:ring-error-500/30 border-error-500 enabled:hover:border-error-600 enabled:focus:border-error-500/30':
						appearance === 'solid' && variant === 'error',

					// outline
					'bg-transparent enabled:hover:text-white': appearance === 'outline',
					'text-primary-900 border-primary-900 enabled:hover:bg-primary-900 enabled:focus:ring-primary-500/40':
						appearance === 'outline' && variant === 'primary',
					'text-success-500 border-success-500 enabled:hover:bg-success-500 enabled:focus:ring-success-500/40':
						appearance === 'outline' && variant === 'success',
					'text-error-500 border-error-500 enabled:hover:bg-error-500 enabled:focus:ring-error-500/40':
						appearance === 'outline' && variant === 'error',

					// full
					'w-full': full,
					'justify-start': alignment === 'start',
					'justify-center': alignment === 'center',
					'justify-end': alignment === 'end',
				},
				className,
			)}
		>
			{children}
		</button>
	)
}

export default Button

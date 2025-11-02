import clsx from 'clsx'

import type { FormTextAreaProps } from './FormTextArea.types'

const FormTextArea: React.FC<FormTextAreaProps> = ({
	className,
	groupClassName,
	label,
	testId,
	hasError = false,
	errorMessages = [],
	...props
}) => {
	return (
		<div className={groupClassName} data-testid={`${testId}-form`}>
			{label === undefined ? null : (
				<label
					className="block mb-1 text-gray-900 font-semibold"
					data-testid={`${testId}-label`}
				>
					{label}
				</label>
			)}

			<textarea
				{...props}
				className={clsx(
					'block w-full rounded-lg px-2.5 py-1.5 border',
					'bg-white shadow-sm text-base md:text-sm',
					'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-60 outline-none',
					'ring-0 focus:ring-2',
					{
						'focus:ring-gray-500/30 text-gray-900 placeholder-gray-400 border-gray-900 caret-gray-500':
							!hasError,
						'focus:ring-red-500/30 text-red-500 placeholder-red-300 border-red-500 caret-red-500':
							hasError,
					},
					className,
				)}
				data-testid={`${testId}-textarea`}
			></textarea>

			{hasError && errorMessages.length > 0
				? errorMessages.map((err, index) => {
						return (
							<p
								className="text-xs mt-1 text-red-300"
								data-testid={`${testId}-error-msg-${index}`}
								key={index}
							>
								{err}
							</p>
						)
					})
				: null}
		</div>
	)
}

export default FormTextArea

import React from 'react'
import clsx from 'clsx'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ChevronDown } from 'lucide-react'

import { useOuterClick } from '@/hooks'

import type { FormSelectProps, SelectOption } from './FormSelect.types'

/**
 * TODO:
 * - add multiple selection
 * - add clear
 */
const FormSelect: React.FC<FormSelectProps> = ({
	className,
	disabled = false,
	errorMessages = [],
	groupClassName,
	hasError = false,
	label,
	options = [],
	placeholder,
	testId,
	value,
	onChange,
	...props
}) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [selectedValue, setSelectedValue] = React.useState(value)
	const ref = useOuterClick<HTMLDivElement>(() => isOpen && setIsOpen(false))
	const [parent] = useAutoAnimate({ duration: 150 })

	const toggleOptions = () => setIsOpen((prev) => !prev)

	const handleSelect = (opt: SelectOption) => {
		setSelectedValue(opt.value)
		setIsOpen(false)
		onChange?.(opt.value)
	}

	const selectedLabel = React.useMemo(() => {
		const selectedInput = options.find((opt) => opt.value === value)
		const selectedOption = options.find((opt) => opt.value === selectedValue)
		return selectedInput
			? selectedInput.label
			: selectedOption
				? selectedOption.label
				: placeholder
	}, [options, placeholder, value, selectedValue])

	return (
		<div
			{...props}
			ref={ref}
			className={clsx('relative', groupClassName)}
			data-testid={`${testId}-form`}
		>
			{label === undefined ? null : (
				<label
					className="block mb-1 text-gray-900 font-semibold"
					data-testid={`${testId}-label`}
				>
					{label}
				</label>
			)}
			<button
				className={clsx(
					'block w-full rounded-lg px-2.5 py-1.5 border text-left',
					'bg-white shadow-sm text-base md:text-sm',
					'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-60 outline-none',
					{
						'text-gray-900 placeholder-gray-400 border-gray-900 caret-gray-500':
							!hasError,
						'text-red-500 placeholder-red-300 border-red-500 caret-red-500':
							hasError,
						'ring-gray-500/30': !hasError && isOpen,
						'ring-red-500/30': hasError && isOpen,
						'ring-2': isOpen,
						'ring-0': !isOpen,
					},
					className,
				)}
				data-testid={`${testId}-toggler`}
				disabled={disabled}
				onClick={toggleOptions}
			>
				<span className={'flex items-center gap-1'}>
					<span
						className={clsx('flex-1 overflow-hidden text-ellipsis', {
							'text-gray-400': !selectedValue && !hasError,
							'text-red-400': !selectedValue && hasError,
							'text-gray-900': selectedValue && !hasError,
							'text-red-500': selectedValue && hasError,
						})}
						data-testid={`${testId}-selected-label`}
					>
						{selectedLabel}
					</span>

					<ChevronDown
						className={clsx('transition flex-none w-4 h-4', {
							'rotate-180': isOpen,
						})}
					/>
				</span>
			</button>

			<div ref={parent}>
				{isOpen && (
					<ul
						className={clsx(
							'absolute mt-2 w-full bg-white border border-gray-200',
							'shadow-lg rounded-lg z-[5] max-h-60 overflow-y-scroll',
						)}
						data-testid={`${testId}-options-container`}
					>
						{options.map((opt, index) => (
							<li key={index} className={'group'}>
								<button
									className={clsx(
										'cursor-pointer w-full flex',
										'px-2.5 py-1.5 text-sm group-first:rounded-t-lg group-last:rounded-b-lg',
										{
											'bg-gray-900 text-white': selectedValue === opt.value,
											'hover:bg-gray-300': selectedValue !== opt.value,
										},
									)}
									data-testid={`${testId}-option-${index}`}
									onClick={() => handleSelect(opt)}
								>
									{opt.label}
								</button>
							</li>
						))}
					</ul>
				)}
			</div>

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

export default FormSelect

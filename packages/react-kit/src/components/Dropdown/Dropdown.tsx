import React from 'react'
import clsx from 'clsx'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/Button'
import { useOuterClick } from '@/hooks'

import type { DropdownProps, DropdownItem } from './Dropdown.types'

const Dropdown: React.FC<DropdownProps> = ({
	className,
	label,
	size = 'md',
	testId,
	items = [],
	onChange,
	...props
}) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const dropdownRef = useOuterClick<HTMLDivElement>(
		() => isOpen && setIsOpen(false),
	)
	const [parent] = useAutoAnimate({ duration: 150 })

	const toggleDropdown = () => setIsOpen((prev) => !prev)
	const handleSelect = (item: DropdownItem) => {
		onChange?.(item.value)
		setIsOpen(false)
	}

	return (
		<div
			{...props}
			ref={dropdownRef}
			className={clsx('relative', className)}
			data-testid={testId}
		>
			<Button size={size} onClick={toggleDropdown} testId={`${testId}-toggle`}>
				<span data-testid={`${testId}-label`}>{label}</span>

				<ChevronDown
					className={clsx('transition w-4 h-4', {
						'rotate-180': isOpen,
					})}
				/>
			</Button>

			<div ref={parent}>
				{isOpen && (
					<ul
						className={clsx(
							'absolute left-0 mt-2 w-48 z-[5] bg-white border border-gray-200 shadow-lg',
							{
								'rounded-lg':
									size === 'xs' ||
									size === 'sm' ||
									size === 'md' ||
									size === undefined,
								'rounded-xl': size === 'lg',
							},
						)}
						data-testid={`${testId}-dropdown`}
					>
						{items.map((item, index) => (
							<li key={index} className={'group'}>
								<a
									className={clsx(
										'hover:bg-primary-900 hover:text-white cursor-pointer w-full flex',
										{
											'px-2 py-1 text-xs group-first:rounded-t-lg group-last:rounded-b-lg':
												size === 'xs',
											'px-2.5 py-1.5 text-sm group-first:rounded-t-lg group-last:rounded-b-lg':
												size === 'sm',
											'px-4 py-2 text-sm group-first:rounded-t-lg group-last:rounded-b-lg':
												size === 'md' || size === undefined,
											'px-4.5 py-2.5 text-base group-first:rounded-t-lg group-last:rounded-b-lg':
												size === 'lg',
										},
									)}
									data-testid={`${testId}-option-${index}`}
									onClick={() => handleSelect(item)}
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default Dropdown

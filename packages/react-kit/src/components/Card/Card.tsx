import clsx from 'clsx'

import type { CardProps } from './Card.types'

const Card: React.FC<CardProps> = ({
	className,
	testId,
	children,
	...props
}) => {
	return (
		<div
			{...props}
			className={clsx(
				'p-6 rounded-xl bg-white text-gray-950 shadow-sm',
				{},
				className,
			)}
			data-testid={testId}
		>
			{children}
		</div>
	)
}

export default Card

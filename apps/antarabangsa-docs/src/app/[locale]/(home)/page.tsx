import { FC } from 'react'
import Link from 'next/link'

import { AppLogo } from '@/components/common/app-logo'
import { cn } from '@/lib/cn'
import { getTranslation } from '@/lib/i18n'

const HomePage: FC<LayoutProps<'/[locale]'>> = async ({
	params
}) => {
	const { locale } = await params
	const { t } = getTranslation(locale)

	return (
		<div
			className={cn(
				'flex flex-col justify-center items-center',
				'content-center center text-center flex-1 gap-3',
			)}
		>
			<AppLogo />

			<Link
				href="/docs"
				className={cn(
					'inline-flex justify-center px-5 py-3 rounded-full',
					'font-medium tracking-tight transition-colors max-sm:text-sm',
					'bg-fd-accent text-fd-accent-foreground hover:bg-fd-accent-200',
				)}
			>
				{t('home.getting_started_btn')}
			</Link>
		</div>
	)
}

export default HomePage

import { DocsLayout } from 'fumadocs-ui/layouts/docs'

import { AppLogo } from '@/components/common/app-logo'
import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'


const Layout = async ({ children }: LayoutProps<'/[locale]/docs'>) => {
	const base = baseOptions()
	const title =
		base.nav && typeof base.nav.title === 'string' ? base.nav.title : ''

	return (
		<DocsLayout
			tree={source.getPageTree()}
			{...base}
			nav={{
				...base.nav,
				title: (
					<>
						<AppLogo className="w-8!" />

						<span className="font-medium in-[.uwu]:hidden max-md:hidden">
							{title}
						</span>
					</>
				),
			}}
		>
			{children}
		</DocsLayout>
	)
}

export default Layout
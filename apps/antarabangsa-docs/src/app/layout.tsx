import { Inter } from 'next/font/google'
import { RootProvider } from 'fumadocs-ui/provider/next'
import './global.css'
import React from 'react'

const inter = Inter({
	subsets: ['latin'],
})

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<body className="flex flex-col min-h-screen">
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	)
}

export default Layout

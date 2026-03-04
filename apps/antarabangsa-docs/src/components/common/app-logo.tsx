'use client'

import { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import type { ImageProps } from 'next/image'

import { cn } from '@/lib/cn'

type AppLogoProps = Omit<ImageProps, 'src' | 'alt'>

const LOGO_DARK_MODE = '/logo/flag-white.png'
const LOGO_LIGHT_MODE = '/logo/flag.png'

export const AppLogo: FC<AppLogoProps> = ({
	className,
	height = 2000,
	width = 2000,
	...rest
}) => {
	const mounted = useRef(false)
	const { resolvedTheme } = useTheme()

  useEffect(() => {
    mounted.current = true
  }, [])

  if (mounted.current === null) return null

	const src = resolvedTheme === 'light' ? LOGO_LIGHT_MODE : LOGO_DARK_MODE

	return (
		<Image
			suppressHydrationWarning
			loading="eager"
			height={height}
			width={width}
			className={cn('w-60 mx-auto self-center center', className)}
			{...rest}
			alt="@lanun/antarabangsa logo"
			aria-label="@lanun/antarabangsa logo"
			src={src}
		/>
	)
}

import Link from 'next/link'
import React, {
  type ComponentProps,
  type FC,
  forwardRef,
  type PropsWithChildren,
} from 'react'
import tw, { css, styled } from 'twin.macro'

type Color = 'primary' | 'indigo'

type Props = ComponentProps<typeof Link> &
  PropsWithChildren<{
    href: string
    color: Color
  }>

const Announcement = forwardRef<HTMLAnchorElement, Props>(
  ({ children, color, ...props }, ref) => {
    return (
      <Link
        css={[
          tw`relative flex flex-row space-x-3 overflow-hidden`,
          color === 'primary' &&
            tw`bg-primary-600 text-gray-100 dark:bg-primary-300 dark:text-gray-900`,
          color === 'indigo' &&
            tw`bg-indigo-600 text-gray-100 dark:bg-indigo-300 dark:text-gray-900`,
        ]}
        {...props}
        ref={ref}
      >
        <div
          tw="
            mx-auto
            flex items-center justify-center divide-white
            p-3 text-sm font-medium
            lg:container lg:divide-x
            lg:px-16 xl:px-20
          "
        >
          {children}
        </div>
      </Link>
    )
  },
)
Announcement.displayName = 'Announcement'

export default Announcement

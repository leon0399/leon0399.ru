import 'twin.macro'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import React, { type FC, type PropsWithChildren } from 'react'

type Url = string

interface Props {
  title?: string
  href?: Url
}

const SectionHeader: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  href,
}) => (
  <div tw="my-4 flex flex-row items-end justify-between text-gray-900 dark:text-gray-100">
    {children ? children : <h2 className="text-xl font-semibold">{title}</h2>}
    {href && (
      <Link
        href={href}
        target={href.startsWith('http') ? '_blank' : '_self'}
        tw="size-6 rounded text-gray-500 ring-offset-2 hover:text-gray-600 focus:outline-none focus:ring"
        aria-label={title}
      >
        <Icon icon="heroicons-solid:arrow-right" tw="size-6" />
      </Link>
    )}
  </div>
)

export default SectionHeader

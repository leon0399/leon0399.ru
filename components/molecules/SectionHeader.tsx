import Link from 'next/link'
import { Icon } from '@iconify/react'

import type { FC, PropsWithChildren } from 'react'

type Url = string

interface Props {
  title?: string
  href?: Url
  className?: string
}

const SectionHeader: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  className,
  href,
}) => (
  <div
    className={`my-4 flex flex-row items-end justify-between text-gray-900 dark:text-gray-100 ${className}`}
  >
    {children ? children : <h2 className="text-xl font-semibold">{title}</h2>}
    {href && (
      (<Link
        href={href}
        target={href.startsWith('http') ? '_blank' : '_self'}
        className="h-6 w-6 rounded text-gray-500 ring-offset-2 hover:text-gray-600 focus:outline-none focus:ring"
        aria-label={title}>

        <Icon icon="heroicons-solid:arrow-right" className="h-6 w-6" />

      </Link>)
    )}
  </div>
)

export default SectionHeader

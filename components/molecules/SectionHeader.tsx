
import Link from 'next/link';
import { Icon } from '@iconify/react'

import type { FC } from 'react';

type Url = string;

interface Props {
  title?: string
  href?: Url
  className?: string
}

const SectionHeader: FC<Props> = ({ title, children, className, href }) => (
  <div className={`flex flex-row justify-between items-end my-4 text-gray-900 dark:text-gray-100 ${className}`}>
    { children
      ? children
      : <h2 className="text-xl font-semibold">{ title }</h2>
    }
    { href && (
      <Link href={href}>
        <a
          target={href.startsWith('http') ? '_blank' : '_self'}
          className='w-6 h-6 text-gray-500 hover:text-gray-600 rounded focus:outline-none focus:ring ring-offset-2'
        >
          <Icon icon="heroicons-solid:arrow-right" className='w-6 h-6' />
        </a>
      </Link>
    )}
  </div>
)

export default SectionHeader

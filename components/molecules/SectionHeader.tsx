
import Link from 'next/link';
import { Icon } from '@iconify/react'

import type { FC } from 'react';
import type { UrlObject } from 'url';

type Url = string | UrlObject;

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
        <a className='text-gray-500 hover:text-gray-600'>
          <Icon icon="heroicons-solid:arrow-right" className='w-6 h-6' />
        </a>
      </Link>
    )}
  </div>
)

export default SectionHeader

import Link from 'next/link'

import type { FC } from 'react'

interface Props {
  href: string
  className?: string
}

const Announcement: FC<Props> = ({ href, className, children }) => {
  return (
    <Link href={href}>
      <a
        className={`
          relative flex flex-row space-x-3 overflow-hidden
          ${className || ''}
        `}
      >
        <div
          className="
            divide-white
            lg:container lg:px-16 lg:divide-x xl:px-20
            flex justify-center items-center
            p-3 mx-auto
            text-sm font-medium
          "
        >
          {children}
        </div>
      </a>
    </Link>
  )
}

export default Announcement

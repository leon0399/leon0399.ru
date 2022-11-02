import Link from 'next/link'

import type { FC, PropsWithChildren } from 'react'

interface Props {
  href: string
  className?: string
}

const Announcement: FC<PropsWithChildren<Props>> = ({
  href,
  className,
  children,
}) => {
  return (
    <Link
      href={href}
      className={`
        relative flex flex-row space-x-3 overflow-hidden
        ${className || ''}
      `}
    >
      <div
        className="
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
}

export default Announcement

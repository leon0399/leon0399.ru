import React, {
  type FC,
  type PropsWithChildren,
  type ComponentProps,
} from 'react'
import Link from 'next/link'

import 'twin.macro'

interface Props {
  href: string
}

const Announcement: FC<
  PropsWithChildren<Props> & ComponentProps<typeof Link>
> = ({ children, ...props }) => {
  return (
    <Link tw="relative flex flex-row space-x-3 overflow-hidden" {...props}>
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
}

export default Announcement

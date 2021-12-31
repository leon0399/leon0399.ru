import tw, { styled } from "twin.macro"

import { Icon } from "@iconify/react"
import Link from "next/link"
import React from "react"

interface Props {
  icon: string
  color: string
  label: string
  href: string
}

const IconWrapper = styled.div<{ color: string }>(({ color }) => [
  tw`p-3 rounded ring-2`,
  tw`ring-white dark:ring-gray-900 dark:group-hover:ring-gray-700`,
  color === 'indigo' && tw`bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200`,
])

const LifeItemCard: React.FC<Props> = ({ icon, color, label, href }) => (
  <Link href={href}>
    <a className="group flex flex-col items-start p-6 space-y-8 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring ring-offset-2">
      <div className="flex flex-row">
        <IconWrapper color={color}>
          <Icon icon={icon} className="w-6 h-6" />
        </IconWrapper>
      </div>
      <h3 className="text-lg">{ label }</h3>
    </a>
  </Link>
)

export default LifeItemCard

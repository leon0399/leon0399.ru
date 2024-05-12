import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'
import tw, { styled } from 'twin.macro'

interface Props {
  icon: string
  color: string
  label: string
  href: string
  className?: string
}

const IconWrapper = styled.div<{ color: string }>(({ color }) => [
  tw`p-3 rounded ring-2`,
  tw`ring-white dark:ring-gray-900 dark:group-hover:ring-gray-700`,
  color === 'indigo' &&
    tw`bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200`,
])

const LifeItemCard: React.FC<Props> = ({
  icon,
  color,
  label,
  href,
  className,
}) => (
  <Link
    href={href}
    className={`group flex flex-col items-start space-y-8 p-6 ring-offset-2 hover:bg-gray-100 focus:outline-none focus:ring dark:hover:bg-gray-800 ${className}`}
  >
    <div className="flex flex-row">
      <IconWrapper color={color}>
        <Icon icon={icon} className="size-6" />
      </IconWrapper>
    </div>
    <h3 className="text-lg">{label}</h3>
  </Link>
)

export default LifeItemCard

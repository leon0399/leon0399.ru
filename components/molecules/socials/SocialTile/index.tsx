import { Icon } from '@iconify/react'
import React from 'react'
import tw, { styled } from 'twin.macro'

import type { SocialAccount } from '../../../../types/social-account'

interface Props {
  social: SocialAccount
  className?: string
}

const IconWrapper = styled.div([
  tw`p-2 rounded mr-2 w-10 h-10`,
  tw`group-hover:bg-gray-100 dark:group-hover:bg-gray-800`,
])

const SocialTile: React.FC<Props> = ({ social, className }) => (
  <a
    href={social.url}
    target="_blank"
    rel="noopener noreferrer"
    className={`
    group flex
    flex-row items-center rounded
    text-gray-600 ring-offset-2
    hover:text-gray-700 hover:underline focus:outline-none focus:ring
    dark:text-gray-300 dark:hover:text-gray-200
    ${className}
  `}
  >
    <IconWrapper>
      <Icon icon={social.icon} className="size-6" />
    </IconWrapper>
    <div className="flex grow flex-col">
      <span className="text-sm">{social.label}</span>
      <span className="text-xs">{social.username}</span>
    </div>
  </a>
)

export default SocialTile

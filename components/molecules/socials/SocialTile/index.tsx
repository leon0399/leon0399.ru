import { Icon } from '@iconify/react'
import tw, { styled } from 'twin.macro'

import type { SocialAccount } from "../../../../types/social-account"

interface Props {
  social: SocialAccount
}

const IconWrapper = styled.div([
  tw`p-2 rounded mr-2`,
  tw`group-hover:bg-gray-100 dark:group-hover:bg-gray-800`
])

const SocialTile: React.FC<Props> = ({ social }) => (
  <a href={social.url} target="_blank" rel='noopener noreferrer' className="
    group flex flex-row items-center
    text-gray-600 hover:text-gray-700 hover:underline
    dark:text-gray-300 dark:hover:text-gray-200
    rounded ring-offset-2
    focus:outline-none focus:ring
  ">
    <IconWrapper>
      <Icon icon={social.icon} className='w-6 h-6' />
    </IconWrapper>
    <div className="flex-grow flex flex-col">
      <span className='text-sm'>{ social.label }</span>
      <span className='text-xs'>{ social.username }</span>
    </div>
  </a>
)

export default SocialTile
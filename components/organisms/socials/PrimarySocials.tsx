import tw, { styled } from 'twin.macro'

import { Icon } from '@iconify/react'

import type { FC, ComponentProps } from 'react'

import { primarySocials as socials } from '../../../content/socials'

const SocialsWrapper = styled.ul([tw`flex flex-row space-x-4`])

// Inherit props
type Props = ComponentProps<typeof SocialsWrapper>

export const PrimarySocials: FC<Props> = (props) => (
  <SocialsWrapper {...props}>
    {socials.map((social, i) => (
      <li key={`home-social-${i}`}>
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            block
            p-1
            text-gray-500 hover:text-gray-700
            dark:text-gray-400 hover:dark:text-gray-200
            focus:outline-none focus:ring
            transition-colors
            duration-300
            rounded ring-offset-2
          "
          aria-label={social.label}
        >
          <Icon icon={social.icon} className="block w-6 h-6" />
        </a>
      </li>
    ))}
  </SocialsWrapper>
)

import { Icon } from '@iconify/react'
import type { ComponentProps, FC } from 'react'
import tw, { styled } from 'twin.macro'

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
            rounded
            p-1 text-gray-500
            ring-offset-2 transition-colors
            duration-300 hover:text-gray-700
            focus:outline-none
            focus:ring
            dark:text-gray-400 hover:dark:text-gray-200
          "
          aria-label={social.label}
        >
          <Icon icon={social.icon} className="block size-6" />
        </a>
      </li>
    ))}
  </SocialsWrapper>
)

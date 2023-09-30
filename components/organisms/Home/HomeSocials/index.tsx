import 'twin.macro'

import React, { type FC } from 'react'

import type { SocialAccount } from '../../../../types/social-account'
import SectionHeader from '../../../molecules/SectionHeader'
import SocialTile from '../../../molecules/socials/SocialTile'

interface Props {
  socials: SocialAccount[]
}

const HomeSocials: FC<Props & JSX.IntrinsicElements['section']> = ({
  socials,
  ...props
}) => (
  <section tw="w-full" {...props}>
    <SectionHeader title="Socials" href="/socials" />

    <div tw="grid grid-cols-2 gap-8 md:grid-cols-3">
      {socials.map((social, i) => (
        <SocialTile key={`social-tile-${i}`} social={social} />
      ))}
    </div>
  </section>
)

export default HomeSocials

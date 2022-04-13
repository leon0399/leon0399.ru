import SectionHeader from "../../../molecules/SectionHeader"
import SocialTile from "../../../molecules/socials/SocialTile"

import type { FC } from "react"
import type { SocialAccount } from "../../../../types/social-account"
interface Props {
  id?: string
  className?: string
  socials: SocialAccount[]
}

const HomeSocials: FC<Props> = ({ socials, id, className }) => (
  <section id={id} className={`w-full ${className}`}>
    <SectionHeader title="Socials" href="/socials" />

    <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
      { socials.map((social, i) => (
        <SocialTile key={`social-tile-${i}`} social={social} />
      )) }
    </div>
  </section>
)

export default HomeSocials


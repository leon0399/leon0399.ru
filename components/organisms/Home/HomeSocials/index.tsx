import type { SocialAccount } from "../../../../types/social-account"
import SectionHeader from "../../../molecules/SectionHeader"
import SocialTile from "../../../molecules/socials/SocialTile"

interface Props {
  id?: string
  className?: string
  socials: SocialAccount[]
}

const HomeSocials: React.FC<Props> = ({ socials, id, className }) => (
  <section id={id} className={`w-full ${className}`}>
    <SectionHeader title="Socials" />

    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
      { socials.map((social, i) => (
        <SocialTile key={`social-tile-${i}`} social={social} />
      )) }
    </div>
  </section>
)

export default HomeSocials


import SectionHeader from "../../../molecules/SectionHeader"

interface Props {
  id?: string
  className?: string
}

const HomeTimeline: React.FC<Props> = ({ id, className }) => (
  <section id={id} className={`w-full ${className}`}>
    <SectionHeader title="Timeline" />

  </section>
)

export default HomeTimeline
import LifeItemCard from "../../../molecules/life/LifeItemCard"
import SectionHeader from "../../../molecules/SectionHeader"

interface LifeItem {
  icon: string
  color: string
  label: string
  href: string
}

interface Props {
  items: [ LifeItem, LifeItem, LifeItem ]

  id?: string
  className?: string
}

const HomeLife: React.FC<Props> = ({ items, id, className }) => (
  <article id={id} className={`w-full ${className}`}>
    <SectionHeader title="Life" />

    <div className="grid grid-cols-3 divide-x divide-gray-300">
      { items.map((item, i) => (
        <LifeItemCard key={`life-item-${i}`} { ...item } />
      )) }
    </div>
  </article>
)

export default HomeLife
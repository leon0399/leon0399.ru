import SectionHeader from "../../../molecules/SectionHeader"
import TimelineItem from "../../../molecules/timeline/TimelineItem"

import type { TimelineItem as ITimelineItem } from '../../../molecules/timeline/TimelineItem'

interface Props {
  id?: string
  className?: string
  timeline: ITimelineItem[]
}

const HomeTimeline: React.FC<Props> = ({ timeline, id, className }) => (
  <section id={id} className={`w-full ${className}`}>
    <SectionHeader title="Timeline" />

    <div className="flex flex-col">
      { timeline.map(((item, i) => (
        <TimelineItem key={`home-timeline-item-${i}`} item={item} />
      ))) }
    </div>
  </section>
)

export default HomeTimeline
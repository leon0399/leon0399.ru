import React, { type FC } from 'react'

import SectionHeader from '../../../molecules/SectionHeader'
import type { TimelineItem as ITimelineItem } from '../../../molecules/timeline/TimelineItem'
import TimelineItem from '../../../molecules/timeline/TimelineItem'

interface Props {
  timeline: ITimelineItem[]
}

const HomeTimeline: FC<Props & JSX.IntrinsicElements['section']> = ({
  timeline,
  ...props
}) => (
  <section tw="w-full" {...props}>
    <SectionHeader title="Timeline" href="/timeline" />

    <div tw="flex flex-col">
      {timeline.map((item, i) => (
        <TimelineItem key={`home-timeline-item-${i}`} item={item} />
      ))}
    </div>
  </section>
)

export default HomeTimeline

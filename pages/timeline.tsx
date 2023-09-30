// Utils
// Types
import type { GetStaticProps, NextPage } from 'next'
// Components
import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize'

import PageHeader from '../components/molecules/PageHeader'
import type { TimelineItem as IITimelineItem } from '../components/molecules/timeline/TimelineItem'
import TimelineItem from '../components/molecules/timeline/TimelineItem'
import TheContactBanner from '../components/organisms/TheContactBanner'
// Content
import { timeline as allTimeline } from '../content/timeline'
import type { TimelineItem as ITimelineItem } from '../types/timeline'

interface Props {
  timeline: IITimelineItem[]
}

const Socials: NextPage<Props> = ({ timeline }) => {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Timeline - Leonid Meleshin</title>
      </Head>

      <article className="mx-auto mb-19 max-w-2xl">
        <PageHeader>Timeline</PageHeader>

        <div className="flex flex-col">
          {timeline.map((item, i) => (
            <TimelineItem key={`home-timeline-item-${i}`} item={item} />
          ))}
        </div>
      </article>

      <TheContactBanner />
    </div>
  )
}

export default Socials

export const getStaticProps: GetStaticProps<Props> = async () => {
  const timeline = allTimeline.map(
    async (t: ITimelineItem): Promise<IITimelineItem> => {
      const _t: IITimelineItem = Object.assign<
        ITimelineItem,
        Partial<IITimelineItem>
      >(t, {})

      t.description && (_t.description = await serialize(t.description))
      _t.title = await serialize(t.title)

      return _t
    },
  )

  return {
    props: {
      timeline: await Promise.all(timeline),
    },
  }
}

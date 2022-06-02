// Utils
import { serialize } from 'next-mdx-remote/serialize'

// Components
import Head from 'next/head'

import HomeIntro from '../components/organisms/Home/HomeIntro'
import HomeProjects from '../components/organisms/Home/HomeProjects'
import HomeTimeline from '../components/organisms/Home/HomeTimeline'
import HomeSocials from '../components/organisms/Home/HomeSocials'
import TheContactBanner from '../components/organisms/TheContactBanner'

// Types
import type { GetStaticProps, NextPage } from 'next'

import type { Project } from '../types/project'
import type { TimelineItem as ITimelineItem } from '../types/timeline'
import type { SocialAccount } from '../types/social-account'
import type { TimelineItem } from '../components/molecules/timeline/TimelineItem'

// Content
import { primarySocials, homeSocials } from '../content/socials'
import { frontMatter as allProjects } from './projects/*.mdx'
import { getUserPosts } from '../utils/hashnode'
import { Post } from '../types/hashnode'

interface Props {
  primarySocials: SocialAccount[]
  projects: Project[]
  posts: Post[]
  socials: SocialAccount[]
  timeline: TimelineItem[]
}

const Home: NextPage<Props> = ({ primarySocials, projects, timeline, socials }) => {
  return (
    <>
      <Head>
        <title>Leonid Meleshin</title>
      </Head>

      <HomeIntro id="intro" className="mx-auto mb-19 max-w-2xl" socials={primarySocials} />
      <HomeProjects id="projects" className="my-19 mx-auto max-w-2xl" projects={projects} />
      <HomeTimeline id="timeline" className="my-19 mx-auto max-w-2xl" timeline={timeline} />
      <HomeSocials id="socials" className="my-19 mx-auto max-w-2xl" socials={socials} />
      {/* <HomeLife id="life" className="my-19 mx-auto max-w-2xl" items={[
        {
          icon: 'heroicons-outline:check',
          color: 'indigo',
          label: 'Goals',
          href: '#',
        },
        {
          icon: 'heroicons-outline:check',
          color: 'indigo',
          label: 'Goals',
          href: '#',
        },
        {
          icon: 'heroicons-outline:check',
          color: 'indigo',
          label: 'Goals',
          href: '#',
        },
      ]} /> */}

      <TheContactBanner className="my-19" />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects = (allProjects as unknown as Project[])
    .filter((p) => p.display === undefined || p.display === true)
    .sort((a, b) => a.sort - b.sort)

  const posts = await getUserPosts("leon0399")

  const allTimeline: ITimelineItem[] = [
    {
      title: 'Living in Istanbul, Turkey',
      duration: {
        start: 'May 2022',
        end: 'Present',
      },
      icon: 'heroicons-outline:globe',
      color: 'green',
      homepage: true,
    },
    {
      title: 'Developer at [Innoscripta GmbH](https://www.innoscripta.com/)',
      // description: 'Turnkey websites Development on Wordpress and Laravel. Theme development, layout and integration.',
      tags: ['Laravel', 'React.js'],
      duration: {
        start: 'October 2020',
        end: 'Present',
      },
      icon: 'heroicons-outline:briefcase',
      color: 'gray',
      homepage: true,
    },
    {
      title: 'Born at Moscow, Russia',
      duration: {
        start: '30th April 1999 ',
      },
      icon: 'heroicons-outline:cake',
      color: 'pink',
      homepage: true,
    },
  ]

  const timeline = allTimeline
    .filter(t => t.homepage)
    .map(async (t: ITimelineItem): Promise<TimelineItem> => {
      const _t: TimelineItem = Object.assign<ITimelineItem, Partial<TimelineItem>>(t, {})

      t.description && (_t.description = await serialize(t.description))
      _t.title = await serialize(t.title)

      return _t
    })

  return {
    props: {
      primarySocials,
      projects,
      posts,
      timeline: await Promise.all(timeline),
      socials: homeSocials,
    }
  }
}

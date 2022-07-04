// Utils
import { serialize } from 'next-mdx-remote/serialize'

// Components
import Head from 'next/head'

import HomeIntro from '../components/organisms/Home/HomeIntro'
import HomeProjects from '../components/organisms/Home/HomeProjects'
import HomeBlog from '../components/organisms/Home/HomeBlog'
import HomeTimeline from '../components/organisms/Home/HomeTimeline'
import HomeSocials from '../components/organisms/Home/HomeSocials'
import TheContactBanner from '../components/organisms/TheContactBanner'

// Types
import type { GetStaticProps, NextPage } from 'next'

import type { Project } from '../types/project'
import type { TimelineItem as ITimelineItem } from '../types/timeline'
import type { SocialAccount } from '../types/social-account'
import type { TimelineItem } from '../components/molecules/timeline/TimelineItem'
import type { Post } from '../types/hashnode'

// Content
import { primarySocials, homeSocials } from '../content/socials'
import allProjects from '../content/projects'
import { timeline as allTimeline } from '../content/timeline'
import { getUserPosts } from '../utils/hashnode'

interface Props {
  primarySocials: SocialAccount[]
  projects: Project[]
  posts: Post[]
  socials: SocialAccount[]
  timeline: TimelineItem[]
}

const Home: NextPage<Props> = ({
  primarySocials,
  projects,
  timeline,
  socials,
  posts,
}) => {
  const pinProjects = projects.filter((p) => p.pin)
  const otherProjects = projects
    .filter((p) => !p.pin)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3 - pinProjects.length)

  return (
    <div className="container">
      <Head>
        <title>Leonid Meleshin</title>
      </Head>

      <HomeIntro
        id="intro"
        className="mx-auto mb-19 max-w-2xl"
        socials={primarySocials}
      />
      <HomeProjects
        id="projects"
        className="my-19 mx-auto max-w-2xl"
        projects={[...pinProjects, ...otherProjects]}
      />
      <HomeBlog id="blog" className="my-19 mx-auto max-w-2xl" posts={posts} />
      <HomeTimeline
        id="timeline"
        className="my-19 mx-auto max-w-2xl"
        timeline={timeline}
      />
      <HomeSocials
        id="socials"
        className="my-19 mx-auto max-w-2xl"
        socials={socials}
      />
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
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects = allProjects.filter(
    (p) => p.display === undefined || p.display === true,
  )

  const posts = await getUserPosts('leon0399')

  const timeline = allTimeline
    .filter((t) => t.homepage)
    .map(async (t: ITimelineItem): Promise<TimelineItem> => {
      const _t: TimelineItem = Object.assign<
        ITimelineItem,
        Partial<TimelineItem>
      >(t, {})

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
    },
  }
}

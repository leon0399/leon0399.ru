// Utils
import { serialize } from 'next-mdx-remote/serialize'
import { getPlaiceholder } from 'plaiceholder'

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
import { homeSocials } from '../content/socials'
import allProjects from '../content/projects'
import { timeline as allTimeline } from '../content/timeline'
import { getUserPosts } from '../utils/hashnode'

interface Props {
  projects: Project[]
  posts: Post[]
  socials: SocialAccount[]
  timeline: TimelineItem[]
}

const Home: NextPage<Props> = ({ projects, timeline, socials, posts }) => {

  return (
    <div className="container mx-auto">
      <Head>
        <title>Leonid Meleshin</title>

        <meta
          name="description"
          content="Hi there! My name is Leonid Meleshin, and I am a software engineer and researcher, travelling across the world."
        />

        <meta name="og:title" content="Leonid Meleshin" />
        <meta name="og:site_name" content="Leonid Meleshin" />
        <meta
          name="og:description"
          content="Hi there! My name is Leonid Meleshin, and I am a software engineer and researcher, travelling across the world."
        />

        <meta name="twitter:title" content="Leonid Meleshin" />
        <meta
          name="twitter:description"
          content="Hi there! My name is Leonid Meleshin, and I am a software engineer and researcher, travelling across the world."
        />
      </Head>

      <HomeIntro id="intro" className="mx-auto mb-19 max-w-2xl" />
      <HomeProjects
        id="projects"
        className="my-19 mx-auto max-w-2xl"
        projects={projects.slice(0, 3)}
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

  const posts = (await getUserPosts('leon0399')).map(async (post) => {
    const { base64, blurhash } = await getPlaiceholder(post.coverImage)

    return {
      ...post,
      coverImageBase64: base64,
      coverImageBlurhash: blurhash,
    }
  })

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
      projects,
      posts: await Promise.all(posts),
      timeline: await Promise.all(timeline),
      socials: homeSocials,
    },
  }
}

// Utils
// Types
import type { GetStaticProps, NextPage } from 'next'
// Components
import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize'
import { getPlaiceholder } from 'plaiceholder'
import tw, { css } from 'twin.macro'

import type { TimelineItem } from '../components/molecules/timeline/TimelineItem'
import {
  HomeBlog,
  HomeIntro,
  HomeProjects,
  HomeSocials,
  HomeTimeline,
  // HomeLife,
} from '../components/organisms/Home'
import TheContactBanner from '../components/organisms/TheContactBanner'
import allProjects from '../content/projects'
// Content
import { homeSocials } from '../content/socials'
import { timeline as allTimeline } from '../content/timeline'
import type { Post } from '../types/hashnode'
import type { Project } from '../types/project'
import type { SocialAccount } from '../types/social-account'
import type { TimelineItem as ITimelineItem } from '../types/timeline'
import { getUserPosts } from '../utils/hashnode'

interface Props {
  projects: Project[]
  posts: Post[]
  socials: SocialAccount[]
  timeline: TimelineItem[]
}

const sectionStyles = css`
  ${tw`my-19 first:mt-0 mx-auto max-w-2xl`}
`

const Home: NextPage<Props> = ({ projects, timeline, socials, posts }) => {
  return (
    <div tw="container mx-auto">
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

      <HomeIntro id="intro" css={[sectionStyles]} />
      <HomeProjects
        id="projects"
        css={[sectionStyles]}
        projects={projects.slice(0, 3)}
      />
      <HomeBlog id="blog" css={[sectionStyles]} posts={posts} />
      <HomeTimeline id="timeline" css={[sectionStyles]} timeline={timeline} />
      <HomeSocials id="socials" css={[sectionStyles]} socials={socials} />
      {/* <HomeLife id="life" css={[sectionStyles]} items={[
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
        ]}
      />*/}

      <TheContactBanner tw="my-19" />
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects = allProjects.filter(
    (p) => p.display === undefined || p.display === true,
  )

  const posts = (await getUserPosts('leon0399'))
    .slice(0, 3)
    .map(async (post) => {
      const plaiceholdrer = post.coverImage
        ? await getPlaiceholder(post.coverImage)
        : null

      return {
        ...post,
        coverImageBase64: plaiceholdrer?.base64 ?? null,
        coverImageBlurhash: plaiceholdrer?.blurhash ?? null,
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

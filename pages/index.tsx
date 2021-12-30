import { serialize } from 'next-mdx-remote/serialize'

import Head from 'next/head'

import HomeIntro from '../components/organisms/Home/HomeIntro'
import HomeProjects from '../components/organisms/Home/HomeProjects'
import HomeTimeline from '../components/organisms/Home/HomeTimeline'

import type { InferGetStaticPropsType, NextPage } from 'next'

import type { SocialAccount } from '../types/social-account'
import type { Project } from '../types/project'
import type { TimelineItem as ITimelineItem } from '../types/timeline'

import type { TimelineItem } from '../components/molecules/timeline/TimelineItem'

import { frontMatter as allProjects } from './projects/*.mdx'
import HomeSocials from '../components/organisms/Home/HomeSocials'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ socials, projects, timeline }) => {
  return (
    <>
      <Head>
        <title>Leonid Meleshin</title>
      </Head>

      <HomeIntro id="intro" className="mx-auto max-w-2xl mb-19" socials={socials} />
      <HomeProjects id="projects" className="mx-auto max-w-2xl my-19" projects={projects} />
      <HomeTimeline id="timeline" className="mx-auto max-w-2xl my-19" timeline={timeline} />
      <HomeSocials id="socials" className="mx-auto max-w-2xl my-19" socials={socials} />
    </>
  )
}

export default Home

export const getStaticProps = async () => {
  const socials: SocialAccount[] = [
    {
      icon: 'heroicons-solid:mail',
      url: 'mailto:hello@leon0399.ru',
      label: 'Email',
      username: 'hello@leon0399.ru',
    },
    {
      icon: 'fa-brands:telegram',
      url: 'https://t.me/leon0399',
      label: 'Telegram',
      username: '@leon0399',
    },
    {
      icon: 'fa-brands:linkedin',
      url: 'https://www.linkedin.com/in/leonid-meleshin-9604111a9/',
      label: 'LinkedIn',
      username: '@leon0399',
    },
    {
      icon: 'fa-brands:github',
      url: 'https://github.com/leon0399',
      label: 'GitHub',
      username: '@leon0399',
    },
  ]

  const allTimeline: ITimelineItem[] = [
    {
      title: 'Living in Munich, Germany',
      duration: {
        start: 'January 2022',
        end: 'Present',
      },
      icon: 'heroicons-outline:globe',
      color: 'green',
      homepage: true,
    },
    {
      title: 'Senior Developer at [Innoscripta GmbH](https://www.innoscripta.com/)',
      description: 'Turnkey websites Development on Wordpress and Laravel. Theme development, layout and integration.',
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
    .map(async (t: ITimelineItem) => {
      const _t: TimelineItem = Object.assign<ITimelineItem, Partial<TimelineItem>>(t, {})

      t.description && (_t.description = await serialize(t.description))
      _t.title = await serialize(t.title)

      return _t
    })

  const projects = allProjects as unknown as Project[]
    // @ts-ignore
    // .map((v: Project) => {
    //   v.description = ...

    //   return v
    // })

  return {
    props: {
      socials,
      projects,
      timeline: await Promise.all(timeline),
    }
  }
}
import type { NextPage } from 'next'

import Head from 'next/head'

import HomeIntro from '../components/organisms/Home/HomeIntro'
import HomeProjects from '../components/organisms/Home/HomeProjects'
import HomeTimeline from '../components/organisms/Home/HomeTimeline'

import type { SocialAccount } from '../types/social-account'
import type { Project } from '../types/project'

import { frontMatter as allProjects } from './projects/*.mdx'

interface Props {
  projects: Project[]
  socials: Record<string, SocialAccount>
}

const Home: NextPage<Props> = ({ projects, socials }) => {
  return (
    <>
      <Head>
        <title>Leonid Meleshin</title>
      </Head>

      <HomeIntro id="intro" className="mx-auto max-w-2xl mb-19" socials={socials} />
      <HomeProjects id="projects" className="mx-auto max-w-2xl my-19" projects={projects} />
      <HomeTimeline id="timeline" className="mx-auto max-w-2xl my-19" />
    </>
  )
}

export default Home

export const getStaticProps = async () => {
  const socials: Record<string, SocialAccount> = {
    email: {
      icon: 'heroicons-solid:mail',
      url: 'mailto:hello@leon0399.ru',
      label: 'Email',
    },
    telegram: {
      icon: 'fa-brands:telegram',
      url: 'https://t.me/leon0399',
      label: 'Telegram',
    },
    linkedin: {
      icon: 'fa-brands:linkedin',
      url: 'https://www.linkedin.com/in/leonid-meleshin-9604111a9/',
      label: 'LinkedIn',
    },
    github: {
      icon: 'fa-brands:github',
      url: 'https://github.com/leon0399',
      label: 'GitHub',
    },
  }

  return {
    props: {
      socials,
      projects: allProjects,
    }
  }
}
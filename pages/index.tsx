import type { NextPage } from 'next'

import Head from 'next/head'

import EmailIcon from '~icons/heroicons-solid/mail.jsx'
import TelegramIcon from '~icons/fa-brands/telegram.jsx'
import LinkedInIcon from '~icons/fa-brands/linkedin.jsx'
import GitHubIcon from '~icons/fa-brands/github.jsx'

import Layout from '../components/layout'
import HomeIntro from '../components/organisms/Home/HomeIntro'
import { SocialAccount } from '../types/social-account'

const Home: NextPage = () => {
  const socials: Record<string, SocialAccount> = {
    email: {
      icon: EmailIcon,
      url: 'mailto:hello@leon0399.ru',
      label: 'Email',
    },
    telegram: {
      icon: TelegramIcon,
      url: 'https://t.me/leon0399',
      label: 'Telegram',
    },
    linkedin: {
      icon: LinkedInIcon,
      url: 'https://www.linkedin.com/in/leonid-meleshin-9604111a9/',
      label: 'LinkedIn',
    },
    github: {
      icon: GitHubIcon,
      url: 'https://github.com/leon0399',
      label: 'GitHub',
    },
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Leonid Meleshin</title>
        </Head>

        <HomeIntro id="intro" className="mx-auto max-w-2xl my-18" socials={socials} />
      </Layout>
    </>
  )
}

export default Home
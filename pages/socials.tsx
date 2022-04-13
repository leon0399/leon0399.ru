// Components
import Head from 'next/head'
import PageHeader from '../components/molecules/PageHeader'
import SocialTile from '../components/molecules/socials/SocialTile'
import TheContactBanner from '../components/organisms/TheContactBanner'

// Types
import type { GetStaticProps, NextPage } from 'next'
import type { SocialAccount } from '../types/social-account'

// Content
import allSocials from '../content/socials'

interface Props {
  socials: SocialAccount[]
}

const Socials: NextPage<Props> = ({ socials }) => {
  return (
    <>
      <Head>
        <title></title>
      </Head>

      <article className='mx-auto mb-19 max-w-2xl'>
        <PageHeader>Socials</PageHeader>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          { socials.map((social, i) => (
            <SocialTile key={`social-tile-${i}`} social={social} />
          )) }
        </div>
      </article>

      <TheContactBanner />
    </>
  )
}

export default Socials

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    socials: allSocials,
  }
})

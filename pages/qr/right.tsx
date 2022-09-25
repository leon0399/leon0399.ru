// Utils
import tw, { styled } from 'twin.macro'

// Components
import Head from 'next/head'

// Types
import type { NextPage, GetStaticProps } from 'next'
import type { FC, ComponentProps } from 'react'
import type { SocialAccount } from '../../types/social-account'

// Content
import { primarySocials, homeSocials } from '../../content/socials'
import { PrimarySocials } from '../../components/organisms/socials/PrimarySocials'

const Section = styled.section(tw`w-full`)
type SectionProps = ComponentProps<typeof Section> & {
  socials: SocialAccount[]
}

const Intro: FC<SectionProps> = (props) => (
  <Section {...props}>
    <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
      Wow! You scanned me!
    </h1>
    <p className="my-4 leading-[1.75] text-gray-800 dark:text-gray-200">
      Welcome to my hand! My name is <strong>Leonid Meleshin</strong>.
    </p>
    <p className="my-4 leading-[1.75] text-gray-800 dark:text-gray-200">
      Feel free to befriend me on any social network or add me to your contact
      list.
    </p>
    <p className="my-4 leading-[1.75] text-gray-800 dark:text-gray-200">
      I hope nothing bad happend, but anyway, there is some useful info below.
    </p>
    <PrimarySocials className="my-6" />
  </Section>
)

const EmergencySection = styled.section(tw`w-full py-6 bg-[#B22432]`)
type EmergencySectionProps = ComponentProps<typeof EmergencySection>
const EmergencyInfo: FC<EmergencySectionProps> = (props) => (
  <EmergencySection {...props}>
    <div className="container mx-auto flex max-w-2xl flex-col gap-6 text-white md:flex-row">
      <div
        className="
          flex
          flex-row
          border-4
          border-white
          text-center text-4xl
          font-bold md:w-1/2
        "
      >
        <div className="flex-1 border-r-4 border-white py-4 px-8">0(I)</div>
        <div className="py-4 px-8">Rh+</div>
      </div>
      <div className="md:w-1/2">
        <ul className="text-lg">
          <li>
            <strong>No</strong> known allergies
          </li>
          <li>
            <strong>No</strong> medications
          </li>
          <li>
            Conditions: <strong>Hypertension</strong>
          </li>
        </ul>
      </div>
    </div>
  </EmergencySection>
)

interface PageProps {
  primarySocials: SocialAccount[]
}

const QRCodeRight: NextPage<PageProps> = ({ primarySocials }) => {
  return (
    <>
      <Head>
        <title>My right hand</title>
      </Head>

      <Intro
        id="intro"
        className="container mx-auto mb-19 max-w-2xl"
        socials={primarySocials}
      />

      <EmergencyInfo id="emergency" />
    </>
  )
}

export default QRCodeRight

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  return {
    props: {
      primarySocials,
    },
  }
}

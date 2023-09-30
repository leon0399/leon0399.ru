// Utils
// Types
import type { GetStaticProps, NextPage } from 'next'
// Components
import Head from 'next/head'
import type { ComponentProps, FC } from 'react'
import tw, { styled } from 'twin.macro'

import { PrimarySocials } from '../../components/organisms/socials/PrimarySocials'
// Content
import { primarySocials } from '../../content/socials'
import type { SocialAccount } from '../../types/social-account'

type SectionProps = {
  socials: SocialAccount[]
}

const Intro: FC<SectionProps & JSX.IntrinsicElements['section']> = ({
  socials,
  ...props
}) => (
  <section tw="w-full" {...props}>
    <h1 tw="mb-4 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
      Wow! You scanned me!
    </h1>
    <p tw="my-4 leading-[1.75] text-gray-800 dark:text-gray-200">
      Welcome to my hand! My name is <strong>Leonid Meleshin</strong>.
    </p>
    <p tw="my-4 leading-[1.75] text-gray-800 dark:text-gray-200">
      Feel free to befriend me on any social network or add me to your contact
      list.
    </p>
    <p tw="my-4 leading-[1.75] text-gray-800 dark:text-gray-200">
      I hope nothing bad happend, but anyway, there is some useful info below.
    </p>
    <PrimarySocials tw="my-6" />
  </section>
)

const EmergencyInfo: FC<JSX.IntrinsicElements['section']> = (props) => (
  <section tw="w-full bg-[#B22432] py-6" {...props}>
    <div tw="max-w-2xl! container mx-auto flex flex-col gap-6 text-white md:flex-row">
      <div
        tw="
          flex flex-row
          border-4 border-white
          text-center text-4xl font-bold
          md:w-1/2
        "
      >
        <div tw="flex-1 border-r-4 border-white px-8 py-4">0(I)</div>
        <div tw="px-8 py-4">Rh+</div>
      </div>
      <div tw="md:w-1/2">
        <ul tw="text-lg">
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
  </section>
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
        tw="max-w-2xl! container mx-auto mb-19"
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

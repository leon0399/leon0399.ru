import 'react-typist/dist/Typist.css'
import 'twin.macro'

import Link from 'next/link'
import React, { type FC } from 'react'

import Typical from '../../../atoms/Typical'
import { PrimarySocials } from '../../socials/PrimarySocials'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const words = ['Developer', 'Builder', 'Engineer', 'Researcher']

const HomeIntro: FC<Props & JSX.IntrinsicElements['section']> = (props) => (
  <section tw="w-full" {...props}>
    <h1 tw="mb-4 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
      I’m&nbsp;the{' '}
      <Typical<'span'>
        steps={words.flatMap((word) => [word, 800])}
        loop={Infinity}
        wrapper="span"
      />
    </h1>
    <p tw="my-4 leading-[1.75] text-gray-800 dark:text-gray-200">
      Hi there! My name is <strong>Leonid Meleshin</strong>, and I am a{' '}
      <Link href="/projects" tw="underline">
        builder
      </Link>{' '}
      &amp;{' '}
      <a
        href="https://github.com/leon0399"
        target="_blank"
        rel="noopener noreferrer"
        tw="underline"
      >
        hacker
      </a>
      , travelling across the world.
    </p>
    <PrimarySocials tw="my-6" />
  </section>
)

export default HomeIntro

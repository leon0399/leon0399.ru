import 'react-typist/dist/Typist.css'

import Link from 'next/link'
import Typical from 'react-typical'

import type { FC } from 'react'
import { PrimarySocials } from '../../socials/PrimarySocials'

interface Props {
  id?: string
  className?: string
}

const words = ['Developer', 'Builder', 'Engineer', 'Researcher']

const HomeIntro: FC<Props> = ({ className, ...props }) => (
  <section className={`w-full ${className}`} {...props}>
    <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
      I’m&nbsp;the{' '}
      <Typical
        steps={words.flatMap((word) => [word, 800])}
        loop={Infinity}
        wrapper="span"
      />
    </h1>
    <p className="my-4 leading-[1.75] text-gray-800 dark:text-gray-200">
      Hi there! My name is <strong>Leonid Meleshin</strong>, and I am a{' '}
      <Link href="/projects" className="underline">
        builder
      </Link>{' '}
      &amp;{' '}
      <a
        href="https://github.com/leon0399"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        hacker
      </a>
      , travelling across the world.
    </p>
    <PrimarySocials className="my-6" />
  </section>
)

export default HomeIntro

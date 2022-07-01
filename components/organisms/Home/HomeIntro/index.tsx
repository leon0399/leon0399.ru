import 'react-typist/dist/Typist.css'

import Link from 'next/link'
import { Icon } from '@iconify/react'
import Typical from 'react-typical'

import type { FC } from 'react'
import type { SocialAccount } from '../../../../types/social-account'

interface Props {
  id?: string
  className?: string
  socials: SocialAccount[]
}

const words = ['Developer', 'Builder', 'Engineer', 'Developer']

const HomeIntro: FC<Props> = ({ socials, className, ...props }) => (
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
      <Link href="/projects">
        <a className="underline">builder</a>
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
      , currently located in <strong>Istanbul,&nbsp;Turkey</strong>,{' '}
      <a
        href="https://www.timeanddate.com/worldclock/converter.html?p1=224&amp;p2=179&amp;p3=168&amp;p4=166&amp;p5=107"
        target="_blank"
        rel="noopener noreferrer"
        className="
          text-primary-600 hover:text-primary-700
          dark:text-primary-400 dark:hover:text-primary-300
        "
      >
        UTC+3 timezone
      </a>
    </p>
    <ul className="flex flex-row my-6 space-x-4">
      {socials.map((social, i) => (
        <li key={`home-social-${i}`}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              block
              p-1
              text-gray-500 hover:text-gray-700
              dark:text-gray-400 hover:dark:text-gray-200
              focus:outline-none focus:ring
              transition-colors
              duration-300
              rounded ring-offset-2
            "
            aria-label={social.label}
          >
            <Icon icon={social.icon} className="block w-6 h-6" />
          </a>
        </li>
      ))}
    </ul>
  </section>
)

export default HomeIntro

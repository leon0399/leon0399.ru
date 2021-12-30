import Link from "next/link"
import { Icon } from '@iconify/react';
import type { SocialAccount } from "../../../../types/social-account"

interface Props {
  id?: string
  className?: string
  socials: Record<string, SocialAccount>
}

const HomeIntro: React.FC<Props> = ({ id, className, socials }) => (
  <section id={id} className={`w-full ${className}`}>
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
      I’m&nbsp;the
      Developer
    </h1>
    <p className="leading-[1.75] text-gray-800 my-4">
      Hi there! My name is{' '}
      <strong>Leonid Meleshin</strong>, and I am a{' '}
      <Link href="#">
        <a className="underline">builder</a>
      </Link>{' '}
      &amp;{' '}
      <a href="https://github.com/leon0399" target="_blank" rel="noopener noreferrer" className="underline">
        hacker
      </a>{' '}
      from{' '}
      <a
        href="https://www.timeanddate.com/worldclock/converter.html?p1=224&amp;p2=179&amp;p3=168&amp;p4=166"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-600 hover:text-primary-700"
      >
        Moscow,&nbsp;Russia
      </a>
    </p>
    <ul className="flex flex-row space-x-4 my-6">
      { Object.entries(socials).map(([platform, social]) => (
        <li
          key={`home-social-${platform}`}
        >
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              block
              text-gray-500
              hover:text-gray-700
              transition-colors
              duration-300
              p-1
            "
            aria-label={social.label}
          >
            <Icon icon={social.icon} className="block w-6 h-6" />
          </a>
        </li>
      )) }
    </ul>
  </section>
)

export default HomeIntro
import { useMemo } from 'react'
import tw, { styled } from 'twin.macro'

import Link from 'next/link'
import { Icon } from '@iconify/react'
import { PrimarySocials } from '../socials/PrimarySocials'

import type { FC } from 'react'
import type { SocialAccount } from '../../../types/social-account'

const commitSha =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
  '0000000000000000000000000000000000000000'

const Footer = styled.footer([
  tw`w-full bg-gray-200 px-6 py-8 mt-19 flex flex-col justify-center items-center space-y-4`,
  tw`dark:bg-gray-800`,
])

interface FooterMenuItemProps {
  href: string
  title: string
}

const FooterMenuItem: FC<FooterMenuItemProps> = ({ href, title, ...props }) => {
  const outer: boolean = useMemo(() => href.startsWith('http'), [href])

  return (
    <li className="py-2 px-6" {...props}>
      <Link href={href}>
        <a
          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
          target={outer ? '_blank' : undefined}
          rel={outer ? 'nofollow' : undefined}
        >
          {title}
        </a>
      </Link>
    </li>
  )
}

interface Props {
  socials: SocialAccount[]
}

const TheFooter: React.FC<Props> = ({ socials }) => (
  <Footer>
    <nav>
      <ul className="flex flex-row flex-wrap justify-center">
        <FooterMenuItem href="/about" title="About" />
        <FooterMenuItem href="https://blog.leon0399.ru/" title="Blog" />
        <FooterMenuItem href="/projects" title="Projects" />
        <FooterMenuItem href="/timeline" title="Timeline" />
        <FooterMenuItem href="/contacts" title="Contacts" />
        <FooterMenuItem href="/socials" title="Socials" />
      </ul>
    </nav>

    <nav>
      <PrimarySocials />
    </nav>

    <p className="text-xs text-gray-800 dark:text-gray-400">
      &copy; Leonid Meleshin. All rights reserved &bull;{' '}
      <a
        href={`https://github.com/leon0399/leon0399.ru/commit/${commitSha}`}
        className="font-mono hover:text-gray-800 dark:hover:text-gray-300 hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        {commitSha.substring(0, 7)}
      </a>
    </p>
  </Footer>
)

export default TheFooter

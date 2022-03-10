import Link from "next/link"
import React from "react"
import { Icon } from '@iconify/react'

import tw, { styled } from "twin.macro"

import type { SocialAccount } from "../../../types/social-account"

const commitSha =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
  '0000000000000000000000000000000000000000'

const Footer = styled.footer([
  tw`w-full bg-gray-200 px-6 py-8 mt-19 flex flex-col justify-center items-center space-y-4`,
  tw`dark:bg-gray-800`
])

interface FooterMenuItemProps {
  href: string
  title: string
}

const FooterMenuItem: React.FC<FooterMenuItemProps> = ({ href, title, ...props }) => (
  <li className="py-2 px-6" {...props}>
    <Link href={href}>
      <a className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">{ title }</a>
    </Link>
  </li>
)

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
      <ul className="flex flex-row space-x-4">
        { socials.map((social, i) => (
          <li
            key={`home-social-${i}`}
          >
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
        )) }
      </ul>
    </nav>

    <p className="text-xs text-gray-800 dark:text-gray-400">
      &copy; Leonid Meleshin. All rights reserved
      {' '} &bull; {' '}
      <a
        href={`https://github.com/leon0399/leon0399.ru/commit/${commitSha}`}
        className="font-mono hover:text-gray-800 dark:hover:text-gray-300 hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        { commitSha.substring(0, 7) }
      </a>
    </p>
  </Footer>
);

export default TheFooter;

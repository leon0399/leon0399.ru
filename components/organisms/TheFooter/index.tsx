import Link from "next/link"
import React from "react"

import tw, { styled } from "twin.macro"

const commitSha =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
  '0000000000000000000000000000000000000000'

const Footer = styled.footer([
  tw`w-full bg-gray-200 py-8 mt-19 flex flex-col justify-center items-center space-y-4`,
])

interface FooterMenuItemProps {
  href: string
  title: string
}

const FooterMenuItem: React.FC<FooterMenuItemProps> = ({ href, title, ...props }) => (
  <li {...props}>
    <Link href={href}>
      <a className="text-gray-600 hover:text-gray-800">{ title }</a>
    </Link>
  </li>
)

const TheFooter: React.FC = () => (
  <Footer>
    <nav>
      <ul className="flex flex-col space-x-6 md:flex-row">
        <FooterMenuItem href="/about" title="About" />
        <FooterMenuItem href="https://blog.leon0399.ru/" title="Blog" />
        <FooterMenuItem href="/projects" title="Projects" />
        <FooterMenuItem href="/timeline" title="Timeline" />
        <FooterMenuItem href="/contacts" title="Contacts" />
        <FooterMenuItem href="/socials" title="Socials" />
      </ul>
    </nav>

    {/* <nav>
      <ul></ul>
    </nav> */}

    <p className="text-xs text-gray-800">
      &copy; Leonid Meleshin. All rights reserved
      {' '} &bull; {' '}
      <a href={`https://github.com/leon0399/leon0399.ru/commit/${commitSha}`} className="font-mono hover:underline">{ commitSha.substring(0, 7) }</a>
    </p>
  </Footer>
);

export default TheFooter;

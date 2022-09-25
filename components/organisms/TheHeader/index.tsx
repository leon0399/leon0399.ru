import Link from 'next/link'
import React from 'react'
import tw, { styled } from 'twin.macro'
import Tag from '../../atoms/Tag'

const Header = styled.header([
  tw`sticky top-0 z-30 filter backdrop-filter backdrop-blur-lg`,
  tw`bg-white saturate-150 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 dark:saturate-100`,
])

const TheHeader: React.FC = () => (
  <Header>
    <div className="container my-8 mx-auto flex max-w-2xl flex-row p-6">
      <Link href="/">
        <a className="text-2xl">
          <div className="inline-flex items-center">
            Leonid Meleshin
            <Tag className="mt-1 ml-3 bg-gray-200 font-mono font-medium">
              beta
            </Tag>
          </div>
        </a>
      </Link>
    </div>
  </Header>
)

export default TheHeader

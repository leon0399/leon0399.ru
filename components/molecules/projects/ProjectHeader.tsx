import Image from 'next/image'
import Tag from '../../atoms/Tag'

// Types
import type { FC, ReactNode } from 'react'

interface Props {
  title: ReactNode
  category: string
  tags?: string[]
  logo?: string
  url: string
  displayUrl?: string
}

const ProjectHeader: FC<Props> = ({
  title,
  category,
  logo,
  tags,
  url,
  displayUrl,
}) => {
  return (
    <header
      className="
        flex flex-col md:flex-row
        items-start
        space-y-4 md:space-y-0 md:space-x-4
        mt-8 mb-12
      "
    >
      {logo ? (
        <Image
          src={logo}
          width={84}
          height={84}
          className="w-[84px] h-[84px] rounded"
          alt="Project logo"
        />
      ) : (
        <div className="w-[84px] h-[84px] bg-gray-200 rounded" />
      )}
      <div>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-4 text-xs leading-relaxed">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                underline hover:text-gray-900 dark:hover:text-gray-200
              "
            >
              {displayUrl ||
                url
                  ?.replace(/^https?:\/\//, '')
                  .split('?')[0]
                  .replace(/^[\\/]+|[\\/]+$/g, '')}
            </a>

            <span
              className="
                before:content-['·'] before:pr-4 before:no-underline
              "
            >
              {category}
            </span>
          </div>

          {Array.isArray(tags) && tags.length && (
            <div className="flex flex-row">
              {tags.map((tag, i) => (
                <Tag key={i} className="ml-3">
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default ProjectHeader

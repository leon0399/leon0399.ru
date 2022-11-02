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
        mt-8 mb-12 flex
        flex-col overflow-hidden
        items-start space-y-4 md:flex-row
        md:space-y-0 md:space-x-4
      "
    >
      {logo ? (
        <Image
          src={logo}
          width={84}
          height={84}
          className="h-[84px] w-[84px] rounded"
          alt="Project logo"
        />
      ) : (
        <div className="h-[84px] w-[84px] rounded bg-gray-200" />
      )}
      <div className="overflow-hidden max-w-full">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
        <div className="flex flex-row justify-between overflow-hidden">
          <div className="flex flex-row space-x-4 text-xs leading-relaxed truncate">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                underline hover:text-gray-900 dark:hover:text-gray-200 truncate
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
                before:pr-4 before:no-underline before:content-['·']
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
  );
}

export default ProjectHeader

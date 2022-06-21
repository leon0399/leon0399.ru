import { FC, ReactNode } from "react";
import Tag from "../../atoms/Tag";

interface Props {
  title: ReactNode
  category: string
  tags?: string[]
  url: string
  displayUrl?: string
}

const ProjectHeader: FC<Props> = ({ title, category, tags, url, displayUrl }) =>{
  return (
    <header className="mb-12">
      <h1 className="mt-8 mb-4 text-4xl font-bold md:text-5xl">{ title }</h1>
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
            { displayUrl || url?.replace(/^https?:\/\//, '').split('?')[0].replace(/^[\\/]+|[\\/]+$/g, '') }
          </a>

          <span
            className="
              before:content-['·'] before:pr-4 before:no-underline
            "
          >
            { category }
          </span>
        </div>

        { Array.isArray(tags) && tags.length && (
          <div className="flex flex-row">
            { tags.map((tag, i) => <Tag key={i} className="ml-3">{ tag }</Tag>) }
          </div>
        ) }
      </div>
    </header>
  )
}

export default ProjectHeader

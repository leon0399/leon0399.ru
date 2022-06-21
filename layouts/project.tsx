import { FunctionComponent } from 'react'
import Tag from '../components/atoms/Tag'
import { Project } from '../types/project'

interface Props {
  project: Project
}

const Layout: FunctionComponent<Props> = ({ children, project }) => {
  return (
    <article className='mx-auto max-w-2xl'>
      <header className='mb-12'>
        <h1 className='mt-8 mb-4 text-4xl font-bold md:text-5xl'>
          { project.title }
        </h1>

        <div className='flex flex-row justify-between'>
          <div className="flex flex-row space-x-4 text-xs leading-relaxed">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                underline hover:text-gray-900 dark:hover:text-gray-200
              "
            >
              { project.displayUrl || project.url.replace(/^https?:\/\//, '').split('?')[0].replace(/^[\\/]+|[\\/]+$/g, '') }
            </a>

            <span
              className="before:content-['·'] before:pr-4 before:no-underline"
            >
              { project.category }
            </span>
          </div>

          { Array.isArray(project.tags) && project.tags.length && (
            <div className="flex flex-row space-x-3">
              { project.tags.map((tag, i) => <Tag key={i}>{ tag }</Tag>) }
            </div>
          ) }
        </div>
      </header>

      {children}
    </article>
  )
}

export default Layout

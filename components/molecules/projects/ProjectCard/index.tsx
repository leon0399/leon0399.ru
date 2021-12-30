import type { Project } from "../../../../types/project"
import Tag from "../../../atoms/Tag"

interface Props {
  className: string
  project: Project
}

const ProjectCard: React.FC<Props> = ({ project, className }) => (
  <article
    className={`
      relative
      flex flex-row
      py-4
      px-6
      gap-4
      border
      rounded-lg
      bg-white dark:bg-gray-900
      text-gray-600 dark:text-gray-300
      transition-colors
      duration-300
      shadow-lg
      ${className}
    `}
  >
    <div className="hidden md:inline-block flex-shrink-0">
      <div className="w-16 h-16 rounded bg-gray-200" />
    </div>
    <div className="flex-grow">
      <h3 className="text-lg font-bold tracking-tight">{ project.title }</h3>
      <p className="text-sm leading-5 text-gray-600 dark:text-gray-400 line-clamp-3">{ project.description }</p>
      { Array.isArray(project.tags) && project.tags.length && (
        <div className="flex flex-row space-x-3 my-2">
          { project.tags.map((tag, i) => <Tag key={i} >{ tag }</Tag>) }
        </div>
      ) }
      <div className="flex flex-row space-x-4 text-xs leading-relaxed">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          { project.displayUrl || project.url.replace(/^https?:\/\//, '').split('?')[0].replace(/^[\\/]+|[\\/]+$/g, '') }
        </a>

        <span>·</span>

        <span>{ project.category }</span>
      </div>
    </div>
  </article>
)

export default ProjectCard
import type { Project } from "../../../../types/project"
import Tag from "../../../atoms/Tag"

import tw, { styled } from 'twin.macro'
interface Props {
  className: string
  project: Project
}

const ProjectContainer = styled.article([
  tw`relative flex flex-row py-4 px-6 gap-4 border rounded-lg shadow-lg`,
  tw`transition-colors duration-300`,
  tw`bg-white dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700`,
])

const ProjectCard: React.FC<Props> = ({ project, className }) => (
  <ProjectContainer className={className}>
    <div className="hidden md:inline-block flex-shrink-0">
      <div className="w-16 h-16 rounded bg-gray-200" />
    </div>
    <div className="flex-grow">
      <h3 className="text-lg font-bold tracking-tight">{ project.title }</h3>
      <p className="text-sm leading-5 text-gray-600 dark:text-gray-400 line-clamp-3">{ project.description }</p>
      { Array.isArray(project.tags) && project.tags.length && (
        <div className="flex flex-row space-x-3 my-2">
          { project.tags.map((tag, i) => <Tag key={i}>{ tag }</Tag>) }
        </div>
      ) }
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
          className="
            before:content-['·'] before:pr-4 before:no-underline
          "
        >
          { project.category }
        </span>
      </div>
    </div>
  </ProjectContainer>
)

export default ProjectCard
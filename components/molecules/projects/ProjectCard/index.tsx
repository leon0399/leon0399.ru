import type { Project } from "../../../../types/project"
import Tag from "../../../atoms/Tag"

import tw, { styled } from 'twin.macro'
import React from "react"
import Image from "next/image"
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
    <div className="hidden shrink-0 md:inline-block">
      { project.logo
        ? <Image src={project.logo} width={64} height={64} className="w-16 h-16 rounded" alt={project.title} />
        : <div className="w-16 h-16 bg-gray-200 rounded" />
      }
    </div>
    <div className="grow">
      <h3 className="text-lg font-bold tracking-tight">{ project.title }</h3>
      <p className="text-sm leading-5 text-gray-600 dark:text-gray-400">{ project.description }</p>
      { Array.isArray(project.tags) && project.tags.length && (
        <div className="flex flex-row my-2 space-x-3">
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

  import type { Project } from "../../../../types/project"

interface Props {
  className: string
  project: Project
}

const ProjectCard: React.FC<Props> = ({ project }) => (
  <article
    className="
      relative
      flex flex-row
      py-4
      px-6
      gap-4
      border
      rounded-lg
      transition-colors
      duration-300
      shadow-lg
    "
  >
    <div className="hidden md:inline-block flex-shrink-0">
      <div className="w-16 h-16 rounded bg-gray-300" />
    </div>
    <div className="flex-grow">
      <h3 className="text-lg font-bold">{ project.title }</h3>
      <p className="text-sm leading-5 text-gray-600 line-clamp-3">{ project.description }</p>
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
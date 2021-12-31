import React from "react"
import type { Project } from "../../../../types/project"
import ProjectCard from "../../../molecules/projects/ProjectCard"

import SectionHeader from "../../../molecules/SectionHeader"

interface Props {
  id?: string
  className?: string
  projects: Project[]
}

const HomeProjects: React.FC<Props> = ({ id, className, projects }) => (
  <section id={id} className={`w-full ${className}`}>
    <SectionHeader title="Projects" />

    <div>
      { projects.map((project, i) => (
        <ProjectCard key={`home-project-${i}`} className="mb-5" project={project} />
      )) }
    </div>
  </section>
)

export default HomeProjects

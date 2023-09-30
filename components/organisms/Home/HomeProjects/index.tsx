import 'twin.macro'

import React, { type FC } from 'react'

import type { Project } from '../../../../types/project'
import ProjectCard from '../../../molecules/projects/ProjectCard'
import SectionHeader from '../../../molecules/SectionHeader'

interface Props {
  projects: Project[]
}

const HomeProjects: FC<Props & JSX.IntrinsicElements['section']> = ({
  projects,
  ...props
}) => (
  <section tw="w-full" {...props}>
    <SectionHeader title="Projects" href="/projects" />

    <div tw="space-y-5">
      {projects.map((project, i) => (
        <ProjectCard key={`home-project-${i}`} project={project} />
      ))}
    </div>
  </section>
)

export default HomeProjects

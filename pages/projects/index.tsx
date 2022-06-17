// Components
import Head from 'next/head'
import PageHeader from '../../components/molecules/PageHeader'
import ProjectCard from '../../components/molecules/projects/ProjectCard'
import TheContactBanner from '../../components/organisms/TheContactBanner'

// Types
import type { GetStaticProps, NextPage } from 'next'
import { Project } from '../../types/project'

// Content
import { frontMatter as allProjects } from './*.mdx'

interface Props {
  projects: Project[]
}

const Socials: NextPage<Props> = ({ projects }) => {
  return (
    <>
      <Head>
        <title>Projects - Leonid Meleshin</title>
      </Head>

      <article className='mx-auto mb-19 max-w-2xl'>
        <PageHeader>Projects</PageHeader>

        <div>
          { projects.map((project, i) => (
            <ProjectCard key={`home-project-${i}`} className="mb-5" project={project} />
          )) }
        </div>
      </article>

      <TheContactBanner />
    </>
  )
}

export default Socials

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects = (allProjects as unknown as Project[])
    .filter((p) => p.display === undefined || p.display === true)
    .sort((a, b) => a.sort - b.sort)

  return {
    props: {
      projects,
    }
  }
}

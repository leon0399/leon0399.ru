import { type NextPage } from 'next'
import { type ReactNode, type FC, type ComponentProps } from 'react'
import tw, { styled } from 'twin.macro'
import { useQuery } from '@tanstack/react-query'

import Head from 'next/head'
import PageHeader from '../components/molecules/PageHeader'
import { DashboardItem } from '../components/molecules/dashboard'
import { Icon } from '@iconify/react'

const DashboardHeader = styled.h2([tw`mb-6 text-xl font-semibold`])

const SimpleUrlDashboardItem: FC<
  Omit<Omit<ComponentProps<typeof DashboardItem>, 'isLoading'>, 'value'> & {
    url: string
  }
> = ({ url, ...props }) => {
  const { isInitialLoading, isError, data } = useQuery<string>({
    queryFn: async () => {
      const response = await fetch(url)
      if (response.status >= 300) {
        throw new Error()
      }
      return await response.text()
    },
    queryKey: ['dashboard', { url }],
    retry: false,
  })

  return (
    <DashboardItem
      isLoading={isInitialLoading}
      value={isError ? 'Error' : data}
      {...props}
    />
  )
}

const Dashboard: NextPage = () => {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Dashboard - Leonid Meleshin</title>
      </Head>

      <article className="mx-auto mb-19 max-w-2xl">
        <PageHeader>Dashboard</PageHeader>

        <DashboardHeader>GitHub</DashboardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <SimpleUrlDashboardItem
            icon={<Icon icon="fa-brands:github" className="block w-6 h-6" />}
            title="GitHub Followers"
            url="/api/dashboard/github/followers"
          />
          <SimpleUrlDashboardItem
            icon={
              <Icon icon="heroicons-solid:star" className="block w-6 h-6" />
            }
            title="GitHub Stars Gained"
            url="/api/dashboard/github/total_stars"
          />
        </div>

        <DashboardHeader>Twitter</DashboardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <SimpleUrlDashboardItem
            icon={<Icon icon="fa-brands:twitter" className="block w-6 h-6" />}
            title="GitHub Followers"
            url="/api/dashboard/twitter/subscribers"
          />
        </div>
      </article>
    </div>
  )
}

export default Dashboard

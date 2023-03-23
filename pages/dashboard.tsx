import { type NextPage } from 'next'
import React, { type FC, type ComponentProps } from 'react'
import tw, { styled } from 'twin.macro'
import { useQuery, type QueryKey } from '@tanstack/react-query'

import Head from 'next/head'
import PageHeader from '../components/molecules/PageHeader'
import { DashboardItem } from '../components/molecules/dashboard'
import { Icon } from '@iconify/react'

const DashboardHeader = styled.h2([tw`mb-6 text-xl font-semibold`])

interface ISimpleDashboadItemProps
  extends Omit<ComponentProps<typeof DashboardItem>, 'isLoading' | 'value'> {
  url: string
  queryKey: QueryKey
}
const SimpleUrlDashboardItem: FC<ISimpleDashboadItemProps> = ({
  url,
  ...props
}) => {
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
    <div tw="container mx-auto">
      <Head>
        <title>Dashboard - Leonid Meleshin</title>
      </Head>

      <article tw="mx-auto mb-19 max-w-2xl">
        <PageHeader>Dashboard</PageHeader>

        <DashboardHeader>GitHub</DashboardHeader>

        <div tw="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <SimpleUrlDashboardItem
            icon={<Icon icon="fa-brands:github" className="block h-6 w-6" />}
            title="GitHub Followers"
            url="/api/dashboard/github/followers"
            queryKey={['dashboard', 'github-followers']}
          />
          <SimpleUrlDashboardItem
            icon={
              <Icon icon="heroicons-solid:star" className="block h-6 w-6" />
            }
            title="GitHub Stars Gained"
            url="/api/dashboard/github/total_stars"
            queryKey={['dashboard', 'github-stars']}
          />
        </div>

        <DashboardHeader>Twitter</DashboardHeader>

        <div tw="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <SimpleUrlDashboardItem
            icon={<Icon icon="fa-brands:twitter" className="block h-6 w-6" />}
            title="Twitter Subscribers"
            url="/api/dashboard/twitter/subscribers"
            queryKey={['dashboard', 'twitter-subscribers']}
          />
        </div>
      </article>
    </div>
  )
}

export default Dashboard

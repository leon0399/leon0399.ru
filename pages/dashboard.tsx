import { Icon } from '@iconify/react'
import { type NextPage } from 'next'
import Head from 'next/head'
import tw, { styled } from 'twin.macro'

import { WithQueryDashboardItem } from '@/components/molecules/dashboard'
import PageHeader from '@/components/molecules/PageHeader'
import { GitHubStarsChart } from '@/components/organisms/dashboard'

const DashboardHeader = styled.h2([tw`mb-6 text-xl font-semibold`])
const DashboardGrid = styled.div([
  tw`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`,
])

const Dashboard: NextPage = () => {
  return (
    <div tw="container mx-auto">
      <Head>
        <title>Dashboard - Leonid Meleshin</title>
      </Head>

      <article tw="mx-auto mb-19">
        <PageHeader>Dashboard</PageHeader>

        <DashboardHeader>GitHub</DashboardHeader>

        <DashboardGrid tw="mb-5">
          <WithQueryDashboardItem
            icon={<Icon icon="fa-brands:github" className="block size-6" />}
            title="GitHub Followers"
            url="/api/dashboard/github/followers"
            queryKey={['dashboard', 'github-followers']}
          />
          <WithQueryDashboardItem
            icon={<Icon icon="heroicons-solid:star" className="block size-6" />}
            title="GitHub Stars Gained"
            url="/api/dashboard/github/total_stars"
            queryKey={['dashboard', 'github-stars']}
          />
        </DashboardGrid>
        <DashboardGrid tw="mb-6">
          <GitHubStarsChart
            repos={[
              'senseshift/senseshift-firmware',
              'LucidVR/lucidgloves',
              'SlimeVR/SlimeVR-Tracker-ESP',
            ]}
            tw="sm:col-span-2 lg:col-span-3"
          />
        </DashboardGrid>

        {/* <DashboardHeader>Twitter</DashboardHeader>

        <DashboardGrid tw="mb-6">
          <WithQueryDashboardItem
            icon={<Icon icon="fa-brands:twitter" className="block h-6 w-6" />}
            title="Twitter Subscribers"
            url="/api/dashboard/twitter/subscribers"
            queryKey={['dashboard', 'twitter-subscribers']}
          />
        </DashboardGrid> */}

        <DashboardHeader>Hashnode</DashboardHeader>

        <DashboardGrid tw="mb-6">
          <WithQueryDashboardItem
            icon={
              <Icon
                icon="heroicons-solid:document-text"
                className="block size-6"
              />
            }
            title="Hashnode Posts"
            url="/api/dashboard/hashnode/posts"
            queryKey={['dashboard', 'hashnode-posts']}
          />
          <WithQueryDashboardItem
            icon={<Icon icon="heroicons-solid:user" className="block size-6" />}
            title="Hashnode Followers"
            url="/api/dashboard/hashnode/followers"
            queryKey={['dashboard', 'hashnode-followers']}
          />
          <WithQueryDashboardItem
            icon={
              <Icon
                icon="heroicons-solid:hand-thumb-up"
                className="block size-6"
              />
            }
            title="Hashnode Reacions"
            url="/api/dashboard/hashnode/reactions"
            queryKey={['dashboard', 'hashnode-reactions']}
          />
        </DashboardGrid>
      </article>
    </div>
  )
}

export default Dashboard

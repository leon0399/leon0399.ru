import 'twin.macro'

import { QueryKey, useQuery } from '@tanstack/react-query'
import React, { type FC, type ReactNode } from 'react'

import { DashboardCard } from './Styles'

interface Props {
  icon: ReactNode
  title: ReactNode
  isLoading?: boolean
  value?: ReactNode
  className?: string
}

export const DashboardItem: FC<Props> = ({
  title,
  icon,
  isLoading,
  value,
  className,
}) => {
  return (
    <DashboardCard className={className}>
      <div tw="rounded-[4px] bg-indigo-600 p-3 text-gray-100 dark:bg-indigo-300  dark:text-gray-900">
        {icon}
      </div>
      <div>
        <h5 tw="text-sm font-semibold text-gray-500">{title}</h5>
        {isLoading ? (
          <span
            role="status"
            tw="my-1 block h-6 w-12 animate-pulse rounded-sm bg-gray-300"
          >
            <span tw="sr-only">Loading...</span>
          </span>
        ) : (
          <span tw="text-2xl font-semibold text-gray-900 dark:text-gray-200">
            {value || <>&mdash;</>}
          </span>
        )}
      </div>
    </DashboardCard>
  )
}

interface WithQueryDashboardItemProps
  extends Omit<Props, 'isLoading' | 'value'> {
  url: string
  queryKey?: QueryKey
}
export const WithQueryDashboardItem: FC<WithQueryDashboardItemProps> = ({
  url,
  queryKey,
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
    queryKey: queryKey ?? ['dashboard', { url }],
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

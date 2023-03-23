import React, { type FC, type ReactNode } from 'react'

import 'twin.macro'

interface Props {
  icon: ReactNode
  title: ReactNode
  isLoading?: boolean
  value?: ReactNode
}

const DashboardItem: FC<Props> = ({ title, icon, isLoading, value }) => {
  return (
    <div tw="relative flex flex-row items-center space-x-5 rounded-lg border p-6 shadow-lg dark:border-gray-700">
      <div tw="rounded-[4px] bg-indigo-600 p-3 text-gray-100 dark:bg-indigo-300  dark:text-gray-900">
        {icon}
      </div>
      <div>
        <h5 tw="text-sm font-semibold text-gray-500">{title}</h5>
        {isLoading ? (
          <span tw="my-1 block h-6 w-12 animate-pulse rounded-sm bg-gray-300" />
        ) : (
          <span tw="text-2xl font-semibold text-gray-900 dark:text-gray-200">
            {value || <>&mdash;</>}
          </span>
        )}
      </div>
    </div>
  )
}

export default DashboardItem

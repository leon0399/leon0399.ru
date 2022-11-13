import type { FC, ReactNode } from 'react'

interface Props {
  icon: ReactNode
  title: ReactNode
  isLoading?: boolean
  value?: ReactNode
}

const DashboardItem: FC<Props> = ({ title, icon, isLoading, value }) => {
  return (
    <div className="relative flex flex-row p-6 border rounded-lg shadow-lg space-x-5 items-center dark:border-gray-700">
      <div className="p-3 rounded-[4px] bg-indigo-600 dark:bg-indigo-300 text-gray-100 dark:text-gray-900">
        {icon}
      </div>
      <div>
        <h5 className="text-gray-500 text-sm font-semibold">{title}</h5>
        {isLoading ? (
          <span className="rounded-sm w-12 h-6 my-1 block animate-pulse bg-gray-300" />
        ) : (
          <span className="text-gray-900 dark:text-gray-200 font-semibold text-2xl">
            {value || <>&mdash;</>}
          </span>
        )}
      </div>
    </div>
  )
}

export default DashboardItem

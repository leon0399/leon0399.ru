import 'chartjs-adapter-luxon'

import { useQuery } from '@tanstack/react-query'
import {
  CategoryScale,
  Chart as ChartJS,
  type ChartDataset,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js'
import {
  type DetailedHTMLProps,
  type FC,
  type HTMLAttributes,
  useMemo,
} from 'react'
import { Line } from 'react-chartjs-2'

import { DashboardCard } from '@/components/molecules/dashboard/Styles'
import { useMediaQuery } from '@/hooks/useMediaQuery'

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const colors = [
  '#dd4528',
  '#28a3dd',
  '#f3db52',
  '#ed84b5',
  '#4ab74e',
  '#9179c0',
  '#8e6d5a',
  '#f19839',
  '#949494',
]
const darkColors = [
  '#ff6b6b',
  '#48dbfb',
  '#feca57',
  '#ff9ff3',
  '#1dd1a1',
  '#f368e0',
  '#ff9f43',
  '#a4b0be',
  '#576574',
]

const ChartSkeleton: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => (
  <div
    role="status"
    tw="flex h-56 grow animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700"
    {...props}
  >
    <svg
      tw="size-10 text-gray-200 dark:text-gray-600"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 16"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M1 1v14h16M4 10l3-4 4 4 5-5m0 0h-3.207M16 5v3.207"
      />
    </svg>
    <span tw="sr-only">Loading...</span>
  </div>
)

interface Props {
  repos: string[]
  className?: string
}
export const GitHubStarsChart: FC<Props> = ({ repos, className }) => {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')
  const currentColors = isDark ? darkColors : colors

  const url = `/api/dashboard/github/stars-history?${repos
    .map((repo) => `repos=${repo}`)
    .join('&')}`

  const { isInitialLoading, data } = useQuery<
    Record<string, Record<string, number>>
  >({
    queryFn: async () => {
      const response = await fetch(url)
      if (response.status >= 300) {
        throw new Error()
      }
      return await response.json()
    },
    queryKey: ['dashboard', 'github-stars', repos],
    retry: false,
    refetchOnWindowFocus: false,
  })

  const datasets = useMemo<
    ChartDataset<'line', { x: string; y: number }[]>[]
  >(() => {
    if (!data) {
      return []
    }

    return Object.entries(data).map(([repo, stars], index) => ({
      label: repo,
      data: Object.entries(stars).map(([date, count]) => ({
        x: date,
        y: count,
      })),
      tension: 0.4,
      borderColor: currentColors[index % currentColors.length],
      backgroundColor: currentColors[index % currentColors.length] + '7F',
      pointStyle: false,
    }))
  }, [data, currentColors])
  const labels = useMemo(() => {
    if (!data) {
      return []
    }

    return Object.values(data)
      .flatMap((stars) => Object.keys(stars))
      .filter((value, index, array) => array.indexOf(value) === index)
      .sort()
  }, [data])

  // source: https://flowbite.com/docs/components/skeleton/
  return (
    <DashboardCard className={className}>
      {isInitialLoading ? (
        <ChartSkeleton />
      ) : (
        <Line
          data={{
            labels,
            datasets,
          }}
          options={{
            responsive: true,
            plugins: {
              tooltip: {
                // mode: 'index',
              },
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  // Luxon format string
                  tooltipFormat: 'DD T',
                },
              },
            },
          }}
        />
      )}
    </DashboardCard>
  )
}

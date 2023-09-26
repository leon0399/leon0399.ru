import { useMemo, type FC } from "react"
import { DashboardCard } from "../../molecules/dashboard/Styles"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartDataset,
} from 'chart.js';
import { Line } from 'react-chartjs-2'
import { useQuery } from "@tanstack/react-query";
import { stringify } from "querystring";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface Props {
  repos: string[]
  className?: string
}
export const DashboardChart: FC<Props> = ({ repos, className }) => {
  const url = `/api/dashboard/github/stars-history?${repos.map((repo) => `repos=${repo}`).join('&')}`

  const { isInitialLoading, isError, data } = useQuery<Record<string, Record<string, number>>>({
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

  const datasets = useMemo<ChartDataset<'line', { x: string, y: number }[]>[]>(() => {
    if (!data) {
      return []
    }

    return Object.entries(data).map(([repo, stars]) => ({
      label: repo,
      data: Object.entries(stars).map(([date, count]) => ({ x: date, y: count })),
      tension: 0.4,
    }))
  }, [data])
  const labels = useMemo(() => {
    if (!data) {
      return []
    }

    return Object
      .values(data)
      .flatMap((stars) => Object.keys(stars))
      .filter((value, index, array) => array.indexOf(value) === index)
      .sort()
  }, [data])

  return (
    <DashboardCard className={className}>
      <Line
        data={{
          labels,
          datasets,
        }}
        options={{
          responsive: true,
        }}
      />
    </DashboardCard>
  )
}
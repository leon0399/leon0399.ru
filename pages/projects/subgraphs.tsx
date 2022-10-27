import { useQuery } from '@tanstack/react-query'
import { request, gql } from 'graphql-request'
import { type GetStaticProps, type NextPage } from 'next'
import Head from 'next/head'
import { useMemo } from 'react'
import ProjectHeader from '../../components/molecules/projects/ProjectHeader'

interface Subgraph {
  id: string
  entityCount: number
  synced: boolean
  health: 'healthy' | 'unhealthy' | 'failed'
  node: string
}

interface SubgraphError {
  response: {
    errors: Array<{
      message: string
    }>
  }
}

const useSubgraph = (subgraphName: string) =>
  useQuery<Subgraph, SubgraphError>(
    ['subgraph', { name: subgraphName }],
    async () => {
      const { indexingStatusForCurrentVersion } = await request(
        'https://api.thegraph.com/index-node/graphql',
        gql`
          query Subgraph($subgraphName: String!) {
            indexingStatusForCurrentVersion(subgraphName: $subgraphName) {
              subgraph

              entityCount
              synced
              health
              node

              fatalError {
                ...ErrorInfo
              }
              nonFatalErrors {
                ...ErrorInfo
              }

              chains {
                network
                chainHeadBlock {
                  number
                }
                earliestBlock {
                  number
                }
                latestBlock {
                  ...BlockInfo
                }
                lastHealthyBlock {
                  ...BlockInfo
                }
              }
            }
          }

          fragment ErrorInfo on SubgraphError {
            message
            block {
              ...BlockInfo
            }
            handler
            deterministic
          }

          fragment BlockInfo on Block {
            number
          }
        `,
        { subgraphName },
      )

      return indexingStatusForCurrentVersion
    },
    {
      retry: false,
    },
  )

const SubgraphRow: React.FC<{ subgraphName: string }> = ({ subgraphName }) => {
  const { isInitialLoading, isError, error, data } = useSubgraph(subgraphName)

  const subgraphUrl = useMemo(
    () => `https://thegraph.com/hosted-service/subgraph/${subgraphName}`,
    [subgraphName],
  )

  if (isInitialLoading) {
    return (
      <tr>
        <td className="font-mono">
          <a href={subgraphUrl} target="_blank" rel="noreferrer">
            {subgraphName}
          </a>
        </td>
        <td className="text-center">
          <span className="inline-flex animate-pulse bg-slate-200 rounded w-4 h-4 align-middle" />
        </td>
        <td className="text-right">
          <span className="inline-flex animate-pulse bg-slate-200 rounded w-16 h-4 align-middle" />
        </td>
      </tr>
    )
  }

  if (isError || !data) {
    return (
      <tr>
        <td className="font-mono">
          <a href={subgraphUrl} target="_blank" rel="noreferrer">
            {subgraphName}
          </a>
        </td>
        <td colSpan={2} className="text-red-700">
          {error?.response.errors.map((error) => (
            <>
              {error.message}
              <br />
            </>
          )) || 'Empty data'}
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td className="font-mono">
        <a href={subgraphUrl} target="_blank" rel="noreferrer">
          {subgraphName}
        </a>
      </td>
      <td className="text-center">
        {data.health === 'healthy'
          ? '✅'
          : data.health === 'failed'
          ? '❌'
          : '⚠️'}
      </td>
      <td className="text-right">{data.entityCount}</td>
    </tr>
  )
}

interface Props {
  subgraphNames: string[]
}

const SubgraphsPage: NextPage<Props> = ({ subgraphNames }) => {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Subgraphs</title>
      </Head>

      <article className="prose mx-auto max-w-2xl dark:prose-invert">
        <ProjectHeader
          title="Subgraphs"
          category="Web3"
          tags={['TypeScript', 'GraphQL']}
          url="https://github.com/leon0399/subgraphs"
        />

        <table className="table-auto">
          <thead>
            <tr>
              <th>Subgraph</th>
              <th className="text-center">Status</th>
              <th className="text-right">Entities</th>
            </tr>
          </thead>
          <tbody>
            {subgraphNames.map((subgraphName) => (
              <SubgraphRow
                key={`subgraph-${subgraphName}`}
                subgraphName={subgraphName}
              />
            ))}
          </tbody>
        </table>
      </article>
    </div>
  )
}

export default SubgraphsPage

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      subgraphNames: [
        'leon0399/factoria-v2',
        'leon0399/factoria-v2-goerli',
        'leon0399/cell',
        'leon0399/cell-goerli',
        'leon0399/moneypipe-stream',
        'leon0399/moneypipe-buffer',
        'leon0399/moneypipe-buffer2',
        'leon0399/moneypipe-buffer2-polygon',
        'leon0399/moneypipe-buffer2-goerli',
        'leon0399/moneypipe-buffer2-mumbai',
      ],
    },
  }
}

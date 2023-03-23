import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as BalancerProvider } from 'react-wrap-balancer'
import { Analytics } from '@vercel/analytics/react'

import Layout from '../layouts'

import GlobalStyles from '../components/GlobalStyles'

import '../styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <BalancerProvider>
          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </BalancerProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp

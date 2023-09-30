import '../styles/globals.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { Provider as BalancerProvider } from 'react-wrap-balancer'

import GlobalStyles from '../components/GlobalStyles'
import Layout from '../layouts'

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

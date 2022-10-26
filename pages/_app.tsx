import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'

import Layout from '../layouts'

import '../styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </QueryClientProvider>
  )
}

export default MyApp

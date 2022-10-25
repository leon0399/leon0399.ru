import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'

import Layout from '../layouts'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  )
}

export default MyApp

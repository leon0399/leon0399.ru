const withMdxBuilder = require('next-mdx-builder')
const withBundleAnalyzer = require('@next/bundle-analyzer')
const { withPlaiceholder } = require('@plaiceholder/next')

const plugins = [
  withMdxBuilder({}),
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  }),
  withPlaiceholder,
]

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['@camwiegert/typical'],
  webpack(config) {
    config.plugins.push(
      require('unplugin-icons/webpack').default({
        compiler: 'jsx',
        jsx: 'react',
      }),
    )

    return config
  },
  redirects() {
    return [
      {
        source: '/qr',
        destination: '/qr/right',
        permanent: true,
      },
      {
        source: '/experiments/benchmarks',
        destination: '/projects/benchmarks',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['cdn.hashnode.com'],
  },
}

module.exports = () => plugins.reduce((acc, next) => next(acc), config)

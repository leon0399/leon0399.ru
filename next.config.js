const withPlugins = require('next-compose-plugins')

// const withMDX = require('@next/mdx')
const withMdxBuilder = require("next-mdx-builder")

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack(config) {
    config.plugins.push(
      require('unplugin-icons/webpack')({
        compiler: 'jsx',
        jsx: 'react',
      }),
    );

    return config;
  },
}

module.exports =  withPlugins(
  [
    withMdxBuilder({})
  ],
  config,
)
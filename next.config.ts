import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'
import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})
const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@use 'variables.module' as *;`,
  },
  transpilePackages: ['three'],
  webpack: (config) => {
    config.experiments = { asyncWebAssembly: true }
    config.module.rules.push(
      {
        test: /\.(glsl|frag|vert)$/,
        type: 'asset/source',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    )
    return config
  },
}

export default withBundleAnalyzer(withNextIntl(nextConfig))

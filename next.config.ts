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
  experimental: {
    turbo: {
      rules: {
        '**/src/components/three/shaders/project_card/*.glsl': {
          loaders: ['raw-loader'],
          as: '*.js',
        },
      },
    },
  },
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@use 'variables.module' as *;`,
  },
  transpilePackages: ['three'],
  webpack: (config) => {
    console.log('Webpack configuration is being applied!')
    config.experiments = { asyncWebAssembly: true }
    config.module.rules.push(
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: ['raw-loader'],
      },
      {
        test: /\.svg$/,
        use: [{ loader: '@svgr/webpack' }],
      },
    )
    return config
  },
}

export default withBundleAnalyzer(withNextIntl(nextConfig))

import removeImports from 'next-remove-imports'

const withRemoveImports = removeImports({})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ixyjihpujiugurmokecq.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default withRemoveImports(nextConfig)

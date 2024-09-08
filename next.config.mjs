import removeImports from 'next-remove-imports'

const withRemoveImports = removeImports({})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

export default withRemoveImports(nextConfig)

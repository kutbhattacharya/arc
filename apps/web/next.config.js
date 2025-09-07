/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true'

// Derive repo name when running on GitHub Actions to set basePath/assetPrefix automatically
const repoName = process.env.GITHUB_REPOSITORY && process.env.GITHUB_REPOSITORY.split('/')[1]

const nextConfig = {
  experimental: {
    appDir: true,
  },
  // For GitHub Pages static hosting, disable image optimization
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
    unoptimized: isGitHubPages,
  },
  // Enable static export only for Pages builds to avoid disrupting local dev/other deploys
  ...(isGitHubPages
    ? {
        output: 'export',
        // Serve under /<repo> on GitHub Pages when not using user/organization root site
        basePath: repoName ? `/${repoName}` : undefined,
        assetPrefix: repoName ? `/${repoName}/` : undefined,
        trailingSlash: true,
      }
    : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig



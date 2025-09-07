import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk, Plus_Jakarta_Sans, Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  preload: true,
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap', 
  variable: '--font-jakarta',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Rust - Turn vibes into revenue',
  description: 'Comments, trends, and spend decoded. Timing, hooks, and ROI recommended.',
  keywords: ['marketing', 'intelligence', 'analytics', 'social media', 'ROI', 'SMB', 'creators'],
  authors: [{ name: 'Rust Team' }],
  creator: 'Rust',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rust.app',
    title: 'Rust - Turn vibes into revenue',
    description: 'Comments, trends, and spend decoded. Timing, hooks, and ROI recommended.',
    siteName: 'Rust',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rust - Turn vibes into revenue',
    description: 'Comments, trends, and spend decoded. Timing, hooks, and ROI recommended.',
    creator: '@rust_app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          spaceGrotesk.variable,
          plusJakarta.variable,
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-background bg-grain">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



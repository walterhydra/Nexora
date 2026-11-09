import type { Metadata } from 'next'
import { Inter, Sora, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Nexoraa — Client Portal',
  description: 'Premium client portal for tracking your project with Nexoraa',
  themeColor: '#0A0A0F',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111118',
              border: '1px solid #1E1E2E',
              color: '#F8FAFC',
            },
          }}
        />
      </body>
    </html>
  )
}

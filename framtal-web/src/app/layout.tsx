import type { Metadata } from 'next'
import { ApolloProvider } from '@/lib/ApolloProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Framtalsskil',
  description: 'Skatturinn - Framtalsskil',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  )
}

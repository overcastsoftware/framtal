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
      <body>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  )
}

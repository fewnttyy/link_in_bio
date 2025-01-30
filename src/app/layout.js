'use client'
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Customer Service Landing Page</title>
        <meta name="description" content="Customer Service Landing Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>{children}</body>
    </html>
  )
}

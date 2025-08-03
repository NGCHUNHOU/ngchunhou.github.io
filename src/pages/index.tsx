import Head from 'next/head'
import { Inter } from 'next/font/google'
import Frame from './components/Frame'
import Layout from './components/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout pageName="Portfolio">
      <Frame></Frame>
    </Layout>
  )
}

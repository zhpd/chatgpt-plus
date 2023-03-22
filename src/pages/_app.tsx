import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { ConfigProvider, App as AntdApp, theme as antdTheme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import 'antd/dist/reset.css'
import Layout from '@/components/Layout'
import { SiteProvider} from '@/context/site'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SiteProvider>
      <ConfigProvider>
        <AntdApp>
          <StyleProvider hashPriority="high">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </StyleProvider>
        </AntdApp>
      </ConfigProvider>
    </SiteProvider>
  )
}

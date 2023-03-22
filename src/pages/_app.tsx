import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { ConfigProvider, App as AntdApp, theme as antdTheme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import 'antd/dist/reset.css'
import Layout from '@/components/Layout'
import { SiteProvider } from '@/contexts/site'

function App({ Component, pageProps }: AppProps) {
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

export default appWithTranslation(App)

import '@/styles/globals.css'
import 'antd/dist/reset.css'
import React from 'react'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { ConfigProvider, App as AntdApp, theme as antdTheme, Spin } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import { SiteProvider, ChatProvider, PromptProvider, useSiteContext } from '@/contexts'
// import Layout from '@/components/Layout'
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('@/components/Layout'), {
  ssr: false,
  loading: () => (
    <div style={{ flex: 1, height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin tip="Loading"></Spin>
    </div>
  ),
})

function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  // const { theme } = useSiteContext()
  // const { token } = antdTheme.useToken()
  return (
    <SiteProvider>
      <PromptProvider>
        <ChatProvider>
          <ConfigProvider>
            <AntdApp style={{ height: '100%' }}>
              <StyleProvider hashPriority="high">
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </StyleProvider>
            </AntdApp>
          </ConfigProvider>
        </ChatProvider>
      </PromptProvider>
    </SiteProvider>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.onload = () => {
    console.log('window.onload')
    document?.getElementById('holderStyle')?.remove()
  }
}

export default App

import '@/styles/globals.css'
import 'antd/dist/reset.css'
import React from 'react'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { ConfigProvider, App as AntdApp, Spin } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import { SiteProvider, ChatProvider, PromptProvider, useSiteContext, SettingProvider } from '@/contexts'
// import Layout from '@/components/Layout'
import dynamic from 'next/dynamic'
import withTheme from '@/themes'
import { GetServerSideProps } from 'next'
import { Analytics } from '@vercel/analytics/react'

const Layout = dynamic(() => import('@/components/Layout'), {
  ssr: false,
  loading: () => (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin tip="Loading"></Spin>
    </div>
  ),
})

ConfigProvider.config({
  prefixCls: 'ant', // 4.13.0+
  iconPrefixCls: 'anticon', // 4.17.0+
})

function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <>
      <SiteProvider>
        <SettingProvider>
          <PromptProvider>
            <ChatProvider>
              <StyleProvider hashPriority="high">
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </StyleProvider>
            </ChatProvider>
          </PromptProvider>
        </SettingProvider>
      </SiteProvider>
      <Analytics />
    </>
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

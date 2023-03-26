import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ConfigProvider, App as AntdApp, theme as antdTheme } from 'antd'
import { appWithTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { StyleProvider } from '@ant-design/cssinjs'
import 'antd/dist/reset.css'
import Layout from '@/components/Layout'
import { i18NextConfig } from '@/locales'
import { SiteProvider, ChatProvider, PromptProvider } from '@/contexts'

// @ts-ignore
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [''], i18NextConfig, ['zh-CN'])),
      // Will be passed to the page component as props
    },
  }
}

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SiteProvider>
        <PromptProvider>
          <ChatProvider>
            <ConfigProvider>
              <AntdApp>
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
    </SessionProvider>
  )
}

export default appWithTranslation(App, i18NextConfig)

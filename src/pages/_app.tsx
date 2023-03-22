import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { ConfigProvider, theme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import 'antd/dist/reset.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <Component {...pageProps} />
      </StyleProvider>
    </ConfigProvider>
  )
}

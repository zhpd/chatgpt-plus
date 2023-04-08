import { Html, Head, Main, NextScript } from 'next/document'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'

export default function Document() {
  // SSR Render
  const cache = createCache()
  // Grab style from cache
  const styleText = extractStyle(cache)

  return (
    <Html lang="zh" data-theme="light">
      <Head>
        {styleText}
        <style
          id="holderStyle"
          dangerouslySetInnerHTML={{
            __html: `
            /* Not only antd, but also any other style if you want to use ssr. */
            *, *::before, *::after {
              animation: none !important;
              transition: none!important;
            }
          `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

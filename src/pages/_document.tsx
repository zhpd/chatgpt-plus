import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh" data-theme="light">
      <Head>
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

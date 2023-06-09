import { Html, Head, Main, NextScript } from 'next/document'

const isProduction = process.env.NODE_ENV === 'production'
const GOOGLE_GA_ID = process.env.GOOGLE_GA_ID || ''

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
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        {isProduction && GOOGLE_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_GA_ID}`} />
            <script
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("js", new Date());
                gtag("config", "${GOOGLE_GA_ID}");
                conosle.log('google-analytics loaded')
              `,
              }}
            ></script>
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

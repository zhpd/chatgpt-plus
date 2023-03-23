import Head from 'next/head'
import { useTranslation } from 'next-i18next'
function IndexPage() {
  const { t } = useTranslation()
  const title = t('window.title', { title: t('c.share') })
  // @ts-ignore
  IndexPage.title = title
  return (
    <div>
      <Head>
        <title>Share</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
      </Head>
      <p>Hello world! Share</p>
    </div>
  )
}

export default IndexPage

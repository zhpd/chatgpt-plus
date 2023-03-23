import Head from 'next/head'
import Message from './components/Message'
import List from './components/List'
import { useTranslation } from 'next-i18next'

function IndexPage() {
  const { t } = useTranslation()
  const title = t('window.title', { title: t('c.message') })
  // @ts-ignore
  IndexPage.title = title
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <List></List>
        <Message></Message>
      </div>
    </>
  )
}

export default IndexPage

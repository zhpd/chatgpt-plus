import Head from 'next/head'
import Message from './components/Message'
import List from './components/List'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
import { useEffect } from 'react'

function IndexPage() {
  const { setTitle } = useSiteContext()
  const { t } = useTranslation()
  useEffect(() => {
    const title = t('window.title', { title: t('c.message') })
    setTitle(title)
  }, [setTitle, t])
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

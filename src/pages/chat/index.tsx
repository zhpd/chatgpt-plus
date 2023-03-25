import Head from 'next/head'
import Message from './components/Message'
import List from './components/List'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
import { useEffect, useState } from 'react'

function IndexPage() {
  const { setTitle, event$ } = useSiteContext()
  const { t } = useTranslation()
  const [openList, setOpenList] = useState<boolean>(true)

  event$.useSubscription((val: any) => {
    if (val?.type == 'tabSwich') {
      // 二次点击chat，则隐藏消息列表
      if (val?.url.indexOf('/chat') > -1) {
        console.log(val)
        setOpenList(!openList)
      }
    }
  })
  useEffect(() => {
    const title = t('window.title', { title: t('c.message') })
    setTitle(title)
  }, [setTitle, t])
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <List style={{ display: openList ? 'block' : 'none' }}></List>
        <Message></Message>
      </div>
    </>
  )
}

export default IndexPage

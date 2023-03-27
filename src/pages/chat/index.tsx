import Head from 'next/head'
import Message from './components/Message'
import List from './components/List'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
import { useCallback, useEffect, useState } from 'react'
import { useChatContext } from '@/contexts/chat'
import { useRouter } from 'next/router'

function IndexPage() {
  const router = useRouter()
  const { setTitle, event$ } = useSiteContext()
  const { t } = useTranslation()
  const { chatList, setActiveChat } = useChatContext()
  const [uuid, setUuid] = useState<string>('')
  const [openList, setOpenList] = useState<boolean>(true)

  const openChat = useCallback(
    (_uuid: string) => {
      console.log(_uuid)
      if (_uuid == uuid) return
      router.push(`/chat?uuid=${_uuid}`)
    },
    [uuid, router]
  )

  useEffect(() => {
    const _uuid = router.query?.uuid as string
    console.log(_uuid)
    if (_uuid) {
      setUuid(_uuid)
      const _chat = chatList.find((item) => item.uuid == _uuid)
      if (_chat) {
        console.log(_chat)
        setActiveChat(_chat)
      }
    } else {
      if (chatList && chatList.length > 0) {
        openChat(chatList[0]['uuid'])
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query?.uuid])

  event$.useSubscription((val: any) => {
    if (val?.type == 'tabSwich') {
      // 二次点击，则隐藏消息列表
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

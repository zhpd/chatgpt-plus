import Head from 'next/head'
// import Message from '@/components/pages/chat/Message'
import List from '@/components/pages/chat/List'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
import { useCallback, useEffect, useState } from 'react'
import { useChatContext } from '@/contexts/chat'
import { useRouter } from 'next/router'
import { Chat, Message } from '@/types/chat'
import { uuidv4 } from '@/utils/uuid'
import dayjs from 'dayjs'
import { Spin } from 'antd'
import dynamic from 'next/dynamic'

const Message = dynamic(() => import('@/components/pages/chat/Message'), {
  loading: () => (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin tip="Loading"></Spin>
    </div>
  ),
})

function IndexPage() {
  const router = useRouter()
  const { setTitle, event$ } = useSiteContext()
  const { t } = useTranslation()
  const { chatList, newChat, setActiveChat } = useChatContext()
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
    console.log('router', router)
    const _uuid = router.query?.uuid as string
    const _prompt = router.query?.prompt as string
    console.log(_uuid, _prompt)
    if (_uuid) {
      setUuid(_uuid)
      const _chat = chatList.find((item) => item.uuid == _uuid)
      if (_chat) {
        console.log(_chat)
        setActiveChat(_chat)
      }
    } else {
      if (_prompt) {
        addChat(_prompt)
      } else {
        if (chatList && chatList.length > 0) {
          openChat(chatList[0]['uuid'])
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query?.uuid, router.query?._prompt])

  const addChat = (_prompt?: string) => {
    // 创建新聊天
    const chat: Chat = {
      uuid: uuidv4(),
      name: 'ChatGPT',
      lastMessageText: 'No message',
    }
    const nMessage: Message = {
      id: uuidv4(),
      uuid: chat?.uuid,
      dateTime: dayjs().format('YYYY/MM/DD HH:mm:ss'),
      text: _prompt || '',
      inversion: true,
      error: false,
      conversationOptions: {},
      requestOptions: {
        prompt: _prompt || '',
        options: {},
      },
    }
    newChat(chat, _prompt ? nMessage : undefined)
    router.push(`/chat?uuid=${chat.uuid}`)
    console.log('newChat', chat, _prompt)
  }

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

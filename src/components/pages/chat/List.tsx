import { Avatar, Button, List, Typography, App, Popconfirm, theme as antdTheme, Divider } from 'antd'
import { DeleteOutlined, MessageOutlined } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSiteContext } from '@/contexts/site'
import { Chat } from '@/types/chat'
import { useChatContext } from '@/contexts/chat'
import { uuidv4 } from '@/utils/uuid'

function IndexPage(props: { style?: React.CSSProperties }) {
  const router = useRouter()
  const { token } = antdTheme.useToken()
  const { theme } = useSiteContext()
  const { message, modal, notification } = App.useApp()
  const { chatList, setChatList, activeChat, newChat, delChat } = useChatContext()
  const { t } = useTranslation()
  const [uuid, setUuid] = useState<string>('')
  const [list, setList] = useState<Chat[]>([])

  const openChat = useCallback(
    (uuid: string) => {
      console.log(uuid)
      router.push(`/chat?uuid=${uuid}`)
    },
    [router]
  )

  useEffect(() => {
    setList(chatList)
  }, [chatList])

  useEffect(() => {
    setUuid(activeChat?.uuid as string)
  }, [activeChat])

  const confirm = (e: React.MouseEvent<HTMLElement>, uuid: string) => {
    e.stopPropagation()
    console.log(e)
    deleteChat(uuid)
    message.success('Click on Yes')
  }

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    console.log(e)
    message.error('Click on No')
  }

  const addChat = () => {
    // 创建新聊天
    const chat: Chat = {
      uuid: uuidv4(),
      name: 'ChatGPT',
      lastMessageText: 'No message',
    }
    newChat(chat)
    router.push(`/chat?uuid=${chat.uuid}`)
    console.log('newChat', chat)
  }

  const deleteChat = (uuid: string) => {
    // 从数据中删除聊天
    delChat(uuid)
    console.log('delChat', uuid)
  }
  return (
    <div style={{ borderRight: `1px solid ${token.colorBorder}55`, width: 260, padding: 16, overflow: 'hidden', position: 'relative', ...props?.style }}>
      <Button type="dashed" block size="large" onClick={addChat}>
        {'+ ' + t('chat.newChat')}
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={list}
        split={false}
        style={{ marginTop: 10, paddingBottom: 100, paddingLeft: 4, paddingRight: 4, overflow: 'scroll', height: '100%', maxHeight: 'inherit', scrollbarWidth: 'none' }}
        renderItem={(item, index) => (
          <Button
            block
            type="default"
            style={{
              height: '100%',
              borderRadius: 6,
              padding: '4px 2px 4px 6px',
              marginTop: '12px',
              borderColor: uuid == item.uuid ? token.colorPrimaryHover : undefined,
              // backgroundColor: uuid == item.uuid ? (theme == 'dark' ? token.colorPrimaryHover : '#e8e8e8') : undefined,
            }}
            onClick={() => openChat(item.uuid)}
          >
            <List.Item
              style={{ padding: 2 }}
              // actions={[
              //   // @ts-ignore
              //   <Popconfirm
              //     key="del"
              //     title="Delete the chat"
              //     description="Are you sure to delete this chat?"
              //     onConfirm={(e?: React.MouseEvent<HTMLElement>) => {
              //       confirm(e as React.MouseEvent<HTMLElement>, item.uuid)
              //       return
              //     }}
              //     onCancel={(e?: React.MouseEvent<HTMLElement>) => {
              //       cancel(e as React.MouseEvent<HTMLElement>)
              //     }}
              //     okText="Yes"
              //     cancelText="No"
              //   >
              //     <DeleteOutlined
              //       onClick={(e) => {
              //         e.stopPropagation()
              //       }}
              //     />
              //   </Popconfirm>,
              // ]}
            >
              <List.Item.Meta
                style={{ alignItems: 'center' }}
                avatar={<Avatar shape={'circle'} size={42} style={{ padding: 4 }} src={<Image src={require('@/assets/openai.png')} width={42} height={42} alt="avatar" />} />}
                title={
                  <Typography.Paragraph ellipsis={{ rows: 1 }} style={{ marginBottom: 0, textAlign: 'left', color: uuid == item.uuid ? token.colorPrimaryActive : token.colorText }}>
                    {item.name}
                  </Typography.Paragraph>
                }
                description={
                  <Typography.Paragraph style={{ marginBottom: 0, fontSize: 12, textAlign: 'left', color: uuid == item.uuid ? token.colorPrimaryActive : token.colorText }} ellipsis={{ rows: 1 }}>
                    {item.lastMessageText || 'No message'}
                  </Typography.Paragraph>
                }
              />
            </List.Item>
          </Button>
        )}
      />
      <div
        style={{
          width: 'auto',
          position: 'absolute',
          display: 'flex',
          justifyContent: 'end',
          flexDirection: 'column',
          left: 16,
          right: 16,
          paddingBottom: 16,
          bottom: 0,
          height: 80,
          background: token.colorBgContainer,
        }}
      >
        <Button type="primary" block size="large">
          {t('chat.tryGpt4')}
        </Button>
      </div>
    </div>
  )
}

export default IndexPage

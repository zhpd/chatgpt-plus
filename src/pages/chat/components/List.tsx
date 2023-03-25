import { Avatar, Button, List, Typography, message, Popconfirm, theme as antdTheme, Divider } from 'antd'
import { DeleteOutlined, MessageOutlined } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSiteContext } from '@/contexts/site'

export type ChatProps = {
  uuid: string
  title: string
  message?: string
  time?: string
}

const _data: ChatProps[] = [
  {
    uuid: '1',
    title: 'ChatGPT',
    message: 'Ant Design Title 1',
  },
  {
    uuid: '2',
    title: 'ChatGPT',
    message: 'Ant Design Title 2',
  },
  {
    uuid: '3',
    title: 'ChatGPT',
    // message: 'Ant Design Title 3',
  },
  {
    uuid: '4',
    title: 'ChatGPT',
    // message: 'Ant Design Title 4',
  },
  {
    uuid: '5',
    title: 'ChatGPT',
    message: 'Ant Design Title 1',
  },
  {
    uuid: '6',
    title: 'ChatGPT',
    message: 'Ant Design Title 2',
  },
  {
    uuid: '7',
    title: 'ChatGPT',
    // message: 'Ant Design Title 3',
  },
  {
    uuid: '8',
    title: 'ChatGPT',
    // message: 'Ant Design Title 4',
  },
]

function IndexPage(props: { style?: React.CSSProperties }) {
  const router = useRouter()
  const { token } = antdTheme.useToken()
  const { theme } = useSiteContext()
  const { t } = useTranslation()
  const [uuid, setUuid] = useState<string>('')
  const [list, setList] = useState<ChatProps[]>([..._data])

  const openChat = useCallback(
    (uuid: string) => {
      console.log(uuid)
      router.push(`/chat?uuid=${uuid}`)
    },
    [router]
  )

  useEffect(() => {
    const _uuid = router.query?.uuid as string
    if (_uuid) {
      console.log(_uuid)
      setUuid(_uuid)
    } else {
      if (_data && _data.length > 0) {
        openChat(_data[0]['uuid'])
      }
    }
  }, [openChat, router.query?.uuid])

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
  const deleteChat = (uuid: string) => {
    // 从数据中删除聊天
    const _list = list.filter((item: any) => item.uuid !== uuid)
    setList(_list)
    // 如果删除的是当前聊天，跳转到第一个聊天
    if (uuid == (router.query?.uuid as string)) {
      if (_list && _list.length > 0) {
        openChat(_list[0]['uuid'])
      }
    }
    console.log('deleteChat', uuid, _list)
  }
  return (
    <div style={{ borderRight: `1px solid ${token.colorBorder}`, width: 260, padding: 16, overflow: 'hidden', position: 'relative', ...props?.style }}>
      <Button type="dashed" block size="large">
        {t('chat.newChat')}
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
              backgroundColor: uuid == item.uuid ? (theme == 'dark' ? token.colorPrimaryHover : '#e8e8e8') : undefined,
            }}
            onClick={() => openChat(item.uuid)}
          >
            <List.Item
              style={{ padding: 2 }}
              actions={[
                // @ts-ignore
                <Popconfirm
                  key="del"
                  title="Delete the chat"
                  description="Are you sure to delete this chat?"
                  onConfirm={(e?: React.MouseEvent<HTMLElement>) => {
                    confirm(e as React.MouseEvent<HTMLElement>, item.uuid)
                    return
                  }}
                  onCancel={(e?: React.MouseEvent<HTMLElement>) => {
                    cancel(e as React.MouseEvent<HTMLElement>)
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  />
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                style={{ alignItems: 'center' }}
                avatar={<Avatar shape={'circle'} size={42} style={{ padding: 4 }} src={<Image src={require('@/assets/openai.png')} width={42} height={42} alt="avatar" />} />}
                title={
                  <div style={{ textAlign: 'left' }}>
                    <span style={{ color: uuid == item.uuid ? (theme === 'dark' ? '#fff' : token.colorPrimaryActive) : token.colorText }}>{item.title}</span>
                  </div>
                }
                description={
                  <Typography.Paragraph
                    style={{ marginBottom: 0, fontSize: 12, textAlign: 'left', color: uuid == item.uuid ? (theme === 'dark' ? '#eee' : token.colorPrimaryActive) : token.colorText }}
                    ellipsis={{ rows: 1 }}
                  >
                    {item.message || 'No message'}
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

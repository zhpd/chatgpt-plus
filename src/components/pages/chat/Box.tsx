import { useSiteContext } from '@/contexts/site'
import { Avatar, Button, Popconfirm, Space, theme as antdTheme } from 'antd'
import { DeleteOutlined, CopyOutlined, RedoOutlined, CheckOutlined } from '@ant-design/icons'

import Image from 'next/image'
import Markdown from './Markdown'
import type { Message } from '@/types/chat'
import { useState } from 'react'
import { useChatContext } from '@/contexts/chat'

import HeadImg from '@/assets/openai.png'

export type BoxProps = {
  uuid: string
  item: Message
  place: 'left' | 'right'
  resendMessage?: (item: Message) => void
}

function Box(props: BoxProps) {
  const { item, uuid, place, resendMessage } = props
  const [copyOk, setCopyOk] = useState(false)
  const { theme } = useSiteContext()
  const { token } = antdTheme.useToken()
  const { delMessage } = useChatContext()

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopyOk(true)
    setTimeout(() => {
      setCopyOk(false)
    }, 1200)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: place == 'left' ? 'row' : 'row-reverse', width: 'auto', height: 'auto', padding: '10px 15px' }}>
      <div style={{ width: 48 }}>
        <Avatar shape={'circle'} size={42} style={{ padding: 4 }} src={<Image src={HeadImg} width={42} height={42} alt="avatar" />} />
      </div>
      <div style={{ maxWidth: 'calc(100% - 30px)' }}>
        <div style={{ height: 25, color: '#c2cad3', textAlign: place == 'left' ? 'left' : 'right' }}>{item?.dateTime}</div>
        <div style={{ display: 'flex', flexDirection: place == 'left' ? 'row' : 'row-reverse' }}>
          <Markdown
            theme={theme}
            token={token}
            role={item?.inversion == true ? 'user' : 'system'}
            style={{
              ...(item.error && { border: item.error ? `1px solid ${token.colorBorderSecondary}` : undefined }),
              ...(item.error && { backgroundColor: item.error ? token.colorWarningBorder : undefined }),
            }}
          >
            {item?.text}
          </Markdown>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              type="text"
              size="small"
              style={{ height: '16px', lineHeight: '16px' }}
              icon={!copyOk ? <CopyOutlined style={{ fontSize: 12, color: token.colorTextDisabled }} /> : <CheckOutlined style={{ fontSize: 12, color: token.colorPrimary }} />}
              onClick={() => {
                copyText(item?.text)
              }}
            ></Button>
            <Popconfirm
              key="resend"
              title="Resend the message"
              // description="Are you sure to resend this message?"
              onConfirm={(e?: React.MouseEvent<HTMLElement>) => {
                resendMessage?.(item)
                return
              }}
              onCancel={(e?: React.MouseEvent<HTMLElement>) => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" size="small" style={{ height: '16px', lineHeight: '16px' }} icon={<RedoOutlined style={{ fontSize: 12, color: token.colorTextDisabled }} />}></Button>
            </Popconfirm>
            <Popconfirm
              key="del"
              title="Delete the message"
              // description="Are you sure to delete this message?"
              onConfirm={(e?: React.MouseEvent<HTMLElement>) => {
                delMessage(uuid, item)
                return
              }}
              onCancel={(e?: React.MouseEvent<HTMLElement>) => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" size="small" style={{ height: '16px', lineHeight: '16px' }} icon={<DeleteOutlined style={{ fontSize: 12, color: token.colorTextDisabled }} />}></Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Box

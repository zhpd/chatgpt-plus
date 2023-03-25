import { useSiteContext } from '@/contexts/site'
import { Avatar, Button, Popconfirm, Space, theme as antdTheme } from 'antd'
import { EditOutlined, DeleteOutlined, CopyOutlined, RedoOutlined, CheckOutlined, LinkOutlined, ControlOutlined, EllipsisOutlined, MoreOutlined } from '@ant-design/icons'

import Image from 'next/image'
import Markdown from './Markdown'
import type { Message } from '@/types/chat'
import { useState } from 'react'
import { useChatContext } from '@/contexts/chat'

function Box(props: { uuid: string; item: Message }) {
  const { item, uuid } = props
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
    <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: item?.inversion == true ? 'row-reverse' : 'row', width: 'auto', height: 'auto', padding: '10px 15px' }}>
      <div style={{ width: 48 }}>
        <Avatar shape={'circle'} size={42} style={{ padding: 4 }} src={<Image src={require('@/assets/openai.png')} width={42} height={42} alt="avatar" />} />
      </div>
      <div style={{ maxWidth: 'calc(100% - 30px)' }}>
        <div style={{ height: 25, color: '#c2cad3', textAlign: item?.inversion == true ? 'right' : 'left' }}>{item?.dateTime}</div>
        <div style={{ display: 'flex', flexDirection: item?.inversion == true ? 'row-reverse' : 'row' }}>
          <Markdown theme={theme} token={token} place={item?.inversion == true ? 'right' : 'left'}>
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
            <Button type="text" size="small" style={{ height: '16px', lineHeight: '16px' }} icon={<RedoOutlined style={{ fontSize: 12, color: token.colorTextDisabled }} />}></Button>
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

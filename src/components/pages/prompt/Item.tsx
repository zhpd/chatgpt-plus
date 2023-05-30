import { useSiteContext } from '@/contexts/site'
import { Avatar, Button, Card, Drawer, message, Input, InputRef, App, Popconfirm, Space, theme as antdTheme, Tooltip, Typography, Empty, Col, Row, Badge, Tag } from 'antd'
import { FireFilled, StarOutlined, StarFilled } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Prompt } from '@/types/prompt'
import { usePromptContext } from '@/contexts/prompt'
import { tool } from '@/utils'
import Edit from './Edit'

function Item(props: { info: Prompt; openInfo?: Function }) {
  const { info, openInfo } = props
  const router = useRouter()
  const [item, setItem] = useState<Prompt>(info)
  const { promptList, starPrompt, unstarPrompt, addPrompt } = usePromptContext()
  const { theme, lang } = useSiteContext()
  const { t } = useTranslation()
  const { token } = antdTheme.useToken()

  useEffect(() => {
    setItem({
      ...info,
    })
  }, [info, lang])

  const toCopy = () => {
    addPrompt(item)
    message.success(t('prompt.copySuccess'))
  }

  const toChat = () => {
    // 跳转到聊天页面
    router.push(`/chat`)
  }

  const toInfo = () => {
    // 跳转到详情页面
    openInfo?.(item)
  }
  return (
    <>
      <Card
        size={'small'}
        extra={
          <>
            {item.isRecommend && <FireFilled style={{ color: token.colorError }} />}
            {item.isStar && <StarFilled style={{ color: token.colorWarning, marginLeft: 10 }} />}
          </>
        }
        hoverable={true}
        title={
          <div style={{ flexDirection: 'row', display: 'flex', margin: '2px', alignItems: 'center' }} onClick={toInfo}>
            <Image
              src={item.image as string}
              width={30}
              height={30}
              alt={item.name as string}
              style={{ borderRadius: 4, padding: '2px', overflow: 'hidden', border: `1px solid ${token.colorBorder}` }}
            />
            <Typography.Text style={{ fontSize: 14, marginLeft: '10px', fontWeight: 400 }}>{item.name}</Typography.Text>
          </div>
        }
        bordered={true}
        style={{ width: '100%' }}
      >
        <Typography.Paragraph onClick={toInfo} style={{ fontSize: 12, color: token.colorTextLabel, minHeight: 58 }} ellipsis={{ expandable: false, rows: 3 }} copyable={false}>
          {item.intro || item.prompt || item.context?.[0]?.content || ''}
        </Typography.Paragraph>
        <div style={{ width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
          <Tag color="magenta" bordered={false}>
            {item.modelConfig?.model || ''}
          </Tag>
          {/* <Typography.Text style={{ fontSize: 12, color: token.colorTextDisabled }}>{item.star || ''}</Typography.Text> */}
          <Space>
            <Button type={'dashed'} size={'small'} style={{ fontSize: 12 }} onClick={toCopy}>
              {t('prompt.copy')}
            </Button>
            <Button type={'dashed'} size={'small'} style={{ fontSize: 12 }} onClick={toChat}>
              {t('prompt.chat')}
            </Button>
          </Space>
        </div>
      </Card>
    </>
  )
}

export default Item

import { Avatar, Button, List, Typography, App, Popconfirm, theme as antdTheme, Divider, Space, Drawer } from 'antd'
import { DeleteOutlined, ExportOutlined, MessageOutlined } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSiteContext } from '@/contexts/site'
import { Prompt } from '@/types/prompt'
import { usePromptContext } from '@/contexts/prompt'
import { uuidv4 } from '@/utils/uuid'
import Edit from './Edit'
import { useSize } from 'ahooks'

function IndexPage(props: { setContent: Function; style?: React.CSSProperties }) {
  const router = useRouter()
  const { token } = antdTheme.useToken()
  const { theme } = useSiteContext()
  const { message, modal, notification } = App.useApp()
  const { promptList, setPromptList, addPrompt, delPrompt } = usePromptContext()
  const { t } = useTranslation()
  const size = useSize(document.body)
  const [action, setAction] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [openItem, setOpenItem] = useState<Prompt | null>(null)
  const [list, setList] = useState<Prompt[]>([])

  useEffect(() => {
    setList(promptList)
  }, [promptList])

  const deletePrompt = (uuid: string) => {
    // 从数据中删除
    delPrompt(uuid)
    setOpen(false)
    console.log('delPrompt', uuid)
  }

  const toAdd = () => {
    setAction('add')
    setOpenItem(null)
    setOpen(true)
  }
  const toEdit = (item: Prompt) => {
    setAction('edit')
    setOpenItem(item)
    setOpen(true)
  }

  const toCopy = (item: Prompt) => {
    addPrompt({ ...item, uuid: uuidv4() })
    message.success(t('prompt.copySuccess'))
  }

  const toChat = (item: Prompt) => {
    router.push(`/chat`)
  }

  return (
    <div style={{ borderRight: `1px solid ${token.colorBorder}55`, width: 260, padding: 16, overflow: 'hidden', position: 'relative', ...props?.style }}>
      <Button type="dashed" block size="large" onClick={() => toAdd()}>
        {'+ ' + t('prompt.newPrompt')}
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={list}
        split={false}
        style={{ marginTop: 10, paddingBottom: 100, paddingLeft: 4, paddingRight: 4, overflow: 'scroll', height: '100%', maxHeight: 'inherit', scrollbarWidth: 'none' }}
        renderItem={(item, index) => (
          <Button
            key={item.uuid}
            block
            type="default"
            style={{
              height: '100%',
              borderRadius: 6,
              padding: '4px 2px 4px 6px',
              marginTop: '12px',
              borderColor: openItem?.uuid == item.uuid ? token.colorPrimaryHover : undefined,
              // backgroundColor: openItem?.uuid == item.uuid ? (theme == 'dark' ? token.colorPrimaryHover : '#e8e8e8') : undefined,
            }}
            onClick={() => toEdit(item)}
          >
            <List.Item
              style={{ padding: 2 }}
              actions={[
                <MessageOutlined
                  key="message"
                  onClick={(e) => {
                    e.stopPropagation()
                    toChat(item)
                  }}
                />,
              ]}
            >
              <List.Item.Meta
                style={{ alignItems: 'center' }}
                avatar={null}
                title={
                  <Typography.Paragraph ellipsis={{ rows: 1 }} style={{ marginBottom: 0, textAlign: 'left', color: openItem?.uuid == item.uuid ? token.colorPrimaryActive : token.colorText }}>
                    {item.name}
                  </Typography.Paragraph>
                }
                description={
                  <Typography.Paragraph
                    ellipsis={{ rows: 1 }}
                    style={{ marginBottom: '0.5em', fontSize: 12, textAlign: 'left', color: openItem?.uuid == item.uuid ? token.colorPrimaryActive : token.colorText }}
                  >
                    {item.intro || 'No intro'}
                  </Typography.Paragraph>
                }
              />
            </List.Item>
          </Button>
        )}
      />
      {/* <div
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
          minHeight: 80,
          background: token.colorBgContainer,
        }}
      >
        <Space direction={'vertical'}>
          <Button type="primary" block size="large" icon={<ExportOutlined />} onClick={() => openAction('export')}>
            {t('prompt.importExport')}
          </Button>
        </Space>
      </div> */}
      <Drawer
        title={(openItem as Prompt)?.name || t('c.prompt')}
        extra={
          <Space>
            <Popconfirm
              key="del"
              title="Delete the prompt"
              description="Are you sure to delete this prompt?"
              onConfirm={(e?: React.MouseEvent<HTMLElement>) => {
                deletePrompt(openItem?.uuid || '')
                return
              }}
              onCancel={(e?: React.MouseEvent<HTMLElement>) => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button type={'default'} size="middle" style={{ color: token.colorError }} icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </Space>
        }
        footer={
          <Space align={'end'} style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button
              type="default"
              onClick={() => {
                toCopy(openItem as Prompt)
                setOpen(false)
              }}
            >
              {t('prompt.copy')}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setOpen(false)
                toChat(openItem as Prompt)
              }}
            >
              {t('prompt.chat')}
            </Button>
          </Space>
        }
        onClose={() => {
          setOpen(false)
          setOpenItem(null)
        }}
        open={open}
        width={578}
        height={'80%'}
        destroyOnClose={true}
        placement={(size?.width as number) <= 1024 ? 'bottom' : 'right'}
      >
        <Edit action={action} page={false} edit={true} prompt={openItem as Prompt} />
      </Drawer>
    </div>
  )
}

export default IndexPage

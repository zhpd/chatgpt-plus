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
import Store from './Store'
import Export from './Export'
import { useSize } from 'ahooks'

function IndexPage(props: { setContent: Function; style?: React.CSSProperties }) {
  const router = useRouter()
  const { token } = antdTheme.useToken()
  const { theme } = useSiteContext()
  const { message, modal, notification } = App.useApp()
  const { promptList, setPromptList, delPrompt } = usePromptContext()
  const { t } = useTranslation()
  const size = useSize(document.body)
  const [action, setAction] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [openItem, setOpenItem] = useState<Prompt | null>(null)
  const [uuid, setUuid] = useState<string>('')
  const [list, setList] = useState<Prompt[]>([])

  useEffect(() => {
    const _action = router.query?.action as string
    const _uuid = router.query?.uuid as string
    if (_action) {
      if (_action == 'edit' && _uuid) {
        openAction(_action, { prompt: promptList?.find?.((item) => item.uuid == _uuid) || {} })
      } else {
        openAction(_action)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query?.action])

  useEffect(() => {
    setList(promptList)
  }, [promptList])

  const deletePrompt = (uuid: string) => {
    // 从数据中删除
    delPrompt(uuid)
    setUuid('')
    setOpen(false)
    console.log('delPrompt', uuid)
  }

  const openAction = (action: string, _props: any = {}) => {
    setUuid('')
    console.log('openAction', action, _props)
    switch (action) {
      case 'add':
        setAction('add')
        setOpenItem(null)
        setOpen(true)
        break
      case 'edit':
        setAction('edit')
        setOpenItem(_props?.prompt)
        setOpen(true)
        break
      case 'store':
        router.push('/prompt?action=store')
        props?.setContent(<Store></Store>)
        break
      case 'export':
        router.push('/prompt?action=export')
        props?.setContent(<Export></Export>)
        break
      case 'message':
        router.push('/chat?prompt' + _props?.prompt?.prompt || _props?.prompt?.context?.[0]?.content || '')
        break
      default:
        break
    }
  }

  return (
    <div style={{ borderRight: `1px solid ${token.colorBorder}55`, width: 260, padding: 16, overflow: 'hidden', position: 'relative', ...props?.style }}>
      <Button type="dashed" block size="large" onClick={() => openAction('add')}>
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
              borderColor: uuid == item.uuid ? token.colorPrimaryHover : undefined,
              // backgroundColor: uuid == item.uuid ? (theme == 'dark' ? token.colorPrimaryHover : '#e8e8e8') : undefined,
            }}
            onClick={() => openAction('edit', { prompt: item })}
          >
            <List.Item
              style={{ padding: 2 }}
              actions={[
                <MessageOutlined
                  key="message"
                  onClick={(e) => {
                    e.stopPropagation()
                    openAction('message', { prompt: item })
                  }}
                />,
              ]}
            >
              <List.Item.Meta
                style={{ alignItems: 'center' }}
                avatar={null}
                title={
                  <Typography.Paragraph ellipsis={{ rows: 1 }} style={{ marginBottom: 0, textAlign: 'left', color: uuid == item.uuid ? token.colorPrimaryActive : token.colorText }}>
                    {item.name}
                  </Typography.Paragraph>
                }
                description={
                  <Typography.Paragraph
                    ellipsis={{ rows: 1 }}
                    style={{ marginBottom: '0.5em', fontSize: 12, textAlign: 'left', color: uuid == item.uuid ? token.colorPrimaryActive : token.colorText }}
                  >
                    {item.description || 'No description'}
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
          minHeight: 80,
          background: token.colorBgContainer,
        }}
      >
        <Space direction={'vertical'}>
          {/* <Button type="primary" block size="large" icon={<ExportOutlined />} onClick={() => openAction('export')}>
            {t('prompt.importExport')}
          </Button> */}
        </Space>
      </div>
      <Drawer
        title={t('c.prompt')}
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
        onClose={() => setOpen(false)}
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

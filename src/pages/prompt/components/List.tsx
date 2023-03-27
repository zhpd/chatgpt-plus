import { Avatar, Button, List, Typography, App, Popconfirm, theme as antdTheme, Divider, Space } from 'antd'
import { ShoppingOutlined, ExportOutlined } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSiteContext } from '@/contexts/site'
import { Prompt } from '@/types/prompt'
import { usePromptContext } from '@/contexts/prompt'
import { nanoid } from 'nanoid'
import Edit from './Edit'
import Store from './Store'
import Export from './Export'

function IndexPage(props: { setContent: Function; style?: React.CSSProperties }) {
  const router = useRouter()
  const { token } = antdTheme.useToken()
  const { theme } = useSiteContext()
  const { message, modal, notification } = App.useApp()
  const { promptList, setPromptList, delPrompt } = usePromptContext()
  const { t } = useTranslation()
  const [uuid, setUuid] = useState<string>('')
  const [list, setList] = useState<Prompt[]>([])

  useEffect(() => {
    const _action = router.query?.action as string
    const _uuid = router.query?.uuid as string
    if (_action) {
      if (_action == 'edit' && _uuid) {
        openAction(_action, { prompt: promptList.find((item) => item.uuid == _uuid) })
      } else {
        openAction(_action)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query?.action])

  useEffect(() => {
    setList(promptList)
  }, [promptList])

  const confirm = (e: React.MouseEvent<HTMLElement>, uuid: string) => {
    e.stopPropagation()
    console.log(e)
    deletePrompt(uuid)
    message.success('Click on Yes')
  }

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    console.log(e)
    message.error('Click on No')
  }

  const deletePrompt = (uuid: string) => {
    // 从数据中删除聊天
    delPrompt(uuid)
    setUuid('')
    props?.setContent(<div></div>)
    console.log('delPrompt', uuid)
  }

  const openAction = (action: string, _props: any = {}) => {
    setUuid('')
    console.log('openAction', action, _props)
    switch (action) {
      case 'add':
        router.push('/prompt?action=add')
        props?.setContent(<Edit action={'add'}></Edit>)
        break
      case 'edit':
        setUuid(_props?.prompt?.uuid)
        router.push('/prompt?action=edit&uuid=' + _props?.prompt?.uuid)
        props?.setContent(<Edit action={'edit'} prompt={_props?.prompt as Prompt}></Edit>)
        break
      case 'store':
        router.push('/prompt?action=store')
        props?.setContent(<Store></Store>)
        break
      case 'export':
        router.push('/prompt?action=export')
        props?.setContent(<Export></Export>)
        break
      default:
        break
    }
  }

  return (
    <div style={{ borderRight: `1px solid ${token.colorBorder}`, width: 260, padding: 16, overflow: 'hidden', position: 'relative', ...props?.style }}>
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
              // actions={[
              //   // @ts-ignore
              //   <Popconfirm
              //     key="del"
              //     title="Delete the prompt"
              //     description="Are you sure to delete this prompt?"
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
                avatar={null}
                title={
                  <Typography.Paragraph ellipsis={{ rows: 1 }} style={{ marginBottom: 0, textAlign: 'left', color: uuid == item.uuid ? token.colorPrimaryActive : token.colorText }}>
                    {item.name}
                  </Typography.Paragraph>
                }
                description={
                  <Typography.Paragraph style={{ marginBottom: 0, fontSize: 12, textAlign: 'left', color: uuid == item.uuid ? token.colorPrimaryActive : token.colorText }} ellipsis={{ rows: 1 }}>
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
          <Button type="primary" block size="large" icon={<ShoppingOutlined />} onClick={() => openAction('store')}>
            {t('prompt.onlinePrompt')}
          </Button>
          <Button type="primary" block size="large" icon={<ExportOutlined />} onClick={() => openAction('export')}>
            {t('prompt.importExport')}
          </Button>
        </Space>
      </div>
    </div>
  )
}

export default IndexPage

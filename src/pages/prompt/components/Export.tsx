import { useSiteContext } from '@/contexts/site'
import { Avatar, Button, Card, Drawer, FloatButton, Input, InputRef, App, Popconfirm, Space, theme as antdTheme, Tooltip, Typography } from 'antd'
import { ExpandAltOutlined, DeleteOutlined, SendOutlined, ApiOutlined, DisconnectOutlined, LinkOutlined, ControlOutlined, EllipsisOutlined, MoreOutlined } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { Prompt } from '@/types/prompt'
import { useEventTarget } from 'ahooks'
import { usePromptContext } from '@/contexts/prompt'
import { nanoid } from 'nanoid'

const _data: Prompt = {
  uuid: '1679282990940',
  name: '小冰',
  description: '你的私人小秘书',
  prompt: '你好，我是小冰，你的私人小秘书',
  dateTime: '2023/3/20 11:32:26',
  type: 'text',
  status: 'online',
  private: true,
  star: 0,
  historyList: [
    {
      uuid: '1679282990940',
      dateTime: '2023/3/20 11:32:26',
      name: '小冰',
      description: '你的私人小秘书',
      prompt: '你好，我是小冰，你的私人小秘书',
      type: 'text',
      status: 'online',
    },
  ],
}

function OnlinePrompt() {
  const router = useRouter()
  const { token } = antdTheme.useToken()
  const { theme } = useSiteContext()
  const { message, modal, notification } = App.useApp()
  const { addPrompt, delPrompt, upPrompt } = usePromptContext()
  const { t } = useTranslation()
  const refInput = useRef<InputRef>(null)
  // const [input, setInput] = useState<string>('')
  const [input, { reset, onChange }] = useEventTarget({ initialValue: '' })
  const [canSend, setCanSend] = useState<boolean>(false)
  const [coiled, setCoiled] = useState<boolean>(true)
  const [openSet, setOpenSet] = useState<boolean>(false)
  const [uuid, setUuid] = useState<string>('')
  const [info, setInfo] = useState<Prompt>()
  const [list, setList] = useState<Prompt[]>([])

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    // height: 200,
    // padding: 48,
    // overflow: 'hidden',
    // textAlign: 'center',
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  }

  const editName = (_name: string) => {
    upPrompt(uuid, {
      name: _name,
    })
  }
  const editDesc = (_description: string) => {
    upPrompt(uuid, {
      description: _description,
    })
  }

  return (
    <div style={{ border: '0px solid #efeff5', flex: 1, padding: '16 16 0 16', display: 'flex', flexDirection: 'column', overflow: 'auto', width: '100%' }}>
      <div
        style={{
          height: 64,
          // borderRight: `${theme === 'dark' ? 0 : 1}px solid ${token.colorBorder}`,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: theme == 'dark' ? token.colorBgContainer : '#fff',
          color: theme === 'dark' ? '#eee' : undefined,
          borderBottom: `1px solid ${theme == 'dark' ? '#424242' : '#e8e8e8'}`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 9,
          right: 0,
          left: 0,
          padding: '16px',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Avatar shape={'circle'} size={42} style={{ padding: 4 }} src={<Image src={require('@/assets/openai.png')} width={42} height={42} alt="avatar" />} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}></div>
        </div>
        <Space>
          <Button
            type={'default'}
            size="middle"
            style={{ marginLeft: 5, marginRight: 5 }}
            icon={<ApiOutlined />}
            onClick={() => {
              message.warning(t('prompt.api_warning'))
            }}
          ></Button>
          <Button
            type={'default'}
            size="middle"
            style={{ marginLeft: 5, marginRight: 5 }}
            icon={coiled ? <LinkOutlined rotate={-45} /> : <DisconnectOutlined rotate={-45} />}
            onClick={() => setCoiled(!coiled)}
          ></Button>
          <Popconfirm
            key="del"
            title="Delete the prompt"
            description="Are you sure to delete this prompt?"
            onConfirm={(e?: React.MouseEvent<HTMLElement>) => {
              delPrompt(uuid)
              return
            }}
            onCancel={(e?: React.MouseEvent<HTMLElement>) => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button type={'default'} size="middle" style={{ marginLeft: 5, marginRight: 5 }} icon={<DeleteOutlined />}></Button>
          </Popconfirm>
          <Button
            type={'default'}
            size="middle"
            style={{ marginLeft: 5, marginRight: 5 }}
            icon={<MoreOutlined />}
            onClick={() => {
              // setOpenSet(!openSet)
            }}
          ></Button>
        </Space>
      </div>
      <div id="messageBox" style={{ flex: 1, padding: '16 16 0 16', position: 'relative', overflowX: 'hidden', overflowY: openSet ? 'hidden' : 'auto' }}>
        {/* {list.length <= 0 ? (
          <Empty style={{ flex: 1 }}></Empty>
        ) : (
          <div style={{ flex: 1 }}>
            {list.map((item: Message) => {
              return <Box key={item.id} uuid={uuid} item={item} />
            })}
          </div>
        )} */}

        <Drawer title={t('prompt.setting')} placement="right" maskClosable zIndex={0} open={openSet} onClose={() => setOpenSet(false)} getContainer={false}></Drawer>
        <FloatButton.BackTop
          style={{ marginBottom: 105, marginRight: 16 }}
          // @ts-ignore
          target={() => {
            return document.getElementById('messageBox')
          }}
        />
      </div>
    </div>
  )
}

export default OnlinePrompt

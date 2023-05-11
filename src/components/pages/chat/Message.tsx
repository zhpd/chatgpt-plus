import { useSiteContext } from '@/contexts/site'
import { Avatar, Button, Drawer, FloatButton, App, Popconfirm, Space, theme as antdTheme, Tooltip, Typography, Popover } from 'antd'
import { AlignRightOutlined, AlignLeftOutlined, ApiOutlined, DownloadOutlined, DeleteOutlined, DisconnectOutlined, LinkOutlined, ControlOutlined, EllipsisOutlined } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import Empty from './Empty'
import Box from './Box'
import Option from './Option'
import { Chat, Message, ConversationRequest } from '@/types/chat'
import Setting from './Setting'
import { useGetState, useSize } from 'ahooks'
import { useChatContext } from '@/contexts/chat'
import { uuidv4 } from '@/utils/uuid'
import { useChat } from '@/hooks/useChat'
import InputArea from './InputArea'

function Message() {
  const { token } = antdTheme.useToken()
  const { theme } = useSiteContext()
  const { message, modal } = App.useApp()
  const { activeChat, setActiveChat, newChat, newMessage, delChat, upChat } = useChatContext()
  const { t } = useTranslation()
  const { sendMessage, loading } = useChat()
  const [coiled, setCoiled] = useState<boolean>(true)
  const [openSet, setOpenSet] = useState<boolean>(false)
  const [place, setPlace] = useState<'left' | 'right'>('right')
  const [uuid, setUuid] = useState<string>('')
  const [info, setInfo] = useState<Chat>()
  const [tempMessage, setTempMessage] = useState<Message>()
  const [list, setList, getList] = useGetState<Message[]>([]) //  getList() 获取最新的list
  const bodySize = useSize(typeof document !== 'undefined' ? document?.querySelector('body') : null)

  useEffect(() => {
    console.log('activeChat message:', activeChat, activeChat?.uuid)
    if (activeChat) {
      setUuid(activeChat?.uuid as string)
      setInfo(activeChat as Chat)
      setList(activeChat?.messageList || [])
      setPlace(activeChat?.place || 'right')
      setTimeout(() => {
        // 滚动到最底部
        const ele = document?.getElementById('messageBox')
        if (ele) {
          ele.scrollTo(0, ele.scrollHeight)
        }
      }, 150)
    } else {
      setUuid('')
      setInfo(undefined)
      setList([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChat])

  // resend message
  const resendMessage = (_message: Message) => {
    const { inversion, text, requestOptions, conversationOptions } = _message
    // 原消息是否联系上下文
    if (inversion) {
      // 重新发送-自有消息
      sendMessageText(text, conversationOptions as ConversationRequest)
    } else {
      if (requestOptions) {
        // 重新发送-回复消息
        sendMessageText(requestOptions?.prompt, requestOptions?.options as ConversationRequest)
      }
    }
  }
  // send message
  const sendMessageText = (_input: string, options?: { [key: string]: string } | ConversationRequest) => {
    // @ts-ignore
    let text = _input || ''
    // 替换富文本换行\n为\n\n
    text = text.replace(/\n/g, '\n\n')
    console.log('text', text)
    // !todo 过滤输入字符串
    if (!text) return
    // 是否联系上下文,最后一条消息的conversationOptions
    const newOptions = {
      ...(coiled && activeChat?.lastMessage && activeChat?.lastMessage?.conversationId
        ? {
            conversationId: activeChat?.lastMessage?.conversationId,
          }
        : {}),
      ...(coiled && activeChat?.lastMessage && activeChat?.lastMessage?.messageId
        ? {
            parentMessageId: activeChat?.lastMessage?.messageId,
          }
        : {}),
      messageId: uuidv4(),
      ...options,
    }
    console.log('newOptions', newOptions)
    // 配置
    const newConfig = {
      API_TYPE: activeChat?.option?.apitype || 'chatgpt-api',
    }
    const _uuid = activeChat?.uuid || uuidv4()
    setUuid(_uuid)
    const messageId = newOptions?.messageId || uuidv4()
    const nMessage: Message = {
      id: messageId,
      uuid: _uuid,
      dateTime: dayjs().format('YYYY/MM/DD HH:mm:ss'),
      text,
      inversion: true,
      error: false,
      conversationOptions: newOptions,
      requestOptions: {
        prompt: text,
        options: newOptions,
      },
    }
    // 如果初始化刚进来，没有新聊天，则自动创建一个新聊天
    if (!activeChat) {
      const _chat: Chat = {
        uuid: _uuid,
        name: 'ChatGPT',
        lastMessage: nMessage,
        lastMessageText: nMessage?.text || 'No message',
        lastMessageTime: nMessage?.dateTime,
        messageList: [nMessage],
      }
      newChat(_chat)
      setActiveChat(_chat)
    } else {
      const _list = [...getList()]
      _list.push(nMessage)
      setList(_list)
      newMessage(uuid, nMessage)
      // 滚动到最底部
      scrollBottom()
    }
    // 发送请求
    setTimeout(() => {
      sendMessageRequest(text, newOptions, newConfig)
    }, 1000)
  }

  const sendMessageRequest = (text: string, newOptions?: { [key: string]: any } | ConversationRequest, newConfig?: { [key: string]: any }) => {
    // 添加提示符
    const dateTime = dayjs().format('YYYY/MM/DD HH:mm:ss')
    // 接收到回复消息，添加临时-消息列表
    const _tempMesasge = {
      id: uuidv4(),
      uuid: uuid,
      dateTime: dateTime,
      text: "I'm thinking...",
      inversion: false,
      temp: true,
      error: false,
    }
    setTempMessage(_tempMesasge)
    scrollBottom()
    console.log('sendMessageRequest', text, newOptions, newConfig)

    // 发送ChatGPT消息
    sendMessage({
      text,
      options: newOptions,
      config: newConfig,
      onProgress: (e: any, scene: any, body?: any) => {
        // console.log('onProgress', e, scene, body)
        switch (scene) {
          case 'error':
            message.error(body?.err)
            // 接收到回复消息，添加到消息列表
            const errorMesasge = {
              id: body?.id || uuidv4(),
              uuid: uuid,
              dateTime: dateTime,
              text: body?.err || 'Error',
              inversion: false,
              error: true,
              conversationOptions: newOptions,
              requestOptions: {
                prompt: text,
                options: newOptions,
              },
              conversationRequest: {
                conversationId: newOptions?.conversationId,
                parentMessageId: newOptions?.parentMessageId,
              },
              conversationResponse: body,
            }
            setTempMessage(undefined)
            newMessage(uuid, { ...errorMesasge })
            scrollBottom()
            console.log('onProgress', e, scene, body)
            break
          case 'receive':
            // 接收到回复消息，添加临时-消息列表
            if (!body?.text) return
            const _tempMesasge = {
              id: uuidv4(),
              uuid: uuid,
              dateTime: dateTime,
              text: body?.text + '  I ',
              inversion: false,
              temp: true,
              error: false,
            }
            setTempMessage(_tempMesasge)
            scrollBottom()
            console.log('onProgress receive')
            break
          case 'complete':
            // 接收到回复消息，添加到消息列表
            const _messageId = body?.messageId || uuidv4()
            const newMesasge = {
              id: _messageId,
              uuid: uuid,
              dateTime: dateTime,
              text: body?.text,
              inversion: false,
              error: false,
              conversationId: body?.conversationId,
              messageId: _messageId,
              conversationOptions: newOptions,
              requestOptions: {
                prompt: text,
                options: newOptions,
              },
              conversationRequest: {
                conversationId: newOptions?.conversationId,
                parentMessageId: newOptions?.parentMessageId,
              },
              conversationResponse: body,
            }
            // 更新chat的聊天id
            if (uuid && body?.conversationId) {
              upChat(uuid, {
                conversationId: body?.conversationId,
              })
            }
            setTempMessage(undefined)
            newMessage(uuid, { ...newMesasge })
            scrollBottom()
            console.log('onProgress', e, scene, body)
            break
          default:
            break
        }
      },
    }).catch((err: any) => {
      console.log('sendMessage err', err)
    })
  }

  const scrollBottom = () => {
    const ele = document.getElementById('messageBox')
    if (ele) {
      setTimeout(() => {
        ele.scrollTo(0, ele.scrollHeight)
      }, 50)
    }
  }

  const editName = (_name: string) => {
    upChat(uuid, {
      name: _name,
    })
  }
  const editDesc = (_description: string) => {
    upChat(uuid, {
      description: _description,
    })
  }

  const switchPlace = () => {
    const _place = place == 'right' ? 'left' : 'right'
    setPlace(_place)
    upChat(uuid, {
      place: _place,
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
          borderBottom: `1px solid ${theme == 'dark' ? '#42424255' : '#e8e8e855'}`,
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
          <Avatar shape={'circle'} size={42} style={{ padding: 4 }} src={<Image src={info?.avatar || require('@/assets/openai.png')} width={42} height={42} alt="avatar" />} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
            <Typography.Paragraph
              editable={
                activeChat
                  ? {
                      autoSize: true,
                      onChange: (val) => {
                        console.log(val)
                        editName(val)
                      },
                      onEnd: () => {},
                      text: info?.name,
                    }
                  : false
              }
              style={{ fontSize: 16, width: '100%', fontWeight: 500, color: theme === 'dark' ? '#eee' : undefined, margin: 0, display: (bodySize?.width as number) < 400 ? 'none' : 'block' }}
            >
              {info?.name}
            </Typography.Paragraph>
            <Typography.Paragraph
              editable={
                activeChat
                  ? {
                      autoSize: true,
                      onChange: (val) => {
                        editDesc(val)
                      },
                      onEnd: () => {},
                    }
                  : false
              }
              style={{ fontSize: 12, width: '100%', color: theme === 'dark' ? '#eee' : undefined, margin: 0, display: (bodySize?.width as number) < 500 ? 'none' : 'block' }}
            >
              {info?.description}
            </Typography.Paragraph>
          </div>
        </div>
        <Space>
          <Button
            type={'default'}
            size="middle"
            icon={<ControlOutlined />}
            onClick={() => {
              modal.info({
                title: t('chat.optionTitle') as string,
                centered: true,
                closable: true,
                footer: null,
                content: <Option chat={activeChat as Chat} />,
              })
            }}
          ></Button>
          <Button
            type={'default'}
            size="middle"
            icon={<ApiOutlined />}
            onClick={() => {
              message.warning(t('chat.api_warning'))
            }}
          ></Button>
          <Tooltip trigger={['hover']} title={t('chat.coiledText', { status: coiled ? t('c.open') : t('c.close') })}>
            <Button
              type={coiled ? 'default' : 'dashed'}
              size="middle"
              style={{ color: coiled ? token.colorPrimary : undefined }}
              icon={coiled ? <LinkOutlined rotate={-45} /> : <DisconnectOutlined rotate={-45} />}
              onClick={() => setCoiled(!coiled)}
            ></Button>
          </Tooltip>
          <Popconfirm
            key="del"
            title="Delete the chat"
            description="Are you sure to delete this chat?"
            onConfirm={(e?: React.MouseEvent<HTMLElement>) => {
              delChat(uuid)
              return
            }}
            onCancel={(e?: React.MouseEvent<HTMLElement>) => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button type={'default'} size="middle" style={{ color: token.colorError }} icon={<DeleteOutlined />}></Button>
          </Popconfirm>
          <Button type={'default'} size="middle" icon={place === 'left' ? <AlignLeftOutlined /> : <AlignRightOutlined />} onClick={switchPlace}></Button>
          <Button
            type={'default'}
            size="middle"
            icon={<DownloadOutlined />}
            onClick={() => {
              message.info(t('c.devBuilding'))
            }}
          ></Button>
          {/* <Button
            type={'default'}
            size="middle"
            icon={<MoreOutlined />}
            onClick={() => {
              // setOpenSet(!openSet)
            }}
          ></Button> */}
        </Space>
      </div>
      <div id="messageBox" style={{ flex: 1, padding: '16 16 0 16', position: 'relative', overflowX: 'hidden', overflowY: openSet ? 'hidden' : 'auto' }}>
        {list.length <= 0 ? (
          <Empty style={{ flex: 1 }}></Empty>
        ) : (
          <div style={{ flex: 1 }}>
            {list.map((item: Message) => {
              return <Box key={item.id} uuid={uuid} item={item} place={item.inversion == false ? 'left' : place} resendMessage={resendMessage} />
            })}
            {tempMessage && <Box key={tempMessage.id} uuid={uuid} item={tempMessage} place={tempMessage.inversion == false ? 'left' : place} />}
          </div>
        )}

        <Drawer title={t('chat.setting')} placement="right" maskClosable zIndex={0} open={openSet} onClose={() => setOpenSet(false)} getContainer={false}>
          <Setting uuid={uuid}></Setting>
        </Drawer>
        <FloatButton.BackTop
          style={{ marginBottom: 105, marginRight: 16 }}
          // @ts-ignore
          target={() => {
            return document.getElementById('messageBox')
          }}
        />
      </div>
      <div
        style={{
          width: '100%',
          minHeight: '70px',
          textAlign: 'center',
          padding: '15px 0',
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          backgroundColor: theme === 'dark' ? undefined : '#fff',
        }}
      >
        <InputArea coiled={coiled} setCoiled={setCoiled} sendMessageText={sendMessageText}></InputArea>
      </div>
    </div>
  )
}

export default Message

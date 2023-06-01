import { useSiteContext } from '@/contexts/site'
import { Avatar, Button, Mentions, Popconfirm, Space, Tooltip, Typography, theme as antdTheme } from 'antd'
import { DisconnectOutlined, LinkOutlined, SendOutlined } from '@ant-design/icons'
import type { Message } from '@/types/chat'
import type { MentionsOptionProps } from 'antd/es/mentions'
import { useEffect, useState } from 'react'
import { useKeyPress } from 'ahooks'
import { t } from 'i18next'
import { usePromptContext, useSettingContext } from '@/contexts'

export type BoxProps = {
  coiled: boolean
  setCoiled: (val: boolean) => void
  sendMessageText: (text: string) => void
}

function InputArea(props: BoxProps) {
  const { coiled, setCoiled, sendMessageText } = props
  const { promptList } = usePromptContext()
  const { common: commonConfig } = useSettingContext()
  const [plist, setPlist] = useState<{ label: any; value: string }[]>([])
  const [input, setInput] = useState<string>('')
  const [canSend, setCanSend] = useState<boolean>(false)
  const { theme } = useSiteContext()
  const { token } = antdTheme.useToken()

  useEffect(() => {
    if (promptList) {
      const list =
        promptList?.map?.((item) => {
          return {
            key: item.uuid as string,
            label: (
              <div>
                <p>{item.name as string}</p>
              </div>
            ),
            value: item.prompt as string,
          }
        }) || []
      setPlist(list)
    }
  }, [promptList])

  // input change
  const inputChange = (val: string) => {
    setInput(val)
    if (val) {
      setCanSend(true)
    } else {
      setCanSend(false)
    }
  }

  const onSend = () => {
    setCanSend(false)
    setInput('')
    sendMessageText(input)
  }

  useKeyPress(
    [commonConfig?.send_style || 'ctrl.enter'],
    (event) => {
      console.log('event', event)
      onSend()
      setTimeout(() => {
        setInput('')
      }, 200)
    },
    {
      exactMatch: true,
      // events: ['keydown', 'keyup'],
    }
  )

  return (
    <div
      style={{
        width: '100%',
        display: 'inline-flex',
        justifyContent: 'center',
      }}
    >
      <Tooltip trigger={['hover']} title={t('chat.coiledText', { status: coiled ? t('c.open') : t('c.close') })}>
        <Button
          type={coiled ? 'default' : 'dashed'}
          size="large"
          style={{ marginLeft: 10, marginRight: 10, color: coiled ? token.colorPrimary : undefined }}
          icon={coiled ? <LinkOutlined rotate={-45} /> : <DisconnectOutlined rotate={-45} />}
          onClick={() => setCoiled(!coiled)}
        ></Button>
      </Tooltip>
      <Mentions
        style={{ width: '100%', paddingRight: -5, textAlign: 'left' }}
        autoFocus={true}
        placeholder={t('chat.inputPlaceholder') || ''}
        autoSize={true}
        placement={'top'}
        value={input}
        prefix={['/']}
        onChange={inputChange}
        options={[...plist]}
      />
      {/* <Input.TextArea
          // ref={refInput}
          autoFocus={true}
          allowClear
          autoSize={true}
          style={{ width: 'calc(80% - 20px)', paddingRight: -5 }}
          placeholder={t('chat.inputPlaceholder') || ''}
          size={'large'}
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            if (e.target.value) {
              setCanSend(true)
            } else {
              setCanSend(false)
            }
          }}
          onPressEnter={(e) => {
            sendMessageText(input)
          }}
        ></Input.TextArea> */}
      <Button type="primary" ghost={false} size="large" icon={<SendOutlined rotate={-45} />} disabled={canSend ? false : true} style={{ marginLeft: 10, marginRight: 10 }} onClick={onSend}>
        {t('chat.send')}
      </Button>
    </div>
  )
}

export default InputArea

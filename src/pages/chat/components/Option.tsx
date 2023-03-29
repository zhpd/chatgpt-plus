import { useSiteContext } from '@/contexts/site'
import { Checkbox, Form, Input, InputNumber, Slider, Radio, Select, Switch, theme as antdTheme, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Chat } from '@/types/chat'
import { useChatContext } from '@/contexts'
import { useTranslation } from '@/locales'
import { useEffect, useState } from 'react'

function Option(props: { chat: Chat }) {
  const { chat } = props
  const { theme } = useSiteContext()
  const [apitype, setApitype] = useState<'chatgpt-web' | 'chatgpt-api' | undefined>((chat?.option?.apiType as 'chatgpt-web' | 'chatgpt-api') || 'chatgpt-web')
  const { token } = antdTheme.useToken()
  const { t } = useTranslation()
  const { upChat } = useChatContext()
  const [initValue] = useState<{ [key: string | number]: string }>({
    apitype: 'chatgpt-web',
    model: 'chatgpt-web' == apitype ? 'text-davinci-002-render-sha' : 'gpt-3.5-turbo',
    // @ts-ignore
    max_tokens: 4096,
    ...chat?.option,
  })
  const [form] = Form.useForm()

  const onValuesChange = (changedValues: any, values: any) => {
    console.log('changedValues', changedValues)
    if (apitype !== values.apitype) {
      setApitype(values.apitype)
      if ('chatgpt-web' == values.apitype) {
        form.setFieldsValue({
          model: 'text-davinci-002-render-sha',
        })
      }
      if ('chatgpt-api' == values.apitype) {
        form.setFieldsValue({
          model: 'gpt-3.5-turbo',
        })
      }
    }
    upChat(chat.uuid, { ...changedValues })
  }

  return (
    <>
      <Form
        form={form}
        initialValues={{ ...initValue }}
        onValuesChange={onValuesChange}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14, offset: 1 }}
        layout="horizontal"
        size="small"
        style={{ minWidth: '300px' }}
      >
        <Form.Item label={t('chat.option.apiType')} name="apitype">
          <Radio.Group optionType="button" buttonStyle="solid" size="small">
            <Radio value="chatgpt-web"> {t('chat.option.apiTypeWEB')} </Radio>
            <Radio value="chatgpt-api"> {t('chat.option.apiTypeAPI')} </Radio>
          </Radio.Group>
        </Form.Item>
        {'chatgpt-api' == apitype && (
          <>
            <Form.Item label="model" name="model">
              <Select getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                <Select.Option value="gpt-3.5-turbo">gpt-3.5-turbo</Select.Option>
                <Select.Option value="gpt-3.5-turbo-0301">gpt-3.5-turbo-0301</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="max_tokens" name="max_tokens">
              <InputNumber max={4096} />
            </Form.Item>
            <Form.Item label="frequency_penalty" name="frequency_penalty">
              <Slider min={-2.0} max={2.0} step={0.1} tooltip={{getPopupContainer: (triggerNode) => triggerNode.parentElement as HTMLElement }} />
              <Typography.Text>{form.getFieldValue('frequency_penalty')}</Typography.Text>
            </Form.Item>
            <Form.Item label="logit_bias" name="logit_bias">
              <Slider min={-100} max={200} step={1} tooltip={{ getPopupContainer: (triggerNode) => triggerNode.parentElement as HTMLElement }} />
              <Typography.Text>{form.getFieldValue('logit_bias')}</Typography.Text>
            </Form.Item>
            <Form.Item label="presence_penalty" name="presence_penalty">
              <Slider min={-2.0} max={2.0} step={0.1} tooltip={{ getPopupContainer: (triggerNode) => triggerNode.parentElement as HTMLElement }} />
              <Typography.Text>{form.getFieldValue('presence_penalty')}</Typography.Text>
            </Form.Item>
            <Form.Item label="temperature" name="temperature">
              <Slider min={0} max={2} step={0.1} tooltip={{ getPopupContainer: (triggerNode) => triggerNode.parentElement as HTMLElement }} />
              <Typography.Text>{form.getFieldValue('temperature')}</Typography.Text>
            </Form.Item>
            <Form.Item label="top_p" name="top_p">
              <Slider min={0} max={1} step={0.1} tooltip={{ getPopupContainer: (triggerNode) => triggerNode.parentElement as HTMLElement }} />
            </Form.Item>
          </>
        )}
        {'chatgpt-web' == apitype && (
          <>
            <Form.Item label="model" name="model">
              <Select disabled getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                <Select.Option value="text-davinci-002-render-sha">text-davinci-002-render-sha</Select.Option>
              </Select>
            </Form.Item>
          </>
        )}
      </Form>
    </>
  )
}

export default Option

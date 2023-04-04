import { useSiteContext } from '@/contexts/site'
import { Checkbox, Form, Input, InputNumber, Slider, Radio, Select, Switch, theme as antdTheme, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Chat } from '@/types/chat'
import { useChatContext } from '@/contexts'
import { useTranslation } from '@/locales'
import { useEffect, useState } from 'react'

function Option(props: { chat: Chat }) {
  const { chat } = props
  const { t } = useTranslation()
  const { upChat } = useChatContext()
  const { theme } = useSiteContext()
  const { token } = antdTheme.useToken()
  const [apitype, setApitype] = useState<'chatgpt-web' | 'chatgpt-api'>('chatgpt-web')
  const [modelList, setModelList] = useState<{ [key: string]: any }[]>([])
  const [option, setOption] = useState<{ [key: string]: string | number }>({
    apitype: 'chatgpt-web',
    model: 'chatgpt-web' == apitype ? 'text-davinci-002-render-sha' : 'gpt-3.5-turbo',
    max_tokens: 4000,
    temperature: 0.8,
    top_p: 1.0,
    presence_penalty: 1.0,
    frequency_penalty: 0,
  })
  const [form] = Form.useForm()

  useEffect(() => {
    setApitype(chat?.option?.apitype || 'chatgpt-web')
    setOption({ ...option, ...chat?.option })
    form.setFieldsValue({ ...option, ...chat?.option })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const _apitype = apitype
    if ('chatgpt-web' == _apitype) {
      setModelList([
        {
          label: 'text-davinci-002-render-sha',
          value: 'text-davinci-002-render-sha',
          disabled: true,
        },
      ])
    }
    if ('chatgpt-api' == _apitype) {
      setModelList([
        {
          label: 'gpt-3.5-turbo',
          value: 'gpt-3.5-turbo',
        },
        {
          label: 'gpt-3.5-turbo-0301',
          value: 'gpt-3.5-turbo-0301',
        },
        {
          label: 'gpt-4',
          value: 'gpt-4',
          disabled: true,
        },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apitype])

  const onValuesChange = (changedValues: any, values: any) => {
    console.log('changedValues', changedValues)
    const _option = { ...option, ...changedValues }
    if (changedValues?.apitype) {
      setApitype(changedValues.apitype)
      if ('chatgpt-api' == changedValues.apitype) {
        form.setFieldsValue({
          model: 'gpt-3.5-turbo',
        })
        _option.model = 'gpt-3.5-turbo'
      }
      if ('chatgpt-web' == changedValues.apitype) {
        form.setFieldsValue({
          model: 'text-davinci-002-render-sha',
        })
        _option.model = 'text-davinci-002-render-sha'
      }
    }
    setOption({ ..._option })
    chat?.uuid && upChat(chat?.uuid, { option: { ..._option } })
  }

  function onFieldsChange(changedFields: any, allFields: any): void {
    console.log('changedFields', changedFields)
  }

  return (
    <>
      <Form
        form={form}
        initialValues={{ ...option }}
        onValuesChange={onValuesChange}
        onFieldsChange={onFieldsChange}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14, offset: 1 }}
        layout="horizontal"
        size="small"
        style={{ minWidth: '340px' }}
      >
        <Form.Item label={t('chat.option.apiType')} name="apitype">
          <Radio.Group optionType="button" buttonStyle="solid" size="small">
            <Radio value="chatgpt-web"> {t('chat.option.apiTypeWEB')} </Radio>
            <Radio value="chatgpt-api"> {t('chat.option.apiTypeAPI')} </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={t('chat.option.model')} tooltip={{ title: t('chat.option.modelTip') }} name="model">
          <Select disabled={'chatgpt-web' == apitype}>
            {modelList.map((item) => (
              <Select.Option key={item?.value} value={item.value} disabled={item.disabled}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={t('chat.option.max_tokens')} tooltip={{ title: t('chat.option.max_tokensTip') }} name="max_tokens">
          <InputNumber max={4096} disabled={'chatgpt-web' == apitype} />
        </Form.Item>
        <Form.Item label={t('chat.option.top_p')} tooltip={{ title: t('chat.option.top_pTip') }} name="top_p">
          <Slider min={0} max={1} step={0.1} range={false} disabled={'chatgpt-web' == apitype} marks={{ [parseFloat(form.getFieldValue('top_p'))]: parseFloat(form.getFieldValue('top_p')) }} />
        </Form.Item>
        <Form.Item label={t('chat.option.temperature')} tooltip={{ title: t('chat.option.temperatureTip') }} name="temperature">
          <Slider
            min={0.0}
            max={0.9}
            step={0.1}
            range={false}
            disabled={'chatgpt-web' == apitype}
            marks={{ [parseFloat(form.getFieldValue('temperature'))]: parseFloat(form.getFieldValue('temperature')) }}
          />
        </Form.Item>
        <Form.Item label={t('chat.option.presence_penalty')} tooltip={{ title: t('chat.option.presence_penaltyTip') }} name="presence_penalty">
          <Slider
            min={-2.0}
            max={2.0}
            step={1}
            range={false}
            disabled={'chatgpt-web' == apitype}
            marks={{ [parseFloat(form.getFieldValue('presence_penalty'))]: parseFloat(form.getFieldValue('presence_penalty')) }}
          />
        </Form.Item>
        <Form.Item label={t('chat.option.frequency_penalty')} tooltip={{ title: t('chat.option.frequency_penaltyTip') }} name="frequency_penalty">
          <Slider
            min={-2.0}
            max={2.0}
            step={1}
            range={false}
            disabled={'chatgpt-web' == apitype}
            marks={{ [parseFloat(form.getFieldValue('frequency_penalty'))]: parseFloat(form.getFieldValue('frequency_penalty')) }}
          />
        </Form.Item>
      </Form>
    </>
  )
}

export default Option

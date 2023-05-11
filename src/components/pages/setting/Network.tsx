import { useSiteContext } from '@/contexts/site'
import { Checkbox, Form, Input, InputNumber, Slider, Radio, Select, Switch, theme as antdTheme, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Chat } from '@/types/chat'
import { useSettingContext } from '@/contexts'
import { useTranslation } from '@/locales'
import { useEffect, useState } from 'react'
import Box from './Box'

function Setting(props: { children?: React.ReactElement; style?: React.CSSProperties }) {
  const { t } = useTranslation()
  const { network, setNetwork } = useSettingContext()
  const [form] = Form.useForm()
  const [option, setOption] = useState<{ [key: string]: string | number | boolean }>({
    API_TYPE: 'chatgpt-api',
    OPENAI_API_KEY: '',
    OPENAI_API_BASE_URL: '',
    OPENAI_ACCESS_TOKEN: '',
    API_REVERSE_PROXY: '',
    ...network
  })

  useEffect(() => {
    setOption({ ...option, ...network })
    form.setFieldsValue({ ...option, ...network })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network])

  const onValuesChange = (changedValues: any, values: any) => {
    console.log('changedValues', changedValues)
    const _option = { ...option, ...changedValues }
    setOption({ ..._option })
    setNetwork && setNetwork({ ..._option })
  }

  return (
    <Box style={{...props?.style}}>
      <Form
        form={form}
        initialValues={{ ...option }}
        onValuesChange={onValuesChange}
        labelCol={{ span: 6}}
        // wrapperCol={{ span: 14, offset: 1 }}
        layout="horizontal"
      // style={{ minWidth: '340px' }}
      >
        <Form.Item label={t('setting.m_network_option.DEFAULT_API_TYPE')} name="API_TYPE">
          <Radio.Group size="small">
            <Radio value={'chatgpt-web'}>
              {t('setting.m_network_option.apiTypeWEB')}
            </Radio>
            <Radio value={'chatgpt-api'}>
              {t('setting.m_network_option.apiTypeAPI')}
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={t('setting.m_network_option.OPENAI_API_KEY')} name="OPENAI_API_KEY">
          <Input />
        </Form.Item>
        <Form.Item label={t('setting.m_network_option.OPENAI_API_BASE_URL')} name="OPENAI_API_BASE_URL">
          <Input />
        </Form.Item>
        <Form.Item label={t('setting.m_network_option.OPENAI_ACCESS_TOKEN')} name="OPENAI_ACCESS_TOKEN">
          <Input />
        </Form.Item>
        <Form.Item label={t('setting.m_network_option.API_REVERSE_PROXY')} name="API_REVERSE_PROXY">
          <Input />
        </Form.Item>
      </Form>
    </Box>
  )
}

export default Setting

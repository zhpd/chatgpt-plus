import { useSiteContext } from '@/contexts/site'
import { Checkbox, Form, Input, InputNumber, Slider, Radio, Select, Switch, theme as antdTheme, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Chat } from '@/types/chat'
import { useSettingContext } from '@/contexts'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

function Setting() {
  const { t, i18n } = useTranslation()
  const { common, setCommon } = useSettingContext()
  const { lang, setLang } = useSiteContext()
  const [form] = Form.useForm()
  const [option, setOption] = useState<{ [key: string]: string | number | boolean }>({
    lang: 'zh-CN',
    send_style: 'ctrl+enter',
    ...common
  })
  const langList = [
    { label: '简体中文', value: 'zh-CN' },
    { label: '繁體中文', value: 'zh-TW' },
    { label: 'English', value: 'en-US' },
  ]
  const styleList = [
    { label: 'Ctrl + Enter', value: 'ctrl+enter' },
    { label: 'Enter', value: 'enter' },
  ]

  useEffect(() => {
    setOption({ ...option, ...common })
    form.setFieldsValue({ ...option, ...common })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [common])

  const onValuesChange = (changedValues: any, values: any) => {
    console.log('changedValues', changedValues)
    if (changedValues['lang']) {
      console.log('changedValues lang', changedValues['lang'])
      setLang(changedValues['lang'])
      i18n.changeLanguage(changedValues['lang'])
    }
    const _option = { ...option, ...changedValues }
    setOption({ ..._option })
    setCommon && setCommon({ ..._option })
  }

  return (
    <>
      <Form
        form={form}
        initialValues={{ ...option }}
        onValuesChange={onValuesChange}
        labelCol={{ span: 6 }}
        // wrapperCol={{ span: 14, offset: 1 }}
        layout="horizontal"
      // style={{ minWidth: '340px' }}
      >
        <Form.Item label={t('setting.m_common_option.lang')} name="lang">
          <Select
            defaultValue="zh-CN"
            style={{ width: 120 }}
            options={langList}
          />
        </Form.Item>
        <Form.Item label={t('setting.m_common_option.send_message_style')} name="send_style">
          <Select
            defaultValue="ctrl+enter"
            style={{ width: 120 }}
            options={styleList}
          />
        </Form.Item>
      </Form>
    </>
  )
}

export default Setting

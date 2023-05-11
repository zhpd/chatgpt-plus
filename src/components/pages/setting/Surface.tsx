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
  const { surface, setSurface } = useSettingContext()
  const { lang, setTheme } = useSiteContext()
  const [form] = Form.useForm()
  const [option, setOption] = useState<{ [key: string]: string | number | boolean }>({
    theme: 'light',
    colorPrimary: '#1677ff',
    radius: 4,
    loose: 'default',
    ...surface
  })
  const themeList = [
    { label: '', value: 'light', color: '#ffffff' },
    { label: '', value: 'dark', color: '#000000' },
    { label: '', value: 'green', color: '#00B96B' },
    { label: '', value: 'f60', color: '#ff6600' },
  ]

  useEffect(() => {
    setOption({ ...option, ...surface })
    form.setFieldsValue({ ...option, ...surface })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surface])

  const onValuesChange = (changedValues: any, values: any) => {
    console.log('changedValues', changedValues)
    if (changedValues['theme']) {
      if (changedValues['theme'] == 'light' || changedValues['theme'] == 'dark') {
        setTheme(changedValues['theme'])
      } else {
        // 获取颜色
        const _theme = themeList.find((item) => item.value == changedValues['theme'])
        if (_theme?.color) {
          form.setFieldValue('colorPrimary', _theme?.color)
          changedValues.colorPrimary = _theme?.color
        }
      }
    }
    const _option = { ...option, ...changedValues }
    setOption({ ..._option })
    setSurface && setSurface({ ..._option })
  }

  return (
    <Box style={{...props?.style}}>
      <Form
        form={form}
        initialValues={{ ...option }}
        onValuesChange={onValuesChange}
        labelCol={{ span: 6 }}
        // wrapperCol={{ span: 14, offset: 1 }}
        layout="horizontal"
      // style={{ minWidth: '340px' }}
      >
        <Form.Item label={t('setting.m_surface_option.theme')} name="theme">
          <Radio.Group size="small">
            {themeList.map((item) => (
              <Radio key={item.value} value={item.value}>
                <div style={{ width: 50, height: 50, borderRadius: 10, backgroundColor: item?.color || undefined, border: '2px solid #efefef' }}></div>
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label={t('setting.m_surface_option.colorPrimary')} name="colorPrimary">
          <Input style={{ width: '90px' }} />
        </Form.Item>
        <Form.Item label={t('setting.m_surface_option.radius')} name="radius">
          <InputNumber />
        </Form.Item>
        <Form.Item label={t('setting.m_surface_option.loose')} name="loose">
          <Radio.Group size="small">
            <Radio value={'default'}>
              {t('setting.m_surface_option.default')}
            </Radio>
            <Radio value={'loose'}>
              {t('setting.m_surface_option.loose')}
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Box>
  )
}

export default Setting

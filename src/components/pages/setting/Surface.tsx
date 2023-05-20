import { useSiteContext } from '@/contexts/site'
import { Checkbox, Form, Input, InputNumber, Slider, Radio, Select, Switch, theme as antdTheme, Typography, ColorPicker } from 'antd'
import type { Color } from 'antd/es/color-picker';
import { PlusOutlined } from '@ant-design/icons'
import { Chat } from '@/types/chat'
import { useSettingContext } from '@/contexts'
import { useTranslation } from '@/locales'
import { useEffect, useState } from 'react'
import Box from './Box'

function Setting(props: { children?: React.ReactElement; style?: React.CSSProperties }) {
  const { t } = useTranslation()
  const { surface, setSurface } = useSettingContext()
  const [form] = Form.useForm()
  const [option, setOption] = useState<{ [key: string]: string | number | boolean }>({
    colorPrimary: '#1677ff',
    radius: 4,
    loose: 'default',
    ...surface
  })
  const themeList = [
    { label: '', value: '#1677ff'},
    { label: '', value: '#00B96B'},
    { label: '', value: '#ff6600'},
  ]

  useEffect(() => {
    setOption({ ...option, ...surface })
    form.setFieldsValue({ ...option, ...surface })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surface])

  const onValuesChange = (changedValues: any, values: any) => {
    console.log('changedValues', changedValues)
    if(changedValues.colorPrimary){
      // 判断Color类型
      if(typeof changedValues.colorPrimary === 'object'){
        changedValues.colorPrimary = changedValues.colorPrimary?.toHexString?.()
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
        <Form.Item label={t('setting.m_surface_option.theme')} name="colorPrimary">
          <Radio.Group size="small">
            {themeList.map((item) => (
              <Radio key={item.value} value={item.value}>
                <div style={{ width: 50, height: 50, borderRadius: 10, backgroundColor: item?.value || undefined, border: '2px solid #efefef' }}></div>
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label={t('setting.m_surface_option.colorPrimary')} name="colorPrimary">
          <ColorPicker format={'hex'} />
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

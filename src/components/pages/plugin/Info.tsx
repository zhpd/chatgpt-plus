import { useSiteContext } from '@/contexts/site'
import {
  Avatar,
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Radio,
  Select,
  Space,
  Switch,
  theme as antdTheme,
  TreeSelect,
  Typography,
  Upload,
  Divider,
  Slider,
  Collapse,
  Descriptions,
} from 'antd'
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { usePluginContext } from '@/contexts'
import { Plugin } from '@/types/plugin'
import { useTranslation } from '@/locales'
import { uuidv4 } from '@/utils/uuid'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Model, ModelList, LanguageList } from '@/config/constant'
import { useRouter } from 'next/router'

function Info(props: { plugin?: Plugin; }) {
  const { plugin, } = props
  const { theme, lang } = useSiteContext()
  const { t } = useTranslation()
  const { token } = antdTheme.useToken()
  const [item, setItem] = useState<Plugin>(plugin as Plugin)

  useEffect(() => {
    // 获取语言,语言-换成_，如果没有则使用默认语言
    const _lang = lang.replace('-', '_')
    const langInfo = plugin?.lang?.[_lang] || {}
    setItem({
      ...plugin as Plugin,
      ...langInfo,
    })
  }, [plugin, lang])


  return (
    <div style={{ flex: 1, paddingTop: '30', display: 'flex', flexDirection: 'column', overflowX: 'hidden', width: '100%' }}>
      <Descriptions title={<div style={{ flexDirection: 'row', display: 'flex', margin: '2px', alignItems: 'center' }}  >
        <Image
          src={item.image as string}
          width={104}
          height={104}
          alt={item.name as string}
          style={{ borderRadius: 4, padding: '0px', overflow: 'hidden', border: `1px solid ${token.colorBorder}` }}
        />
        <Typography.Text style={{ fontSize: 14, marginLeft: '10px', fontWeight: 400 }}>{item.name}</Typography.Text>
      </div>} column={1} bordered size='small'>
        <Descriptions.Item label="Name">{item?.name}</Descriptions.Item>
        <Descriptions.Item label="Intro">{item?.intro}</Descriptions.Item>
        <Descriptions.Item label="Description">{item?.description}</Descriptions.Item>
        <Descriptions.Item label="Namespace">{item?.namespace}</Descriptions.Item>
        <Descriptions.Item label="Mail">{item?.mail}</Descriptions.Item>
        <Descriptions.Item label="Website"><Button type='link' href={item?.website} target={'_blank'} style={{ paddingLeft: 0 }}>{item?.website}</Button></Descriptions.Item>
        <Descriptions.Item label="ApiUrl"><Button type='link' href={item?.apiurl} target={'_blank'} style={{ paddingLeft: 0 }}>{item?.apiurl}</Button></Descriptions.Item>
        <Descriptions.Item label="Intro">{plugin?.intro}</Descriptions.Item>
        <Descriptions.Item label="Descr">{plugin?.description}</Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default Info

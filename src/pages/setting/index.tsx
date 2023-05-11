import { Button, Result, Empty, Layout, theme as antdTheme, Tabs, TabsProps } from 'antd'
import { SkinOutlined, ControlOutlined, IdcardOutlined, ExceptionOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
import { useEffect, useState } from 'react'
import Surface from '@/components/pages/setting/Surface'
import Network from '@/components/pages/setting/Network'
import Common from '@/components/pages/setting/Common'

function IndexPage() {
  const { lang, setTitle } = useSiteContext()
  const { t } = useTranslation()
  const { token } = antdTheme.useToken()
  const [items, setItems] = useState<any[]>([])
  const _list: TabsProps['items'] = [
    {
      key: 'surface',
      label: (
        <span>
          <SkinOutlined />
          {t('setting.m_surface')}
        </span>
      ),
      children: <Surface style={{ paddingTop: 10 }} />,
    },
    {
      key: 'common',
      label: (
        <span>
          <ControlOutlined />
          {t('setting.m_common')}
        </span>
      ),
      children: <Common style={{ paddingTop: 10 }} />,
    },
    {
      key: 'network',
      label: (
        <span>
          <IdcardOutlined />
          {t('setting.m_network')}
        </span>
      ),
      children: <Network style={{ paddingTop: 10 }} />,
    },
  ]
  useEffect(() => {
    const title = t('window.title', { title: t('c.setting') })
    setTitle(title)
  }, [setTitle, t])

  useEffect(() => {
    setItems(_list)
  }, [lang])

  const onChange = (key: string) => {
    console.log(key)
  }

  return (
    <div style={{ background: token.colorBgContainer, padding: 5, display: 'flex', width: '100%', height: '100%' }}>
      <Tabs defaultActiveKey="surface" tabPosition="left" destroyInactiveTabPane={false} items={items} onChange={onChange} style={{width: '100%'}} />
    </div>
  )
}

export default IndexPage

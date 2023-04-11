import { Button, Result, Empty, Layout, theme as antdTheme, Tabs, TabsProps } from 'antd'
import { SkinOutlined, ControlOutlined, IdcardOutlined, ExceptionOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
import { useEffect, useState } from 'react'
import Surface from './Surface'
import Network from './Network'
import Common from './Common'

const emptyStyle: React.CSSProperties = {
  height: '100%',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}

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
      children: <Surface />,
    },
    {
      key: 'common',
      label: (
        <span>
          <ControlOutlined />
          {t('setting.m_common')}
        </span>
      ),
      children: <Common />,
    },
    {
      key: 'network',
      label: (
        <span>
          <IdcardOutlined />
          {t('setting.m_network')}
        </span>
      ),
      children: <Network />,
    },
  ]

  // {
  //   key: 'feedback',
  //   label: (
  //     <span>
  //       <ExceptionOutlined />
  //       {t('setting.m_feedback')}
  //     </span>
  //   ),
  //   children: <Empty style={{ ...emptyStyle }} description="正在添加更多AI功能，敬请期待！" />,
  // },
  // {
  //   key: 'about',
  //   label: (
  //     <span>
  //       <ExclamationCircleOutlined />
  //       {t('setting.m_about')}
  //     </span>
  //   ),
  //   children: <Empty style={{ ...emptyStyle }} description="正在添加更多AI功能，敬请期待！" />,
  // },
  useEffect(() => {
    const title = t('window.title', { title: t('c.setting') })
    setTitle(title)
  }, [setTitle, t])

  useEffect(() => {
    setItems(_list)
  }, [lang])

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div style={{ background: token.colorBgContainer }}>
      <Tabs defaultActiveKey="surface" destroyInactiveTabPane={true} items={items} onChange={onChange} />
    </div>
  )
}

export default IndexPage

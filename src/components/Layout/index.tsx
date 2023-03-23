import { useRouter } from 'next/router'
import { ConfigProvider, Layout, Menu, theme as antdTheme, Avatar, Space, Button, Typography } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RocketOutlined,
  SkinOutlined,
  ApiOutlined,
  BulbOutlined,
  SettingOutlined,
  ShareAltOutlined,
  MessageOutlined,
  UserOutlined,
  SkinFilled,
} from '@ant-design/icons'
const { Header, Sider, Content } = Layout
import React, { useEffect, useState } from 'react'
import { tool } from '@/utils'
import { useSiteContext } from '@/contexts/site'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

export default function LayoutBase(props: any) {
  const { token } = antdTheme.useToken()
  const { t } = useTranslation()
  const { theme, setTheme } = useSiteContext()
  const router = useRouter()
  const [colorBgContainer, setColorBgContainer] = useState(token.colorBgContainer)
  const [colorPrimary, setColorPrimary] = useState(token.colorPrimary)
  const [collapsed, setCollapsed] = useState(true)
  const iconColor = '#CCC'
  const menuList = [
    { name: t('c.message'), path: '/chat', icon: <MessageOutlined />, iconColor: iconColor, iconColorActive: colorPrimary },
    { name: t('c.prompt'), path: '/prompt', icon: <BulbOutlined />, iconColor: iconColor, iconColorActive: colorPrimary },
    { name: t('c.share'), path: '/share', icon: <ShareAltOutlined />, iconColor: iconColor, iconColorActive: colorPrimary },
    { name: t('c.store'), path: '/store', icon: <ApiOutlined />, iconColor: iconColor, iconColorActive: colorPrimary },
  ]
  const [menu, setMenu] = useState<any>(menuList[0])

  const toUrl = (url: string) => {
    router.push(url)
  }

  const getActive = (path: string) => {
    const { pathname } = router
    if (pathname == '/') {
      return path == '/chat'
    }
    if (pathname == path) {
      return true
    }
    return false
  }

  const switchTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setColorBgContainer(newTheme == 'dark' ? token.colorFillContent : token.colorBgContainer)
    setColorPrimary(token.colorPrimary)
    setTheme(newTheme)
    console.log('newTheme', newTheme)
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <Head>
        <title>{props?.title || 'ChatGPT-Plus'}</title>
        <meta property="og:title" content={props?.title} key={props?.title} />
      </Head>
      <Layout style={{ borderRadius: '6px', overflow: 'hidden', height: 'calc(100vh - 20px)', margin: '10px', backgroundColor:'#000' }}>
        <Sider theme="dark" width={120} trigger={null} collapsible collapsed={collapsed}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <Avatar style={{ marginTop: 5 }} size={48} shape="square" icon={<RocketOutlined />} />
            <Space direction="vertical" size={'middle'} style={{ marginTop: 60 }}>
              {menuList.map((item, index) => {
                return (
                  <Button
                    key={item.path}
                    onClick={() => {
                      setMenu(item)
                      toUrl(item.path)
                    }}
                    ghost={getActive(item.path) ? false : true}
                    size={'large'}
                    icon={item.icon}
                    style={{ border: 'none', color: getActive(item.path) ? item.iconColorActive : item.iconColor }}
                  >
                    {collapsed ? '' : item.name}
                  </Button>
                )
              })}
            </Space>
            <Space direction="vertical" size={'small'} style={{ bottom: 20, position: 'absolute' }}>
              <Button
                onClick={() => {
                  // 切换antd主题
                  switchTheme()
                }}
                ghost
                style={{ border: 'none' }}
                size={'large'}
                icon={theme === 'dark' ? <SkinFilled style={{ color: iconColor }} /> : <SkinOutlined style={{ color: iconColor }} />}
              ></Button>
              <Button
                onClick={() => {
                  // 设置弹窗
                  tool.showModal(<div>设置</div>, {
                    title: '设置',
                  })
                }}
                ghost
                style={{ border: 'none' }}
                size={'large'}
                icon={<SettingOutlined style={{ color: iconColor }} />}
              ></Button>
              <Button
                onClick={() => setCollapsed(!collapsed)}
                ghost
                style={{ border: 'none' }}
                size={'large'}
                icon={React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  style: { color: iconColor },
                })}
              ></Button>
            </Space>
          </div>
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              background: colorBgContainer,
              borderBottom: `1px solid ${theme == 'dark' ? '#424242' : '#e8e8e8'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography.Title level={3}>{menu.name}</Typography.Title>
            <Avatar style={{ marginTop: 0 }} size={48} shape="square" icon={<UserOutlined />} />
          </Header>
          <Content
            style={{
              // margin: '24px 16px',
              // padding: 24,
              minHeight: 280,
              overflow: 'hidden',
              background: colorBgContainer,
            }}
          >
            <main style={{ height: '100%', }}>{props.children}</main>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

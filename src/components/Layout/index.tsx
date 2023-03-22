import { useRouter } from 'next/router'
import { ConfigProvider, Layout, Menu, theme as antdTheme, Avatar, Space, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, SkinOutlined, ApiOutlined, BulbOutlined, SettingOutlined, ShareAltOutlined, MessageOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
const { Header, Sider, Content } = Layout
import React, { useEffect, useState } from 'react'
import { tool } from '@/utils'
import { useSiteContext } from '@/context/site'

export default function LayoutBase(props: any) {
  const { token } = antdTheme.useToken()
  const { theme, setTheme } = useSiteContext()
  const router = useRouter()
  const [colorBgContainer, setColorBgContainer] = useState(token.colorBgContainer)
  const [colorPrimary, setColorPrimary] = useState(token.colorPrimary)
  const [collapsed, setCollapsed] = useState(true)
  const iconColor = '#CCC'
  const menuList = [
    { name: '聊天', path: '/chat', icon: <MessageOutlined />, iconColor: iconColor, iconColorActive: colorPrimary },
    { name: '提示', path: '/prompt', icon: <BulbOutlined />, iconColor: iconColor, iconColorActive: colorPrimary },
    { name: '分享', path: '/share', icon: <ShareAltOutlined />, iconColor: iconColor, iconColorActive: colorPrimary },
    { name: '商店', path: '/store', icon: <ApiOutlined />, iconColor: iconColor, iconColorActive: colorPrimary },
  ]

  const toUrl = (url: string) => {
    router.push(url)
  }

  const getActive = (path: string = '') => {
    const { pathname } = router
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
      <Layout style={{ borderRadius: '6px', overflow: 'hidden', height: 'calc(100vh - 20px)', margin: '10px' }}>
        <Sider theme="dark" width={120} trigger={null} collapsible collapsed={collapsed}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <Avatar style={{ marginTop: '20px' }} size={48} shape="square" icon={<UserOutlined />} />
            <Space direction="vertical" size={'small'} style={{ marginTop: 80 }}>
              {menuList.map((item, index) => {
                return (
                  <Button
                    key={item.path}
                    onClick={() => toUrl(item.path)}
                    ghost={getActive(item.path) ? false : true}
                    size={'large'}
                    icon={item.icon}
                    style={{ border: 'none', color: getActive(item.path) ? item.iconColorActive : item.iconColor }}
                  ></Button>
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
                icon={<SkinOutlined style={{ color: iconColor }} />}
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
            </Space>
          </div>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              style: { marginLeft: '10px' },
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <main>{props.children}</main>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

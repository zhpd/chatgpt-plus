import { useRouter } from 'next/router'
import { ConfigProvider, Layout, App as AntdApp, Menu, theme as antdTheme, Avatar, Space, Button, Typography } from 'antd'
import Icon, {
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
  ShoppingOutlined,
} from '@ant-design/icons'
const { Header, Sider, Content } = Layout
import React, { useEffect, useState } from 'react'
import { tool } from '@/utils'
import { useSiteContext } from '@/contexts/site'
import { useTranslation } from '@/locales'
import Head from 'next/head'
import Image from 'next/image'
import AuthAvatar from '../AuthAvatar'
import IconLight from '@/assets/icons/light.svg'
import IconDark from '@/assets/icons/dark.svg'

export default function LayoutBase(props: any) {
  const { token } = antdTheme.useToken()
  const { t } = useTranslation()
  const { title, theme, setTheme, event$ } = useSiteContext()
  const router = useRouter()
  const [colorBgContainer, setColorBgContainer] = useState(token.colorBgContainer)
  const [colorPrimary, setColorPrimary] = useState(token.colorPrimary)
  const [collapsed, setCollapsed] = useState(true)
  const [side, setSide] = useState(true)
  const iconColor = '#CCC'
  const menuList = [
    { name: 'c.message', path: '/chat', icon: <MessageOutlined />, iconColor: iconColor, iconColorActive: colorPrimary },
    { name: 'c.prompt', path: '/prompt', icon: <BulbOutlined />, iconColor: iconColor, iconColorActive: colorPrimary },
    { name: 'c.plugin', path: '/plugin', icon: <ApiOutlined />, iconColor: iconColor, iconColorActive: colorPrimary },
    { name: 'c.store', path: '/store', icon: <ShoppingOutlined />, iconColor: iconColor, iconColorActive: colorPrimary },
    // { name: 'c.share', path: '/share', icon: <ShareAltOutlined />, iconColor: iconColor, iconColorActive: colorPrimary },
  ]
  const [menu, setMenu] = useState<any>(menuList[0])

  const toUrl = (url: string) => {
    const { pathname } = router
    if ((pathname != '' && pathname != '/') && url.indexOf(pathname) > -1) {
      // @ts-ignore
      event$.emit({ type: 'tabSwich', url, pathname })
      return
    }
    // @ts-ignore
    event$.emit({ type: 'tabSwich', url, pathname })
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
    let newTheme = theme
    switch (theme) {
      case 'light':
        newTheme = 'dark'
        break
      case 'dark':
        newTheme = 'light'
        break
      default:
        break
    }
    setColorBgContainer(newTheme == 'dark' ? token.colorFillContent : token.colorBgContainer)
    setColorPrimary(token.colorPrimary)
    setTheme(newTheme)
    console.log('newTheme', newTheme)
  }

  const renderLogo = (props?: { style?: { [key: string]: any } } | undefined) => {
    const { style } = props || {}
    return (
      <Avatar
        style={{ marginTop: 5, padding: 4, backgroundColor: token.colorBgTextActive, ...style }}
        size={48}
        shape="square"
        src={<Image src={require('@/../public/logo.png')} width={36} height={36} alt="avatar" />}
        onClick={() => {
          setSide(!side)
        }}
      />
    )
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <AntdApp>
        <Head>
          <title>{title || 'ChatGPT-Plus'}</title>
          <meta property="og:title" content={title} key={title} />
        </Head>
        <Layout style={{ borderRadius: '6px', overflow: 'hidden', height: 'calc(100vh - 20px)', margin: '10px', backgroundColor: '#000', border: theme === 'dark'?`1px solid ${token.colorBorder}22`:'none' }}>
          <Sider
            theme={theme === 'dark' ? 'dark' : 'light'}
            trigger={null}
            width={120}
            collapsible
            collapsed={collapsed}
            style={{ borderRight: `${theme === 'dark' ? 0 : 1}px solid ${token.colorBorder}22`, display: side ? 'block' : 'none' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
              <div style={{ height: '64px', display: 'flex', alignItems: 'center' }}>{renderLogo()}</div>
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
                      style={{ border: getActive(item.path) ? undefined : 'none', color: getActive(item.path) ? item.iconColorActive : theme === 'dark' ? item.iconColor : '#555' }}
                    >
                      {collapsed ? '' : t(item.name)}
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
                  style={{ border: 'none', color: '#fff' }}
                  size={'large'}
                  // icon={theme === 'dark' ? <SkinFilled style={{ color: iconColor }} /> : <SkinOutlined style={{ color: '#555' }} />}
                  icon={theme === 'dark' ? <Icon component={IconDark} style={{ color: iconColor, fontSize: '18px' }} /> : <Icon component={IconLight} style={{ color: '#333', fontSize: '20px' }} />}
                ></Button>
                <Button
                  onClick={() => {
                    // // 设置弹窗
                    // tool.showModal(<div>设置</div>, {
                    //   title: '设置',
                    // })
                  }}
                  ghost
                  style={{ border: 'none' }}
                  size={'large'}
                  icon={<SettingOutlined style={{ color: theme === 'dark' ? iconColor : '#555' }} />}
                ></Button>
                <Button
                  onClick={() => setCollapsed(!collapsed)}
                  ghost
                  style={{ border: 'none' }}
                  size={'large'}
                  icon={React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    style: { color: theme === 'dark' ? iconColor : '#555' },
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
                borderBottom: `1px solid ${theme == 'dark' ? '#42424255' : '#e8e8e855'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {!side ? renderLogo({ style: { marginRight: 20 } }) : null}
                <Typography.Title level={3} style={{ marginBottom: 0 }}>
                  {t(menu.name)}
                </Typography.Title>
              </div>
              <div></div>
              {/* <AuthAvatar style={{ marginTop: 0 }} size={48} shape="square" icon={<UserOutlined />} /> */}
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
              <main style={{ height: '100%' }}>{props.children}</main>
            </Content>
          </Layout>
        </Layout>
      </AntdApp>
    </ConfigProvider>
  )
}

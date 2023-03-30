import { useSession, signIn, signOut } from 'next-auth/react'
import { ConfigProvider, Layout, App as AntdApp, theme as antdTheme, Avatar, Space, Button, Typography, Modal } from 'antd'
import { UserOutlined, SkinFilled } from '@ant-design/icons'
import { LoginOutlined } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
export default function AuthAvatar(props: any) {
  const [modal, contextHolder] = Modal.useModal()
  const { token } = antdTheme.useToken()
  const { t } = useTranslation()
  const { title, theme, setTheme, event$ } = useSiteContext()
  const { data: session } = useSession()
  if (session) {
    return (
      <div>
        <Avatar style={{ marginRight: 10 }} size={48} shape="square" icon={<UserOutlined />} />
        {/* <p>Signed in as {session?.user?.country} </p> */}
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    )
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            colorBgElevated: '#eee',
          },
        },
      }}
    >
      <AntdApp>
        {/* Not signed in <br /> */}
        <Button
          onClick={async () => {
            const res = await signIn('credentials', { redirect: false, password: '' })
            console.log(res)
            // const url = '/api/auth/signin?callbackUrl=/'
            // if (url) {
            //   const _dom = (
            //     <div style={{ width: '100%', height: '100%' }}>
            //       <iframe src={url as string} style={{ width: '100%', height: '500px', padding: '0 !important', margin: '0 !important', border: 'none', overflow: 'hidden' }}></iframe>
            //     </div>
            //   )
            //   modal.info({
            //     maskClosable: true,
            //     icon: <LoginOutlined />,
            //     centered: true,
            //     closable: true,
            //     title: 'Sign in',
            //     width: 520,
            //     content: _dom,
            //     footer: null,
            //     wrapClassName: 'modal-signin',
            //     bodyStyle: {
            //       flexDirection: 'column',
            //     },
            //   })
            // }
          }}
        >
          Sign in
        </Button>
        {contextHolder}
      </AntdApp>
    </ConfigProvider>
  )
}

import { useSession, signIn, signOut } from 'next-auth/react'
import { theme as antdTheme, Avatar, Space, Button, Typography } from 'antd'
import { UserOutlined, SkinFilled } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
import tool from '@/utils/tool'
export default function AuthAvatar(props: any) {
  const { token } = antdTheme.useToken()
  const { t } = useTranslation()
  const { title, theme, setTheme, event$ } = useSiteContext()
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        {/* Signed in as {session?.user.email} <br/> */}
        <Avatar style={{ marginTop: 0 }} size={48} shape="square" icon={<UserOutlined />} />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      {/* Not signed in <br /> */}
      <Button
        onClick={async () => {
          const res = await signIn('credentials', { redirect: false, password: 'password' })
          console.log(res)
          if (res) {
            if (res.ok) {
              const _dom = <div style={{ width: '100%', height: '100%' }}>{/* <iframe src={res.url as string} style={{ width: '100%', height: '100%' }}></iframe> */}</div>
              tool.showModal(_dom, {
                title: 'Sign in',
                width: 400,
                footer: null,
              })
            }
          }
        }}
      >
        Sign in
      </Button>
    </>
  )
}

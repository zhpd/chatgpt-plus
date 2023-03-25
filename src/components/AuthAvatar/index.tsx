import { useSession, signIn, signOut } from 'next-auth/react'
import { theme as antdTheme, Avatar, Space, Button, Typography } from 'antd'
import { UserOutlined, SkinFilled } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
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
      <Button  onClick={() => signIn()}>Sign in</Button>
    </>
  )
}

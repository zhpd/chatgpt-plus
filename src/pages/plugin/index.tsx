import { Button, Result, Empty } from 'antd'
import Head from 'next/head'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
import { useEffect } from 'react'
function IndexPage() {
  const { setTitle } = useSiteContext()
  const { t } = useTranslation()
  useEffect(() => {
    const title = t('window.title', { title: t('c.store') })
    setTitle(title)
  }, [setTitle, t])

  const emptyStyle: React.CSSProperties = {
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
  return (
    <Empty
      style={{ ...emptyStyle }}
      description="插件功能正在开发中，敬请期待！"
      // title="正在添加更多AI功能，敬请期待！"
      // extra={
      //   <Button href="https://github.com/zhpd/chatgpt-plus" target="_blank" type="primary" key="console">
      //     Go Github
      //   </Button>
      // }
    />
  )
}

export default IndexPage

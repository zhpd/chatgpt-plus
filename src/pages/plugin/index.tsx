import { Button, Result, Empty } from 'antd'
import Head from 'next/head'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
import { useEffect } from 'react'
function IndexPage() {
  const { setTitle } = useSiteContext()
  const { t } = useTranslation()
  useEffect(() => {
    const title = t('window.title', { title: t('c.plugin') })
    setTitle(title)
  }, [setTitle, t])
  return (
    <Empty
      style={{ marginTop: '30%' }}
      description="正在添加更多AI功能，敬请期待！"
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

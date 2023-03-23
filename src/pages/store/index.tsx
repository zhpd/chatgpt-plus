import { Button, Result } from 'antd'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { useSiteContext } from '@/contexts/site'
import { useEffect } from 'react'
function IndexPage() {
  const { setTitle } = useSiteContext()
  const { t } = useTranslation()
  useEffect(() => {
    const title = t('window.title', { title: t('c.store') })
    setTitle(title)
  }, [setTitle, t])
  return (
    <div>
      <Result
        title="正在添加更多AI功能，敬请期待！"
        extra={
          <Button href="https://github.com/zhpd/chatgpt-plus" target="_blank" type="primary" key="console">
            Go Github
          </Button>
        }
      />
    </div>
  )
}

export default IndexPage

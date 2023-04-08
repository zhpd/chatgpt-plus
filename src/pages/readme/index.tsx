import { Button, Result, Empty, theme as antdTheme } from 'antd'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
import { useEffect } from 'react'
import Markdown from '@/components/pages/chat/Markdown'

// 读取 README.md的内容
const text = require('!raw-loader!../../../README.md').default

function IndexPage() {
  const { theme } = useSiteContext()
  const { token } = antdTheme.useToken()
  const { setTitle } = useSiteContext()
  const { t } = useTranslation()

  useEffect(() => {
    const title = t('window.title', { title: t('c.readme') })
    setTitle(title)
  }, [setTitle, t])

  return (
    <div style={{ height: '100%' }}>
      <Markdown
        theme={theme}
        token={token}
        role={'system'}
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          height: '100%',
        }}
      >
        {text}
      </Markdown>
    </div>
  )
}

export default IndexPage

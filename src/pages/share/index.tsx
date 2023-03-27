import Head from 'next/head'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
import { useEffect } from 'react'
function IndexPage() {
  const { setTitle } = useSiteContext()
  const { t } = useTranslation()
  useEffect(() => {
    const title = t('window.title', { title: t('c.share') })
    setTitle(title)
  }, [setTitle, t])
  return (
    <div>
      <p>Hello world! Share</p>
    </div>
  )
}

export default IndexPage

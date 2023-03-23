import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { useSiteContext } from '@/contexts/site'
import { useEffect } from 'react'

function IndexPage() {
  const { setTitle } = useSiteContext()
  const { t } = useTranslation()
  useEffect(() => {
    const title = t('window.title', { title: t('c.prompt') })
    setTitle(title)
  }, [setTitle, t])
  return (
    <div>
      <p>Hello world! Prompt</p>
    </div>
  )
}

export default IndexPage

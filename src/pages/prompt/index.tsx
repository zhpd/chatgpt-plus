import Head from 'next/head'
import List from './components/List'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
import { useCallback, useEffect, useState } from 'react'
import { usePromptContext } from '@/contexts'
import { useRouter } from 'next/router'
import { ReactNode } from 'react-markdown/lib/ast-to-react'

function IndexPage() {
  const router = useRouter()
  const { setTitle, event$ } = useSiteContext()
  const { t } = useTranslation()
  const { promptList } = usePromptContext()
  const [openList, setOpenList] = useState<boolean>(true)
  const [ContentElement, setContentElement] = useState<ReactNode>(<></>)

  event$.useSubscription((val: any) => {
    if (val?.type == 'tabSwich') {
      // 二次点击，则隐藏消息列表
      if (val?.url.indexOf('/prompt') > -1) {
        console.log(val)
        setOpenList(!openList)
      }
    }
  })
  useEffect(() => {
    const title = t('window.title', { title: t('c.prompt') })
    setTitle(title)
  }, [setTitle, t])

  const setContent = (ele: ReactNode) => {
    setContentElement(ele)
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <List setContent={setContent} style={{ display: openList ? 'block' : 'none' }}></List>
        <div style={{ border: '0px solid #efeff5', flex: 1, padding: '16 16 16 16', display: 'flex', flexDirection: 'row', overflow: 'auto', width: '100%' }}>{ContentElement}</div>
      </div>
    </>
  )
}

export default IndexPage

import List from '@/components/pages/prompt/List'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
import { ReactNode, useEffect, useState } from 'react'
import Store from '@/components/pages/prompt/Store'

function IndexPage() {
  const { setTitle, event$ } = useSiteContext()
  const { t } = useTranslation()
  const [openList, setOpenList] = useState<boolean>(true)
  const [ContentElement, setContentElement] = useState<ReactNode>(<Store></Store>)

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

  const renderBox = () => {
    return ContentElement
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <List setContent={setContent} style={{ display: openList ? 'block' : 'none' }}></List>
        <div style={{ border: '0px solid #efeff5', flex: 1, padding: '16 16 16 16', display: 'flex', flexDirection: 'row', overflow: 'auto', width: '100%' }}>{renderBox()}</div>
      </div>
    </>
  )
}

export default IndexPage

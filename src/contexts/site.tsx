import { useEventEmitter } from 'ahooks'
import { EventEmitter } from 'ahooks/lib/useEventEmitter'
import { createContext, useContext, useState } from 'react'

export type SiteType = {
  theme: 'dark' | 'light' | 'auto'
  setTheme: Function
  lang: string
  setLang: Function
  title: string
  setTitle: Function
  event$: EventEmitter<void>
}

const Context = createContext<SiteType>({
  theme: 'light',
  setTheme: (theme: string) => {},
  lang: 'zh-cn',
  setLang: (lang: string) => {},
  title: 'ChatGPT-Plus',
  setTitle: (title: string) => {},
  event$: new EventEmitter(), // 全局event事件
})

// @ts-ignore
export function SiteProvider({ children }) {
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>('light')
  const [lang, setLang] = useState<string>('zh-cn')
  const [title, setTitle] = useState<string>('ChatGPT-Plus')
  const event$ = useEventEmitter()
  return (
    <Context.Provider
      value={{
        theme,
        setTheme,
        lang,
        setLang,
        title,
        setTitle,
        event$,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useSiteContext() {
  return useContext(Context)
}

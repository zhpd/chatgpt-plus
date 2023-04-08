import { useEventEmitter } from 'ahooks'
import { EventEmitter } from 'ahooks/lib/useEventEmitter'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

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
  lang: 'zh-CN',
  setLang: (lang: string) => {},
  title: 'ChatGPT-Plus',
  setTitle: (title: string) => {},
  event$: new EventEmitter(), // 全局event事件
})

// @ts-ignore
export function SiteProvider({ children }) {
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>('light')
  const [lang, setLang] = useState<string>('zh-CN')
  const [title, setTitle] = useState<string>('ChatGPT-Plus')
  const event$ = useEventEmitter()
  // const refTheme = useRef<'dark' | 'light' | 'auto' >('light')
  // const refLang = useRef<string>('zh-CN')

  // useEffect(() => {
  //   let _theme: string = typeof window !== 'undefined' ? localStorage.getItem('theme') || '' : 'light'
  //   if (_theme !== 'dark' && _theme !== 'light' && _theme !== 'auto') {
  //     _theme = 'light'
  //   }
  //   setTheme(_theme as 'dark' | 'light' | 'auto' )

  //   let _lang: string = typeof window !== 'undefined' ? localStorage.getItem('lang') || '' : 'zh-CN'
  //   if (_lang !== 'zh-CN' && _lang !== 'en-US') {
  //     _lang = 'zh-CN'
  //   }
  //   setLang(_lang)
  // }, [])

  useEffect(() => {
    // refTheme.current = theme
    // 存储localStorage
    localStorage.setItem('theme', theme)
    console.log('theme', theme)
    // 现在可以使用 JavaScript 来更改颜色方案
    document?.documentElement?.setAttribute('data-theme', theme)
    // 打印用户首选的颜色方案
    console.log('window prefers-color-scheme:', window?.matchMedia('(prefers-color-scheme)'))

    // if (window?.matchMedia && window?.matchMedia('(prefers-color-scheme)').matches) {
    //   // 如果浏览器支持媒体查询且用户设置了颜色方案，则执行以下代码：
    //   if (window?.matchMedia('(prefers-color-scheme: light)').matches) {
    //     // 如果用户首选浅色主题，则执行以下代码：
    //     document.documentElement.setAttribute('data-theme', 'light')
    //   } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //     // 如果用户首选深色主题，则执行以下代码：
    //     document.documentElement.setAttribute('data-theme', 'dark')
    //   }
    // }
  }, [theme])
  useEffect(() => {
    // refLang.current = lang
    // 存储localStorage
    localStorage.setItem('lang', lang)
  }, [lang])

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

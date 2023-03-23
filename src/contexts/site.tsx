import { createContext, useContext, useState } from 'react'

const Context = createContext<{ theme: 'dark' | 'light' | 'auto'; setTheme: Function; lang: string; setLang: Function; title: string; setTitle: Function }>({
  theme: 'light',
  setTheme: (theme: string) => {},
  lang: 'zh-cn',
  setLang: (lang: string) => {},
  title: 'ChatGPT-Plus',
  setTitle: (title: string) => {},
})

// @ts-ignore
export function SiteProvider({ children }) {
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>('light')
  const [lang, setLang] = useState<string>('zh-cn')
  const [title, setTitle] = useState<string>('ChatGPT-Plus')
  return (
    <Context.Provider
      value={{
        theme,
        setTheme,
        lang,
        setLang,
        title,
        setTitle,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useSiteContext() {
  return useContext(Context)
}

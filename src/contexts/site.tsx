import { createContext, useContext, useState } from 'react'

const Context = createContext<{ theme: 'dark' | 'light' | 'auto'; setTheme: Function; lang: string; setLang: Function }>({
  theme: 'light',
  setTheme: (theme: string) => {},
  lang: 'zh-cn',
  setLang: (lang: string) => {},
})

// @ts-ignore
export function SiteProvider({ children }) {
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>('light')
  const [lang, setLang] = useState<string>('zh-cn')
  return (
    <Context.Provider
      value={{
        theme,
        setTheme,
        lang,
        setLang,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useSiteContext() {
  return useContext(Context)
}

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import storage from '@/utils/storage'

export type SettingType = {
  common: any
  setCommon: Function
  surface: any
  setSurface: Function
  network: any
  setNetwork: Function
}

const Context = createContext<SettingType>({
  common: {},
  setCommon: (common: any) => {},
  surface: {},
  setSurface: (surface: any) => {},
  network: {},
  setNetwork: (network: any) => {},
})

// @ts-ignore
export function SettingProvider({ children }) {
  const [common, setCommon] = useState<any>({})
  const [surface, setSurface] = useState<any>({})
  const [network, setNetwork] = useState<any>({})

  // useEffect(() => {
  //   // 存储
  //   storage.set('theme', theme)
  //   console.log('theme', theme)
  //   // 现在可以使用 JavaScript 来更改颜色方案
  //   document?.documentElement?.setAttribute('data-theme', theme)
  //   // 打印用户首选的颜色方案
  //   console.log('window prefers-color-scheme:', window?.matchMedia('(prefers-color-scheme)'))
  // }, [theme])

  useEffect(() => {
    storage.get('setting_common').then((res) => {
      let _value = res
      if (!_value) {
        _value = {}
      }
      setCommon(_value)
    })
    storage.get('setting_surface').then((res) => {
      let _value = res
      if (!_value) {
        _value = {}
      }
      setSurface(_value)
    })
    storage.get('setting_network').then((res) => {
      let _value = res
      if (!_value) {
        _value = {}
      }
      setNetwork(_value)
    })
  }, [])

  useEffect(() => {
    // refLang.current = lang
    storage.set('setting_common', common)
  }, [common])
  useEffect(() => {
    // refLang.current = lang
    storage.set('setting_surface', surface)
  }, [surface])
  useEffect(() => {
    // refLang.current = lang
    storage.set('setting_network', network)
  }, [network])

  return (
    <Context.Provider
      value={{
        common,
        setCommon,
        surface,
        setSurface,
        network,
        setNetwork,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useSettingContext() {
  return useContext(Context)
}

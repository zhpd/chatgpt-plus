import { Plugin } from '@/types/plugin'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import storage from '@/utils/storage'

export type PluginContentType = {
  pluginList: Array<Plugin>
  setPluginList: (pluginList: Array<Plugin>) => void
  installPlugin: (plugin: Plugin) => void
  uninstallPlugin: (uuid: string) => void
  starPlugin: (plugin: Plugin) => void
  unstarPlugin: (uuid: string) => void
}

const Context = createContext<PluginContentType>({
  pluginList: [],
  setPluginList: () => { },
  installPlugin: () => { },
  uninstallPlugin: () => { },
  starPlugin: () => { },
  unstarPlugin: () => { },
})

// @ts-ignore
export function PluginProvider({ children }) {
  const router = useRouter()

  const [pluginList, setPluginList] = useState<Array<Plugin>>([])
  let refList = useRef<Plugin[]>()

  useEffect(() => {
    storage.get('pluginList').then((res) => {
      let _pluginList = res || []
      // 如果是string，则转换成数组
      if (typeof _pluginList == 'string') {
        _pluginList = JSON.parse(_pluginList)
      }
      setPluginList(_pluginList as any[])
    })
  }, [])

  useEffect(() => {
    refList.current = pluginList || []
    // 存储
    storage.set('pluginList', pluginList)
  }, [pluginList])

  const installPlugin = (plugin?: Plugin) => {
  }
  const uninstallPlugin = (uuid: string) => {
  }

  // 收藏plugin
  const starPlugin = (plugin?: Plugin) => {
    const _pluginList = [...(refList.current as Plugin[])]
    if (!plugin) {
      return
    }
    const index = _pluginList.findIndex((item) => item.uuid == plugin?.uuid)
    if (index > -1) {
      _pluginList.splice(index, 1)
    }
    _pluginList.unshift(plugin)
    setPluginList(_pluginList)
  }

  // 取消plugin
  const unstarPlugin = (uuid?: string) => {
    const _pluginList = [...(refList.current as Plugin[])]
    if (!uuid) {
      return
    }
    const index = _pluginList.findIndex((item) => item.uuid == uuid)
    if (index > -1) {
      _pluginList.splice(index, 1)
    }
    setPluginList(_pluginList)
  }
  return (
    <Context.Provider
      value={{
        pluginList,
        setPluginList,
        installPlugin,
        uninstallPlugin,
        starPlugin,
        unstarPlugin,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function usePluginContext() {
  return useContext(Context)
}

import { Plugin } from '@/types/plugin'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import storage from '@/utils/storage'

export type PluginContentType = {
  pluginList: Array<Plugin>
  setPluginList: (pluginList: Array<Plugin>) => void
  addPlugin: (plugin: Plugin) => void
  upPlugin: (uuid: string, obj: { [key: string]: string }) => void
  delPlugin: (uuid: string) => void
  starPlugin: (plugin: Plugin) => void
  unstarPlugin: (uuid: string) => void
}

const Context = createContext<PluginContentType>({
  pluginList: [],
  setPluginList: () => {},
  addPlugin: () => {},
  delPlugin: () => {},
  upPlugin: () => {},
  starPlugin: () => {},
  unstarPlugin: () => {},
})

// @ts-ignore
export function PluginProvider({ children }) {
  const router = useRouter()

  const [pluginList, setPluginList] = useState<Array<Plugin>>([])
  let refList = useRef<Plugin[]>()

  useEffect(() => {
    storage.get('pluginList').then((res) => {
      let _pluginList = res
      // 如果是string，则转换成数组
      if (typeof _pluginList == 'string') {
        _pluginList = JSON.parse(_pluginList)
      }
      setPluginList(_pluginList as any[])
    })
  }, [])

  useEffect(() => {
    refList.current = pluginList
    // 存储
    storage.set('pluginList', pluginList)
  }, [pluginList])

  const addPlugin = (plugin?: Plugin) => {
    const _pluginList = [...(refList.current as Plugin[])]
    if (!plugin) {
      return
    }
    console.log('addPlugin', plugin)
    if (!plugin?.name || !plugin?.plugin) {
      return
    }
    const index = _pluginList.findIndex((item) => item.uuid == plugin?.uuid)
    if (index > -1) {
      _pluginList.splice(index, 1)
    }
    _pluginList.unshift(plugin)
    setPluginList(_pluginList)
  }
  const delPlugin = (uuid: string) => {
    const _pluginList = [...(refList.current as Plugin[])]
    const _list = _pluginList.filter((item) => item.uuid !== uuid)
    setPluginList(_list)
  }

  const upPlugin = (uuid: string, obj: { [key: string]: string }) => {
    const _pluginList = [...(refList.current as Plugin[])]
    const index = _pluginList.findIndex((item) => item.uuid == uuid)
    if (index > -1) {
      const _plugin = _pluginList[index]
      const _nPlugin = Object.assign({}, { ..._plugin }, { ...obj })
      console.log('upPlugin', uuid, obj, _nPlugin)
      if (!_nPlugin?.name || !_nPlugin?.plugin) {
        return
      }
      _pluginList[index] = _nPlugin
      setPluginList(_pluginList)
    }
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
    if (!plugin) {
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
        addPlugin,
        delPlugin,
        upPlugin,
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

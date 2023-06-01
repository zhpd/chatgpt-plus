import { Prompt } from '@/types/prompt'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import storage from '@/utils/storage'
import { uuidv4 } from '@/utils'

export type PromptContentType = {
  promptList: Array<Prompt>
  setPromptList: (promptList: Array<Prompt>) => void
  addPrompt: (prompt: Prompt) => void
  upPrompt: (uuid: string, obj: { [key: string]: string }) => void
  delPrompt: (uuid: string) => void
  starPrompt: (prompt: Prompt) => void
  unstarPrompt: (uuid: string) => void
}

const Context = createContext<PromptContentType>({
  promptList: [],
  setPromptList: () => {},
  addPrompt: () => {},
  delPrompt: () => {},
  upPrompt: () => {},
  starPrompt: () => {},
  unstarPrompt: () => {},
})

// @ts-ignore
export function PromptProvider({ children }) {
  const router = useRouter()

  const [promptList, setPromptList] = useState<Array<Prompt>>([])
  let refList = useRef<Prompt[]>()

  useEffect(() => {
    storage.get('promptList').then((res) => {
      let _promptList = res
      // 如果是string，则转换成数组
      if (typeof _promptList == 'string') {
        _promptList = JSON.parse(_promptList)
      }
      setPromptList(_promptList as any[])
    })
  }, [])

  useEffect(() => {
    refList.current = promptList
    // 存储
    storage.set('promptList', promptList)
  }, [promptList])

  const addPrompt = (prompt?: Prompt) => {
    const _promptList = [...(refList.current as Prompt[])]
    if (!prompt) {
      return
    }
    prompt.uuid = uuidv4()
    console.log('addPrompt', prompt)
    if (!prompt?.name || !prompt?.prompt) {
      return
    }
    const index = _promptList.findIndex((item) => item.uuid == prompt?.uuid)
    if (index > -1) {
      _promptList.splice(index, 1)
    }
    _promptList.unshift(prompt)
    setPromptList(_promptList)
  }
  const delPrompt = (uuid: string) => {
    const _promptList = [...(refList.current as Prompt[])]
    const _list = _promptList.filter((item) => item.uuid !== uuid)
    setPromptList(_list)
  }

  const upPrompt = (uuid: string, obj: { [key: string]: string }) => {
    const _promptList = [...(refList.current as Prompt[])]
    const index = _promptList.findIndex((item) => item.uuid == uuid)
    if (index > -1) {
      const _prompt = _promptList[index]
      const _nPrompt = Object.assign({}, { ..._prompt }, { ...obj })
      console.log('upPrompt', uuid, obj, _nPrompt)
      if (!_nPrompt?.name || !_nPrompt?.prompt) {
        return
      }
      _promptList[index] = _nPrompt
      setPromptList(_promptList)
    }
  }

  // 收藏prompt
  const starPrompt = (prompt?: Prompt) => {
    const _promptList = [...(refList.current as Prompt[])]
    if (!prompt) {
      return
    }
    const index = _promptList.findIndex((item) => item.uuid == prompt?.uuid)
    if (index > -1) {
      _promptList.splice(index, 1)
    }
    _promptList.unshift(prompt)
    setPromptList(_promptList)
  }

  // 取消prompt
  const unstarPrompt = (uuid?: string) => {
    const _promptList = [...(refList.current as Prompt[])]
    if (!prompt) {
      return
    }
    const index = _promptList.findIndex((item) => item.uuid == uuid)
    if (index > -1) {
      _promptList.splice(index, 1)
    }
    setPromptList(_promptList)
  }
  return (
    <Context.Provider
      value={{
        promptList,
        setPromptList,
        addPrompt,
        delPrompt,
        upPrompt,
        starPrompt,
        unstarPrompt,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function usePromptContext() {
  return useContext(Context)
}

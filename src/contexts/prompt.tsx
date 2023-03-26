import { Prompt } from '@/types/prompt'
import { nanoid } from 'nanoid'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

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
    let _promptListStr: string | '' = typeof window !== 'undefined' ? localStorage.getItem('promptList') || '[]' : '[]'
    if (!_promptListStr) {
      _promptListStr = '[]'
    }
    let _promptList = JSON.parse(_promptListStr)
    setPromptList(_promptList)
    console.log(_promptList)
  }, [])

  useEffect(() => {
    refList.current = promptList
    // 存储localStorage
    localStorage.setItem('promptList', JSON.stringify(promptList))
  }, [promptList])

  const addPrompt = (prompt?: Prompt) => {
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
      console.log(_nPrompt, obj)
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

import { Chat, Message } from '@/types/chat'
import { uuidv4 } from '@/utils/uuid'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import storage from '@/utils/storage'

export type ChatContentType = {
  chatList: Array<Chat>
  setChatList: (chatList: Array<Chat>) => void
  activeChat?: Chat | null
  setActiveChat: (chat: Chat) => void
  newChat: (chat: Chat, message?: Message) => void
  delChat: (uuid: string) => void
  upChat: (uuid: string, obj: { [key: string]: string }) => void
  newMessage: (uuid: string, message: Message) => void
  delMessage: (uuid: string, message: Message) => void
}

const Context = createContext<ChatContentType>({
  chatList: [],
  setChatList: () => {},
  setActiveChat: () => {},
  activeChat: null,
  newChat: () => {},
  delChat: () => {},
  upChat: () => {},
  newMessage: () => {},
  delMessage: () => {},
})

// @ts-ignore
export function ChatProvider({ children }) {
  const router = useRouter()

  const [chatList, setChatList] = useState<Array<Chat>>([])
  const [activeChat, setActiveChat] = useState<Chat>()
  let refList = useRef<Chat[]>()

  useEffect(() => {
    storage.get('chatList').then((res) => {
      let _chatList = res
      // 如果是string，则转换成数组
      if (typeof _chatList == 'string') {
        _chatList = JSON.parse(_chatList)
      }
      setChatList(_chatList as any[])
    })
  }, [])

  useEffect(() => {
    refList.current = chatList
    // 存储
    storage.set('chatList', chatList)
  }, [chatList])

  const newChat = (chat?: Chat, message?: Message) => {
    const _chatList = [...(refList.current as Chat[])]
    if (!chat) {
      chat = {
        uuid: uuidv4(),
        name: 'ChatGPT',
        lastMessageText: 'No message',
      }
    }
    const index = _chatList.findIndex((item) => item.uuid == chat?.uuid)
    if (index > -1) {
      _chatList.splice(index, 1)
    }
    _chatList.unshift(chat)
    setChatList(_chatList)
    if (message) {
      newMessage(chat.uuid, message)
    }
  }
  const delChat = (uuid: string) => {
    const _chatList = [...(refList.current as Chat[])]
    const _list = _chatList.filter((item) => item.uuid !== uuid)
    setChatList(_list)
    // 如果删除的是当前聊天，跳转到第一个聊天
    if (_list && _list.length > 0) {
      setActiveChat(_list[0])
      router.push(`/chat?uuid=${_list[0].uuid}`)
    } else {
      setActiveChat(undefined)
      router.push(`/chat`)
    }
  }

  const upChat = (uuid: string, obj: { [key: string]: string }) => {
    const _chatList = [...(refList.current as Chat[])]
    const index = _chatList.findIndex((item) => item.uuid == uuid)
    if (index > -1) {
      const _chat = _chatList[index]
      const _nChat = Object.assign({}, { ..._chat }, { ...obj })
      console.log(_nChat, obj)
      _chatList[index] = _nChat
      setChatList(_chatList)
      setActiveChat(_nChat)
    }
  }
  const newMessage = (uuid: string, message: Message) => {
    const _chatList = [...(refList.current as Chat[])]
    const index = _chatList.findIndex((item) => item.uuid == uuid)
    if (index > -1) {
      const _chat = _chatList[index]
      if (!_chat.messageList) {
        _chat.messageList = []
      }
      if (message) {
        _chat.lastMessage = message
        _chat.lastMessageText = message.text
        _chat.lastMessageTime = message.dateTime
      }
      _chat.messageList.push(message)
      const _nChat = Object.assign({}, { ..._chat })
      _chatList[index] = _nChat
      setChatList(_chatList)
      setActiveChat(_nChat)
    }
  }

  const delMessage = (uuid: string, message: Message) => {
    const _chatList = [...(refList.current as Chat[])]
    const index = _chatList.findIndex((item) => item.uuid == uuid)
    if (index > -1) {
      const _chat = _chatList[index]
      if (!_chat.messageList) {
        _chat.messageList = []
      }
      const _index = _chat.messageList.findIndex((item) => item.dateTime == message.dateTime && item.text == message.text)
      if (_index > -1) {
        _chat.messageList.splice(_index, 1)
      }
      const _nChat = Object.assign({}, { ..._chat })
      if (!_nChat.messageList) {
        _nChat.lastMessage = undefined
        _nChat.lastMessageText = ''
        _nChat.lastMessageTime = ''
      } else {
        // 取最后一个数组对象
        const _lastMessage = _nChat.messageList[_nChat.messageList.length - 1]
        if (_lastMessage) {
          _nChat.lastMessage = _lastMessage
          _nChat.lastMessageText = _lastMessage.text
          _nChat.lastMessageTime = _lastMessage.dateTime
        }
      }
      _chatList[index] = _nChat
      setChatList(_chatList)
      setActiveChat(_nChat)
      console.log(_nChat.messageList, uuid, index)
    }
  }
  return (
    <Context.Provider
      value={{
        chatList,
        setChatList,
        activeChat,
        setActiveChat,
        newChat,
        delChat,
        upChat,
        newMessage,
        delMessage,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useChatContext() {
  return useContext(Context)
}

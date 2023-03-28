import { fetchChatAPIProcess } from '@/api'
import { Chat, Message, ConversationRequest, ConversationResponse } from '@/types/chat'
import { useState } from 'react'

export type MessageProps = {
  text?: string
  options?: ConversationRequest
  config?: { [key: string]: any }
  onProgress?: (event?: ProgressEvent, scene?: string, body?: any) => void
  signal?: AbortSignal
}
async function onConversation(props: MessageProps) {
  const { text, options, config, onProgress, signal } = props
  if (!text || text.trim() === '') return
  try {
    const fetchChatAPIOnce = async () => {
      await fetchChatAPIProcess<ConversationResponse>({
        text,
        options,
        config,
        signal,
        onDownloadProgress: ({ event }) => {
          const xhr = event.target
          const { responseText } = xhr
          try {
            // Always process the final line
            // 按行读取最后一行数据，去掉头部data:字符，转换为json对象
            const lines = responseText.split('\n')
            // 读取倒数第三行数据
            const dataline = lines[lines.length - 3]
            // 解析第二行收据，去掉头部data:字符，读取json字符串
            let chunk = dataline?.substring(5)
            console.log('onProgress chunk', chunk, lines)
            const data = chunk && JSON.parse(chunk)
            console.log('onProgress data', data)
            if (data) {
              if (data?.complete) {
                onProgress?.(event, 'complete', data)
              } else {
                onProgress?.(event, 'receive', data)
              }
            }
          } catch (error) {
            onProgress?.(event, 'error', error)
          }
        },
      })
    }
    await fetchChatAPIOnce()
  } catch (error: any) {
    const errorMessage = error?.message ?? 'Unknown error'
    console.error('onConversation error:', errorMessage)
    return error
  }
}

export function useChat() {
  const [loading, setLoading] = useState(false)
  const sendMessage = (props: MessageProps) => {
    const { onProgress, ...rest } = props
    setLoading(true)
    const _onProgress = (e?: ProgressEvent<EventTarget>, scene?: string, body?: any) => {
      setLoading(true)
      onProgress && onProgress(e, scene, body)
    }
    return onConversation({
      onProgress: _onProgress,
      ...rest,
    }).catch((error) => {
      setLoading(false)
      throw error
    })
  }
  const stopMessage = (props: MessageProps) => {
    const { onProgress, ...rest } = props
    setLoading(true)
    const _onProgress = (e?: ProgressEvent<EventTarget>, scene?: string, body?: any) => {
      setLoading(true)
      onProgress && onProgress(e, scene, body)
    }
    return onConversation({
      onProgress: _onProgress,
      ...rest,
    }).catch((error) => {
      setLoading(false)
      throw error
    })
  }
  return { sendMessage, stopMessage, onConversation, loading }
}

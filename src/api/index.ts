import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'

export function fetchChatAPI<T = any>(text: string, options?: { conversationId?: string; parentMessageId?: string }, config?: { [key: string]: any }, signal?: GenericAbortSignal) {
  return post<T>({
    url: '/api/chatgpt/chat',
    data: { text, options, config },
    signal,
  })
}

export function fetchChatAPIProcess<T = any>(params: {
  text: string
  options?: { conversationId?: string; parentMessageId?: string }
  config?: { [key: string]: any }
  signal?: GenericAbortSignal
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
  systemMessage?: string
}) {
  return post<T>({
    url: '/api/chatgpt/chat',
    data: { text: params.text, options: params.options, config: params.config, systemMessage: params.systemMessage },
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
    // headers: { 'content-type': 'application/octet-stream' },
  })
}

export function fetchSession<T>() {
  return post<T>({
    url: '/api/chatgpt/session',
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/api/chatgpt/config',
  })
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: '/api/chatgpt/verify',
    data: { token },
  })
}

export interface Chat {
  uuid: string
  name?: string
  avatar?: string
  description?: string
  type?: string
  status?: string
  place?: 'left' | 'right'
  config?: { [key: string]: any }
  option?: { [key: string]: any }
  conversationId?: string
  lastMessage?: Message // last message
  lastMessageText?: string // last message text
  lastMessageTime?: string // last message time
  messageList?: Message[] // all messages
}

export interface Message {
  id?: string
  uuid?: string
  dateTime: string
  text: string
  inversion?: boolean
  error?: boolean
  loading?: boolean
  temp?: boolean
  conversationId?: string
  messageId?: string
  conversationOptions?: ConversationRequest | null
  requestOptions?: { prompt: string; options?: ConversationRequest | null } | null
  conversationRequest?: ConversationRequest | null
  conversationResponse?: ConversationResponse | null
}

export interface History {
  title: string
  isEdit: boolean
  uuid: number
}

export interface ChatState {
  active: number | null
  usingContext: boolean
  history: History[]
  chat: { uuid: number; data: Chat[] }[]
}

export interface ConversationRequest {
  messageId?: string
  conversationId?: string
  parentMessageId?: string
}

export interface ConversationResponse {
  conversationId: string
  detail: {
    choices: { finish_reason: string; index: number; logprobs: any; text: string }[]
    created: number
    id: string
    model: string
    object: string
    usage: { completion_tokens: number; prompt_tokens: number; total_tokens: number }
  }
  id: string
  parentMessageId: string
  role: string
  text: string
}

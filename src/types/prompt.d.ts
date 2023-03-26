export interface Prompt {
  uuid: string // uuid
  name?: string // 名称
  description?: string // 描述
  prompt?: string // 提示词
  type?: 'text' // 类型
  self?: boolean // 是否自有
  status?: string // 状态
  dateTime?: string // 时间
  options?: { [key: string]: any }[] // 选项
  private?: boolean // 是否私有
  star?: number // 收藏星数
  createUser?: string // 创建人
  historyList?: Prompt[] // 历史版本
}

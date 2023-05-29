export interface Prompt {
  uuid: string // uuid
  name?: string // 名称
  image?: string // 图片
  intro?: string // 简介
  description?: string // 描述
  prompt?: string // 提示词
  context?: { role: string; content: string }[] // 上下文内容
  modelConfig?: { [key: string]: any } // 模型配置
  category?: string // 分类
  type?: 'text' // 类型
  self?: boolean // 是否自有
  isRecommend?: boolean // 是否推荐
  isOfficial?: boolean // 是否官方
  isStar?: boolean // 是否收藏
  isSystem?: boolean // 是否系统预设
  status?: string // 状态
  datetime?: string // 时间
  options?: { [key: string]: any }[] // 选项
  private?: boolean // 是否私有
  star?: number // 收藏星数
  createUser?: string // 创建人
  historyList?: Prompt[] // 历史版本
  // 多语言
  lang?: string | string[] // 语言
}

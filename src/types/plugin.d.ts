export interface Plugin {
  uuid: string // uuid
  name?: string // 名称
  image?: string // 图片
  intro?: string // 简介
  description?: string // 描述
  category?: string // 分类
  mail?: string // 邮箱
  website?: string // 网站
  apiurl?: string // api地址
  namespace?: string // 命名空间
  datetime?: string // 时间
  status?: string // 状态
  version?: string // 版本
  isInstall?: boolean // 是否安装
  isRecommend?: boolean // 是否推荐
  isNew?: boolean // 是否新品
  isStar?: boolean // 是否收藏
  isSystem?: boolean // 是否系统预设
  apply?: string | string[] // 适用
  // 多语言
  lang?: {
    [key: string]: {
      name?: string // 名称
      image?: string // 图片
      intro?: string // 简介
      description?: string // 描述
    }
  }
  basicPrompts?: string[] // 基础提示词
  advancedPrompts?: string[] // 高级提示词
}

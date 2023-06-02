import type { Plugin } from '@/types/plugin'
import { uuidv4 } from '@/utils'
// 导出插件列表数据
export const pluginList: Plugin[] = [
  {
    uuid: uuidv4(),
    name: 'Zapier',
    image: 'https://cdn.zappy.app/8f853364f9b383d65b44e184e04689ed.png',
    intro:
      'Interact with over 5,000+ apps like Google Sheets, Gmail, HubSpot, Salesforce, and thousands more.Interact with over 5,000+ apps like Google Sheets, Gmail, HubSpot, Salesforce, and thousands more.',
    description:
      'Zapier can talk to any of 20k+ actions the user has exposed. Actions are single tasks (EG: add a lead, find a doc), Zaps are workflows of actions. Start new chat to refresh actions. Markdown links are relative to https://zapier.com/.',
    mail: 'nla@zapier.com',
    website: 'zapier.com',
    apiurl: 'https://nla.zapier.com/api/v1/dynamic/openapi.json',
    namespace: 'Zapier',
    datetime: '2023/3/20 11:32:26',
    apply: 'chatgpt',
    isInstall: false,
    isStar: true,
    isNew: true,
    isRecommend: true,
    basicPrompts: ['连接我的谷歌表，获取有关我的最新开支的数据'],
    advancedPrompts: ['建立一个Zapier任务，把我的Gmail附件保存到Dropbox里', '创建一个Zap任务，把我的Instagram照片发到Twitter 上', '建立一个自动化任务，把新的销售领导添加到我的谷歌表格中。'],
    lang: {
      zh_CN: {
        name: 'Zapier',
        intro: '与超过5,000个应用程序（如Google表格，Gmail，HubSpot，Salesforce等）进行交互。与超过5,000个应用程序（如Google表格，Gmail，HubSpot，Salesforce等）进行交互。',
        description:
          'Zapier可以与用户公开的20k +操作中的任何操作进行通信。操作是单个任务（例如：添加线索，查找文档），Zaps是操作的工作流程。开始新的聊天以刷新操作。 Markdown链接相对于https://zapier.com/。',
      },
    },
  },
]

export default pluginList
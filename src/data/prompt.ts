import type { Prompt } from '@/types/prompt'
import { uuidv4 } from '@/utils'
// 导出提示词列表数据
export const promptList: Prompt[] = [
  {
    uuid: uuidv4(),
    name: '机器学习',
    image: 'https://cdn.staticfile.org/emoji-datasource-apple/14.0.0/img/apple/64/1f600.png',
    description: '机器学习',
    intro: '我想让你担任机器学习工程师。我会写一些机器学习的概念，你的工作就是用通俗易懂的术语来解释它们。这可能包括提供构建模型的分步说明、给出所用的技术或者理论、提供评估函数等。我的问题是',
    prompt: '我想让你担任机器学习工程师。我会写一些机器学习的概念，你的工作就是用通俗易懂的术语来解释它们。这可能包括提供构建模型的分步说明、给出所用的技术或者理论、提供评估函数等。我的问题是',
    datetime: '2023/3/20 11:32:26',
    type: 'text',
    status: 'online',
    private: true,
    star: 0,
    isStar: false,
    isSystem: true,
    modelConfig: {
      model: 'GPT-3.5-Turbo',
    },
    historyList: [
      {
        uuid: uuidv4(),
        datetime: '2023/3/20 11:32:26',
        name: '机器学习',
        description: '机器学习',
        prompt: '机器学习',
        type: 'text',
        status: 'online',
      },
    ],
    lang: ['zh_CN'],
  },
]

export default promptList

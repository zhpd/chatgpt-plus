import { useSiteContext } from '@/contexts/site'
import { Avatar, Button, Card, Drawer, FloatButton, Input, InputRef, App, Popconfirm, Space, theme as antdTheme, Tooltip, Typography, Empty, Col, Row, Select, Tag, Badge } from 'antd'
import { StarOutlined, StarFilled, FireFilled, FireOutlined } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Prompt } from '@/types/prompt'
import { usePromptContext } from '@/contexts/prompt'
import { LanguageList, ModelList } from '@/config/constant'
import { tool, uuidv4 } from '@/utils'
import { useSize } from 'ahooks'
import Item from './Item'
import Edit from './Edit'

let _datas: Prompt[] = [
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
// 复制20个
for (let i = 0; i < 100; i++) {
  _datas.push({
    ..._datas[0],
    uuid: uuidv4(),
    // 随机一个是否收藏
    isStar: Math.random() > 0.5,
    // 随机一个是否系统
    isSystem: Math.random() > 0.5,
    // 随机一个是否推荐
    isRecommend: Math.random() > 0.5,
    // 随机一个模型
    modelConfig: {
      model: ModelList[Math.floor(Math.random() * 7)]['label'],
    },
  })
}

function OnlinePrompt() {
  const router = useRouter()
  const { token } = antdTheme.useToken()
  const { theme, lang } = useSiteContext()
  const { message, modal, notification } = App.useApp()
  const { promptList, starPrompt, unstarPrompt, addPrompt } = usePromptContext()
  const { t } = useTranslation()
  const size = useSize(document.body)
  const [open, setOpen] = useState<boolean>(false)
  const [openItem, setOpenItem] = useState<Prompt | null>(null)
  const [search, setSearch] = useState<string>('')
  const [language, setLanguage] = useState<string>(lang)
  const [alllist, setAlllist] = useState<Prompt[]>(_datas)
  const [list, setList] = useState<Prompt[]>(_datas)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagsData, setTagsData] = useState<{ [key: string]: string }[]>([
    { key: 'prompt.tag.all', value: 'all', color: '' },
    // 推荐
    { key: 'prompt.tag.recommend', value: 'recommend', color: 'red' },
    // 收藏
    { key: 'prompt.tag.star', value: 'star', color: 'orange' },
  ])

  // useEffect(() => {
  //   searchRequest()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    // 判断是否存在已经收藏过
    const _list = list?.map((item) => {
      let index = promptList.findIndex((tt) => item.uuid == tt.uuid)
      if (index > -1) {
        item.isStar = true
        item.isRecommend = true
      }
      return item
    })
    setList(_list)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptList])

  useEffect(() => {
    // 通过标签筛选
    let _isAll = false
    let _isRecommend = false
    let _isStar = false
    if (selectedTags.length > 0) {
      selectedTags.map((tag) => {
        if (tag == 'all') {
          _isAll = true
        } else if (tag == 'recommend') {
          _isRecommend = true
          _isAll = false
        } else if (tag == 'star') {
          _isStar = true
          _isAll = false
        }
      })
    }
    const _list = alllist.filter((item: Prompt) => {
      // 通过搜索筛选
      if (search) {
        if (item?.name?.indexOf(search) == -1 && item?.intro?.indexOf(search) == -1 && item?.description?.indexOf(search) == -1) {
          return false
        }
      }
      // 通过语言筛选
      if (language && item?.lang?.indexOf(language) == -1) {
        return false
      }
      if (_isAll) return true
      // 如果多个标签都选中了，则所有标签都需要符合
      if (_isRecommend && !item.isRecommend) return false
      if (_isStar && !item.isStar) return false
      return true
    })
    // console.log('_list', _list?.length, _list)
    // 筛选分类分组
    setList(_list)
  }, [search, language, selectedTags, alllist])

  const searchRequest = () => {
    console.log('searchRequest', search)
    // !todo 查询线上数据
  }

  const toStar = (item: Prompt) => {
    if (item.isStar) {
      unstarPrompt(item?.uuid)
      setOpenItem({ ...item, isStar: false })
      message.success(t('prompt.tag.unstarSuccess'))
    } else {
      starPrompt(item)
      setOpenItem({ ...item, isStar: true })
      message.success(t('prompt.tag.starSuccess'))
    }
  }

  const toCopy = (item: Prompt) => {
    addPrompt(item)
    message.success(t('prompt.copySuccess'))
  }

  const toChat = (item: Prompt) => {
    router.push(`/chat`)
  }

  const openInfo = (item: Prompt) => {
    setOpenItem(item)
    setOpen(true)
    // tool.showDrawer(<Edit action="add" page={false} prompt={item} />, { title: t('c.prompt'), width: 500, placement: 'bottom' })
  }
  return (
    <div style={{ border: '0px solid #efeff5', flex: 1, padding: '16 16 0 16', display: 'flex', flexDirection: 'column', overflow: 'auto', width: '100%' }}>
      <div
        style={{
          height: 64,
          // borderRight: `${theme === 'dark' ? 0 : 1}px solid ${token.colorBorder}`,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: theme == 'dark' ? token.colorBgContainer : '#fff',
          color: theme === 'dark' ? '#eee' : undefined,
          borderBottom: `1px solid ${theme == 'dark' ? '#424242' : '#e8e8e8'}`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 9,
          right: 0,
          left: 0,
          padding: '16px',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Space size={[0, 8]} wrap>
            {tagsData.map((tag) => (
              <Tag.CheckableTag
                key={tag.value}
                checked={selectedTags.includes(tag.value)}
                onChange={(checked) => {
                  if (tag.value === 'all') {
                    if (checked) {
                      // 去掉其他的
                      setSelectedTags([tag.value])
                    } else {
                      setSelectedTags([])
                    }
                  } else {
                    // 去掉all
                    if (checked) {
                      setSelectedTags([...selectedTags.filter((item) => item !== 'all'), tag.value])
                    } else {
                      setSelectedTags(selectedTags.filter((item) => item !== tag.value))
                    }
                  }
                }}
              >
                {tag?.color && <Badge color={tag?.color} />}
                <span style={{ marginLeft: tag?.color ? 5 : 0 }}>{t(tag?.key)}</span>
              </Tag.CheckableTag>
            ))}
          </Space>
        </div>
        <Space>
          <Select
            style={{ width: 120 }}
            value={language}
            placeholder={t('prompt.languagePlaceholder') as string}
            onChange={(value) => {
              setLanguage(value)
            }}
          >
            {LanguageList.map((item) => {
              return (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              )
            })}
          </Select>
          <Space.Compact style={{ width: '100%' }}>
            <Input.Search
              allowClear
              placeholder={t('prompt.searchPlaceholder') as string}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onPressEnter={() => {
                searchRequest()
              }}
            />
          </Space.Compact>
        </Space>
      </div>
      <div id="messageBox" style={{ flex: 1, padding: '16 16 16 16', position: 'relative', overflowX: 'hidden', overflowY: 'auto' }}>
        {list.length <= 0 ? (
          <Empty style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}></Empty>
        ) : (
          <Row style={{ flexWrap: 'wrap', paddingLeft: 8, paddingTop: 8 }} gutter={[16, 16]}>
            {list.map((item: Prompt) => {
              return (
                <Col key={item.uuid} span={6} xs={24} sm={12} md={8} lg={8} xl={6} xxl={6}>
                  <Item info={item} openInfo={() => openInfo(item)} />
                </Col>
              )
            })}
          </Row>
        )}
        <FloatButton.BackTop
          style={{ marginBottom: 105, marginRight: 16 }}
          // @ts-ignore
          target={() => {
            return document.getElementById('messageBox')
          }}
        />
      </div>
      <Drawer
        title={t('c.prompt')}
        onClose={() => setOpen(false)}
        extra={
          <Space>
            {(openItem as Prompt)?.isRecommend && (
              <Button
                type={openItem?.isRecommend ? 'default' : 'dashed'}
                title={t('prompt.tag.recommend') as string}
                style={{ color: openItem?.isRecommend ? token.colorError : token.colorTextLabel }}
                icon={(openItem as Prompt)?.isRecommend ? <FireFilled color={token.colorError} /> : <FireOutlined color={token.colorTextLabel} />}
              ></Button>
            )}
            <Button
              type={openItem?.isStar ? 'default' : 'dashed'}
              title={t('prompt.tag.star') as string}
              style={{ color: openItem?.isStar ? token.colorWarning : token.colorTextLabel }}
              icon={(openItem as Prompt)?.isStar ? <StarFilled color={token.colorError} /> : <StarOutlined color={token.colorTextLabel} />}
              onClick={() => {
                toStar(openItem as Prompt)
              }}
            ></Button>
          </Space>
        }
        footer={
          <Space align={'end'} style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button
              type="default"
              onClick={() => {
                toCopy(openItem as Prompt)
                setOpen(false)
              }}
            >
              {t('prompt.copy')}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setOpen(false)
                toChat(openItem as Prompt)
              }}
            >
              {t('prompt.chat')}
            </Button>
          </Space>
        }
        open={open}
        width={578}
        height={'80%'}
        destroyOnClose={true}
        placement={(size?.width as number) <= 1024 ? 'bottom' : 'right'}
      >
        <Edit action="add" page={false} edit={false} prompt={openItem as Prompt} />
      </Drawer>
    </div>
  )
}

export default OnlinePrompt

import { useSiteContext } from '@/contexts/site'
import { Avatar, Button, Card, Drawer, FloatButton, Input, InputRef, App, Popconfirm, Space, theme as antdTheme, Tooltip, Typography, Empty, Col, Row, Badge, message } from 'antd'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Plugin } from '@/types/plugin'
import { usePluginContext } from '@/contexts/plugin'

function Item(props: { info: Plugin; openInfo?: Function }) {
  const { info, openInfo } = props
  const [item, setItem] = useState<Plugin>(info)
  const { pluginList, starPlugin, unstarPlugin, installPlugin, uninstallPlugin } = usePluginContext()
  const { theme, lang } = useSiteContext()
  const { t } = useTranslation()
  const { token } = antdTheme.useToken()

  useEffect(() => {
    // 获取语言,语言-换成_，如果没有则使用默认语言
    const _lang = lang.replace('-', '_')
    const langInfo = info?.lang?.[_lang] || {}
    setItem({
      ...info,
      ...langInfo,
    })
  }, [info, lang])

  const toInstall = (item: Plugin) => {
    if (item.isInstall) {
      uninstallPlugin(item?.uuid)
      setItem({ ...item, isInstall: false })
      message.success(t('plugin.tag.uninstallSuccess'))
    } else {
      installPlugin(item)
      setItem({ ...item, isInstall: true })
      message.success(t('plugin.tag.installSuccess'))
    }
  }

  const toInfo = () => {
    // 跳转到详情页面
    openInfo?.(item)
  }

  return (
    <>
      <Card
        size={'small'}
        // extra={
        //   item.install ? (
        //     <StarFilled style={{ color: token.colorWarning }} onClick={() => unstarPlugin(item.uuid)} />
        //   ) : (
        //     <StarOutlined style={{ color: token.colorTextDisabled }} onClick={() => starPlugin(item)} />
        //   )
        // }
        hoverable={true}
        title={null}
        bordered={true}
        style={{ width: '100%' }}
      >
        <div style={{ width: '100%', flexDirection: 'column', display: 'flex' }}>
          <div style={{ width: '100%', flexDirection: 'row', display: 'flex' }}>
            <div style={{ width: 80, overflow: 'hidden' }} onClick={toInfo}>
              <Image src={item.image as string} width={64} height={64} alt={item.name as string} style={{ borderRadius: 4, overflow: 'hidden' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div onClick={toInfo} style={{ width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                <Typography.Title style={{}} level={5}>
                  {item.name}
                </Typography.Title>
                <Space size={6} align={'start'}>
                  {item?.isRecommend && <Badge color={'red'} title={t('plugin.tag.recommend') as string} />}
                  {item?.isInstall && <Badge color={'blue'} title={t('plugin.tag.install') as string} />}
                  {item?.isStar && <Badge color={'orange'} title={t('plugin.tag.star') as string} />}
                  {item?.isNew && <Badge color={'green'} title={t('plugin.tag.new') as string} />}
                </Space>
              </div>
              <div>
                <Space>
                  <Button type={item?.isInstall ? 'default' : 'primary'} size={'small'} style={{ fontSize: 12 }} onClick={() => toInstall(item)}>
                    {item?.isInstall ? t('plugin.tag.uninstall') : t('plugin.tag.install')}
                  </Button>
                </Space>
              </div>
              {/* <Typography.Text style={{ fontSize: 12, color: token.colorTextDisabled }}>{item.datetime}</Typography.Text> */}
            </div>
          </div>
          <div style={{ marginTop: 10, minHeight: 58 }} onClick={toInfo}>
            <Typography.Paragraph style={{ fontSize: 12, marginBottom: 0 }} ellipsis={{ expandable: false, rows: 3 }} copyable={false}>
              {item.intro}
            </Typography.Paragraph>
          </div>
        </div>
      </Card>
    </>
  )
}

export default Item

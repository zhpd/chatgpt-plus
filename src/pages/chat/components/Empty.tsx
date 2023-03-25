import { useSiteContext } from '@/contexts/site'
import { Avatar, Col, Row, theme as antdTheme, Typography } from 'antd'
import { BulbOutlined, WarningOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import { ReactNode } from 'react'
import React from 'react'

const styleTop: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px',
}
const styleMsg: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: '4px',
  margin: '10px',
  // background: '#0092ff',
  padding: '8px 12px',
}

function Empty(props: any) {
  const { t } = useTranslation()
  const { theme } = useSiteContext()
  const { token } = antdTheme.useToken()

  const data: { text: string; type?: string; icon?: ReactNode }[][] = [
    [
      { text: 'Examples', type: 'top', icon: <BulbOutlined style={{ fontSize: 24, color: theme === 'dark' ? '#fff' : undefined }} /> },
      { text: '"Explain quantum computingin simple terms" ' },
      { text: `"Got any creative ideas for a10 vear old's birthday?"` },
      { text: '"How do I make an HTTPrequest in Javascript?"' },
    ],
    [
      { text: 'Capabilities', type: 'top', icon: <ThunderboltOutlined style={{ fontSize: 24, color: theme === 'dark' ? '#fff' : undefined }} /> },
      { text: 'Remembers what user saidearlier in the conversation' },
      { text: 'Allows user to provide follow-up corrections' },
      { text: 'Trained to declineinappropriate requests' },
    ],
    [
      { text: 'Limitations', type: 'top', icon: <WarningOutlined style={{ fontSize: 24, color: theme === 'dark' ? '#fff' : undefined }} /> },
      { text: 'May occasionally generateincorrect information' },
      { text: 'May occasionally produceharmful instructions or biasedcontent' },
      { text: 'Limited knowledge of worldand events after 2021' },
    ],
  ]

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100%', ...props?.style }}>
      <Row>
        <Typography.Title level={2}>{t('title')}</Typography.Title>
      </Row>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexFlow: 'wrap',marginTop: 15 }}>
        {data.map((row, i) => (
          <Col key={i} style={{ flex: 1 }} span={6} offset={i == 0 ? 1.5 : 0} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6, offset: i == 0 ? 1.5 : 0 }}>
            {row.map((tt, j) => (
              <Col className="gutter-row" key={j}>
                {tt.type == 'top' ? (
                  // 图标+文字
                  <div style={styleTop}>
                    {tt.icon}
                    <Typography.Text style={{ marginTop: 12 }}>{tt.text}</Typography.Text>
                  </div>
                ) : (
                  <div
                    style={{
                      ...styleMsg,
                      borderColor: theme == 'dark' ? token.colorPrimaryHover : undefined,
                      backgroundColor: theme == 'dark' ? token.colorBgContainer : '#e8e8e8',
                      color: theme === 'dark' ? '#eee' : undefined,
                    }}
                  >
                    {tt.text}
                  </div>
                )}
              </Col>
            ))}
          </Col>
        ))}
      </div>
    </div>
  )
}

export default Empty

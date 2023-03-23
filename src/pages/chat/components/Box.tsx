import { useSiteContext } from '@/contexts/site'
import { Avatar, theme as antdTheme } from 'antd'
import Image from 'next/image'
import Markdown from './Markdown'

function Box(props: any) {
  const { item } = props
  const { theme } = useSiteContext()
  const { token } = antdTheme.useToken()
  return (
    <div
      key={item.dateTime}
      style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: item.inversion == true ? 'row-reverse' : 'row', width: 'auto', height: 'auto', padding: '10px 15px' }}
    >
      <div style={{ width: 48 }}>
        <Avatar shape={'circle'} size={42} style={{ padding: 4 }} src={<Image src={require('@/assets/openai.png')} width={42} height={42} alt="avatar" />} />
      </div>
      <div style={{ maxWidth: 'calc(100% - 30px)' }}>
        <div style={{ height: 25, color: '#c2cad3', textAlign: item.inversion == true ? 'right' : 'left' }}>{item.dateTime}</div>
        <div>
          <Markdown theme={theme} token={token} place={item.inversion == true ? 'right' : 'left'}>
            {item.text}
          </Markdown>
        </div>
      </div>
    </div>
  )
}

export default Box

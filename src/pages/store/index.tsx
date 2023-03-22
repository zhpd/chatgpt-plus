import { Button, Result } from 'antd'
import Head from 'next/head'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>Store</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
      </Head>
      <Result
        title="正在添加更多AI功能，敬请期待！"
        extra={
          <Button href="https://github.com/zhpd/chatgpt-plus" target="_blank" type="primary" key="console">
            Go Github
          </Button>
        }
      />
    </div>
  )
}

export default IndexPage

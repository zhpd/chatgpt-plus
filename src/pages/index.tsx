import React, { useState } from 'react'
// import ChatPage from './chat'

import dynamic from 'next/dynamic'
import { Spin } from 'antd'

const ChatPage = dynamic(() => import('./chat'), {
  ssr: false,
  loading: () => (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin tip="Loading"></Spin>
    </div>
  ),
})

const App: React.FC = () => {
  return (
    <>
      <ChatPage />
    </>
  )
}

export default App

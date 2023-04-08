import React from 'react'
import { ConfigProvider } from 'antd'

export const colorPrimary = '#1677ff'
// export const colorPrimary = '#00B96B'

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colorPrimary,
        },
      }}
    >
      {node}
    </ConfigProvider>
  </>
)

export default withTheme

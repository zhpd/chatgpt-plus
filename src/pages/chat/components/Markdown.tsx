import ReactMarkdown from 'react-markdown'
import { CopyOutlined, CheckOutlined } from '@ant-design/icons'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism' // 代码高亮主题风格
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
import { useState } from 'react'
import { Typography } from 'antd'

const them = {
  dark: oneDark,
  light: { ...oneLight, backgroundColor: '#fff' },
}
export type MarkdownProps = {
  children: string
  role?: 'user' | 'system'
  theme?: 'dark' | 'light' | 'auto' | 'mix'
  token?: any
  style?: React.CSSProperties
}

function Markdown(props: MarkdownProps) {
  const { role, theme, token, style } = props

  const backgroundColor = () => {
    if (role === 'user') {
      if (theme === 'dark') {
        return token.colorLinkHover
      } else {
        return token.colorPrimaryBgHover
      }
    } else {
      if (theme === 'dark') {
        return '#1e1e20'
      } else {
        return '#ebebeb'
      }
    }
  }

  // Add the CodeCopyBtn component to our PRE element
  // @ts-ignore
  const Pre = ({ children }) => (
    <pre className="blog-pre" style={{ position: 'relative' }}>
      <CodeCopyBtn
        style={{
          margin: '5px 0',
          textAlign: 'right',
          padding: '2px 10px',
          left: 0,
          right: 0,
          height: 30,
          lineHeight: '30px',
          backgroundColor: theme == 'dark' ? '#333' : '#bbb',
          borderRadius: '4px 4px 0 0',
        }}
      >
        {children}
      </CodeCopyBtn>
      <div style={{ paddingTop: 30 }}>{children}</div>
    </pre>
  )

  return (
    <div style={{ backgroundColor: backgroundColor(), borderRadius: 6, padding: 8, overflow: 'auto', ...style }}>
      <ReactMarkdown
        // eslint-disable-next-line react/no-children-prop
        children={props?.children}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          pre: Pre,
          code({ node, inline, className = '', children, ...props }) {
            // const match = /language-(\w+)/.exec(className || '')
            const language = className.split('-')[1]
            return !inline && language ? (
              <SyntaxHighlighter
                showLineNumbers={true} // 是否展示左侧行数
                lineNumberStyle={{ color: '#ddd', fontSize: 10 }} // 左侧行数的样式
                {...props}
                // @ts-ignore
                style={theme === 'dark' ? them.dark : them.light} // 主题风格
                language={language} // 需要语言类型 如css, jsx , javascript 等
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          p: ({ node, ...props }) => (
            <p style={{ marginBottom: 0, color: theme === 'dark' ? '#ffffffd9' : '#333' }} {...props}>
              {props.children}
            </p>
          ),
        }}
      />
    </div>
  )
}

// @ts-ignore
function CodeCopyBtn({ style, children }) {
  const [copyOk, setCopyOk] = useState(false)
  const language = children?.[0]?.props?.className?.split('-')[1]

  const handleClick = () => {
    const _props = children?.[0].props
    let text = _props.children?.[0]
    let xcode = ''
    xcode = xcode + '// ' + language + '\n'
    xcode = xcode + text + '\n'
    navigator.clipboard.writeText(xcode)
    console.log('language text:', language)
    console.log('copy text:\n', xcode)
    setCopyOk(true)
    setTimeout(() => {
      setCopyOk(false)
    }, 1200)
  }

  return (
    <div style={{ position: 'absolute', margin: 6, top: 5, right: 10, ...style }}>
      <Typography.Paragraph style={{ display: 'inline', marginRight: 10 }}>{language}</Typography.Paragraph>
      {copyOk ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined onClick={handleClick} />}
    </div>
  )
}

export default Markdown

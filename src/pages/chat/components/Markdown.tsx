import ReactMarkdown from 'react-markdown'
import { CopyOutlined, CheckOutlined } from '@ant-design/icons'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism' // 代码高亮主题风格
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
import { useEffect, useState } from 'react'
import { Typography } from 'antd'
import 'github-markdown-css/github-markdown.css'

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
  // useEffect(() => {
  //   if (theme == 'dark') {
  //     require('github-markdown-css/github-markdown-dark.css')
  //   } else {
  //     require('github-markdown-css/github-markdown-light.css')
  //   }
  // }, [theme])

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
  const Pre = ({ children }) => {
    const language = children?.[0]?.props?.className?.split('-')[1]
    return (
      <pre className="blog-pre" style={{ position: 'relative', borderRadius: 6, background: theme === 'dark' ? '#282c34' : '#fafafa', marginTop: 5, padding: '0 16px' }}>
        <CodeCopyBtn theme={theme} style={{}}>
          {children}
        </CodeCopyBtn>
        <div style={{ paddingTop: 23, borderRadius: 0, overflow: 'hidden' }}>{children}</div>
      </pre>
    )
  }

  return (
    <article className="markdown-body" style={{ colorScheme: theme, backgroundColor: backgroundColor(), fontSize: '14px', borderRadius: 6, padding: 8, overflow: 'auto', ...style }}>
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
            return !inline ? (
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
            <p style={{ ...props?.style, marginBottom: 0, color: theme === 'dark' ? '#ffffffd9' : '#333' }} {...props}>
              {props.children}
            </p>
          ),
        }}
      />
    </article>
  )
}

// @ts-ignore
function CodeCopyBtn({ theme, style, children }) {
  const [copyOk, setCopyOk] = useState(false)
  const language = children?.[0]?.props?.className?.split('-')[1]

  const handleClick = () => {
    const _props = children?.[0].props
    let text = _props.children?.[0]
    let xcode = ''
    // xcode = language ? xcode + '// ' + language + '\n' : ''
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
    <>
      <div
        // 不显示复制条
        // style={{ position: 'absolute', margin: 6, top: 5, right: 10, ...style }}
        style={{
          position: 'absolute',
          top: 0,
          margin: '0px 0',
          textAlign: 'right',
          padding: '2px 10px',
          left: 0,
          right: 0,
          height: '24px',
          lineHeight: '24px',
          backgroundColor: theme == 'dark' ? '#333' : '#bbb',
          borderRadius: '4px 4px 0 0',
        }}
      >
        <Typography.Paragraph style={{ display: 'inline', marginRight: 10 }}>{language}</Typography.Paragraph>
        {copyOk ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined onClick={handleClick} />}
      </div>
    </>
  )
}

export default Markdown

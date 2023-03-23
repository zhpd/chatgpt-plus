import { useSiteContext } from '@/contexts/site'
import { Avatar, Card, FloatButton, theme as antdTheme } from 'antd'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Box from './Box'

function Message() {
  const router = useRouter()
  const { token } = antdTheme.useToken()
  const { theme } = useSiteContext()
  const { t } = useTranslation()
  const [uuid, setUuid] = useState<any>(null)
  const [list, setList] = useState<any>([])
  const _data = {
    uuid: 1679282990940,
    data: [
      {
        dateTime: '2023/3/20 11:32:26',
        text: '帮我用js写一个登录请求的方法',
        inversion: true,
        error: false,
        conversationOptions: null,
        requestOptions: {
          prompt: '帮我用js写一个登录请求的方法',
          options: null,
        },
      },
      {
        dateTime: '2023/3/20 11:33:00',
        text: "当用户提交登录表单时，您可以使用JavaScript编写一个登录请求方法来向服务器发送请求以验证用户凭据。以下是一个示例函数，它使用Fetch API发送一个POST请求到服务器，以便将用户名和密码发送给服务器：\n\n```javascript\nasync function login(username, password) {\n  const url = 'https://example.com/login'; // 修改为实际的登录地址\n  const data = { username: username, password: password };\n  const options = {\n    method: 'POST',\n    body: JSON.stringify(data),\n    headers: {\n      'Content-Type': 'application/json'\n    }\n  };\n\n  try {\n    const response = await fetch(url, options);\n    const json = await response.json();\n    // 处理服务器返回的JSON响应\n    console.log(json);\n  } catch (error) {\n    // 处理错误\n    console.error(error);\n  }\n}\n```\n\n在这个函数中，我们使用Fetch API发送一个POST请求到服务器，将用户名和密码作为JSON对象发送到服务器。请注意，这个函数是异步的，因为我们需要等待服务器的响应。如果请求成功，我们使用await关键字从响应中解析JSON数据，并将其打印到控制台上。如果请求失败，我们使用try...catch语句来捕获错误并打印到控制台上。\n\n当您调用这个函数时，您需要将用户名和密码作为参数传递给它：\n\n```javascript\nlogin('myusername', 'mypassword');\n```\n\n请注意，这个示例函数只是一个基本的登录请求方法，您需要将其修改为与您的实际应用程序和服务器端点相匹配。您可能需要调整URL、请求头和请求主体等参数，以确保请求正确地发送到服务器。",
        inversion: false,
        error: false,
        loading: false,
        conversationOptions: {
          conversationId: '34132d2a-0aec-49a8-a70f-ca0133cfbdee',
          parentMessageId: '1ab429f3-c7a4-42f5-ba5c-6a479fdef018',
        },
        requestOptions: {
          prompt: '帮我用js写一个登录请求的方法',
          options: {},
        },
      },
      {
        dateTime: '2023/3/20 11:34:13',
        text: '用axios这个库',
        inversion: true,
        error: false,
        conversationOptions: null,
        requestOptions: {
          prompt: '用axios这个库',
          options: null,
        },
      },
      {
        dateTime: '2023/3/20 11:34:43',
        text: "当用户提交登录表单时，您可以使用axios库来编写一个登录请求方法，以向服务器发送请求以验证用户凭据。以下是一个示例函数，它使用axios发送一个POST请求到服务器，以将用户名和密码发送给服务器：\n\n```javascript\nasync function login(username, password) {\n  const url = 'https://example.com/login'; // 修改为实际的登录地址\n  const data = { username: username, password: password };\n  const config = {\n    headers: {\n      'Content-Type': 'application/json'\n    }\n  };\n\n  try {\n    const response = await axios.post(url, data, config);\n    // 处理服务器返回的数据\n    console.log(response.data);\n  } catch (error) {\n    // 处理错误\n    console.error(error);\n  }\n}\n```\n\n在这个函数中，我们使用axios发送一个POST请求到服务器，将用户名和密码作为JSON对象发送到服务器。请注意，这个函数是异步的，因为我们需要等待服务器的响应。如果请求成功，我们将服务器返回的数据打印到控制台上。如果请求失败，我们使用try...catch语句来捕获错误并打印到控制台上。\n\n当您调用这个函数时，您需要将用户名和密码作为参数传递给它：\n\n```javascript\nlogin('myusername', 'mypassword');\n```\n\n请注意，这个示例函数只是一个基本的登录请求方法，您需要将其修改为与您的实际应用程序和服务器端点相匹配。您可能需要调整URL、请求头和请求主体等参数，以确保请求正确地发送到服务器。",
        inversion: false,
        error: false,
        loading: false,
        conversationOptions: {
          conversationId: '34132d2a-0aec-49a8-a70f-ca0133cfbdee',
          parentMessageId: 'c41041a8-b67a-4a2d-a303-43ccb59c0a04',
        },
        requestOptions: {
          prompt: '用axios这个库',
          options: {
            conversationId: '34132d2a-0aec-49a8-a70f-ca0133cfbdee',
            parentMessageId: '1ab429f3-c7a4-42f5-ba5c-6a479fdef018',
          },
        },
      },
      {
        dateTime: '2023/3/20 11:39:31',
        text: '😂',
        inversion: true,
        error: false,
        conversationOptions: null,
        requestOptions: {
          prompt: '😂',
          options: null,
        },
      },
      {
        dateTime: '2023/3/20 11:39:34',
        text: "I'm glad I made you laugh! Is there anything I can help you with today?",
        inversion: false,
        error: false,
        loading: false,
        conversationOptions: {
          conversationId: '2f331b40-2270-487f-90f4-1a2e7407b352',
          parentMessageId: '7b8be987-6cdf-49a2-83b4-c3dbe66c72da',
        },
        requestOptions: {
          prompt: '😂',
          options: {},
        },
      },
      {
        dateTime: '2023/3/20 11:39:42',
        text: '翻译上面的内容',
        inversion: true,
        error: false,
        conversationOptions: null,
        requestOptions: {
          prompt: '翻译上面的内容',
          options: null,
        },
      },
      {
        dateTime: '2023/3/20 11:39:48',
        text: '我是ChatGPT，一个由OpenAI训练的大型语言模型，基于GPT-3.5架构。\n知识截止日期为2021年9月，当前日期为2023年3月20日。',
        inversion: false,
        error: false,
        loading: false,
        conversationOptions: {
          conversationId: '272d6d5d-d213-44c4-b78f-1b9cd554848f',
          parentMessageId: 'a97cb290-5b15-4f0c-b1f2-039f8ada3da6',
        },
        requestOptions: {
          prompt: '翻译上面的内容',
          options: {},
        },
      },
      {
        dateTime: '2023/3/20 11:40:09',
        text: '😂',
        inversion: true,
        error: false,
        conversationOptions: null,
        requestOptions: {
          prompt: '😂',
          options: null,
        },
      },
      {
        dateTime: '2023/3/20 11:40:13',
        text: '看起来您在开玩笑，请问有什么我可以帮助您的吗？',
        inversion: false,
        error: false,
        loading: false,
        conversationOptions: {
          conversationId: '272d6d5d-d213-44c4-b78f-1b9cd554848f',
          parentMessageId: 'ce5c8716-cea2-4c9e-a82b-f22dc584f6ee',
        },
        requestOptions: {
          prompt: '😂',
          options: {
            conversationId: '272d6d5d-d213-44c4-b78f-1b9cd554848f',
            parentMessageId: 'a97cb290-5b15-4f0c-b1f2-039f8ada3da6',
          },
        },
      },
      {
        dateTime: '2023/3/20 11:44:35',
        text: '发一张js的logo图',
        inversion: true,
        error: false,
        conversationOptions: null,
        requestOptions: {
          prompt: '发一张js的logo图',
          options: null,
        },
      },
      {
        dateTime: '2023/3/20 11:44:41',
        text: '很抱歉，作为语言模型，我无法直接提供图片。但是，你可以在互联网上搜索“JavaScript logo”以获取相关的图片结果。',
        inversion: false,
        error: false,
        loading: false,
        conversationOptions: {
          conversationId: '272d6d5d-d213-44c4-b78f-1b9cd554848f',
          parentMessageId: '1175daaf-20ef-4c75-aa72-ad2526965cad',
        },
        requestOptions: {
          prompt: '发一张js的logo图',
          options: {
            conversationId: '272d6d5d-d213-44c4-b78f-1b9cd554848f',
            parentMessageId: 'ce5c8716-cea2-4c9e-a82b-f22dc584f6ee',
          },
        },
      },
      {
        dateTime: '2023/3/20 16:29:48',
        text: '用fetch请求测试接口的代码示例',
        inversion: true,
        error: false,
        conversationOptions: null,
        requestOptions: {
          prompt: '用fetch请求测试接口的代码示例',
          options: null,
        },
      },
      {
        dateTime: '2023/3/20 16:30:30',
        text: "好的，以下是使用 JavaScript fetch API 进行 API 请求的示例代码：\n\n```javascript\nfetch('https://example.com/api/data')\n  .then(response => {\n    if (!response.ok) {\n      throw new Error('Network response was not ok');\n    }\n    return response.json();\n  })\n  .then(data => {\n    console.log(data);\n    // 这里可以对获取到的数据进行处理\n  })\n  .catch(error => {\n    console.error('There was a problem with the fetch operation:', error);\n  });\n```\n\n在这个例子中，我们使用 `fetch()` 函数来发送 HTTP GET 请求，并将 API URL 作为参数传递给该函数。 `fetch()` 函数返回一个 Promise 对象，可以通过 `then()` 方法来获取响应对象。\n\n在第一个 `then()` 中，我们检查响应对象的 `ok` 属性，以确保响应成功。如果响应不成功，我们使用 `throw` 关键字抛出一个自定义错误。\n\n如果响应成功，我们可以通过 `json()` 方法将响应转换为 JSON 格式的数据，并在第二个 `then()` 中处理这些数据。在这个例子中，我们只是简单地将数据打印到控制台中。\n\n最后，如果请求出现任何问题，我们可以通过 `catch()` 方法来捕获错误，并将其记录在控制台中。",
        inversion: false,
        error: false,
        loading: false,
        conversationOptions: {
          conversationId: '272d6d5d-d213-44c4-b78f-1b9cd554848f',
          parentMessageId: 'c7a68fee-ba02-47ab-8324-7483c5922bc2',
        },
        requestOptions: {
          prompt: '用fetch请求测试接口的代码示例',
          options: {
            conversationId: '272d6d5d-d213-44c4-b78f-1b9cd554848f',
            parentMessageId: '1175daaf-20ef-4c75-aa72-ad2526965cad',
          },
        },
      },
    ],
  }

  useEffect(() => {
    const _uuid = router.query?.uuid
    if (_uuid) {
      console.log(_uuid)
      setUuid(_uuid)
      setList(() => {
        // 滚动到最底部
        const ele = document.getElementById('messageBox')
        if (ele) {
          ele.scrollTo(0, ele.scrollHeight)
        }
        return _data.data
      })
    }
  }, [router?.query])

  return (
    <div id="messageBox" style={{ border: '0px solid #efeff5', flex: 1, padding: 16, overflow: 'auto' }}>
      {list.map((item: any) => {
        return <Box key={item.dateTime} item={item} />
      })}
      <FloatButton.BackTop
        style={{ marginBottom: 50, marginRight: 20 }}
        // @ts-ignore
        target={() => {
          return document.getElementById('messageBox')
        }}
      />
    </div>
  )
}

export default Message

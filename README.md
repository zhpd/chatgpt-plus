<p align="center">
  <a href="/">
    <img width="100" src="./public/logo.svg">
  </a>
</p>

<h1 align="center">ChatGPT-Plus</h1>

<div align="center">

ChatGPT-Plus 是使用官方 ChatGPT API 的应用程序。

<!-- ChatGPT-Plus application that uses the official ChatGPT API. -->

<p align="center">喜欢这个项目吗？请帮忙点个 Star ⭐️<br/>或者分享给您的朋友，以帮助它得到改善！</p>

</div>

[![](./docs/screen_light.png)](https://github.com/zhpd/chatgpt-plus)
[![](./docs/screen_dark.png)](https://github.com/zhpd/chatgpt-plus)

[简体中文](./README.md) | [English](./README_en.md) | [Spanish](./README-sp_MX.md) | [日本語](./README-ja_JP.md)

<!-- > 声明：此项目只发布于 Github，基于 MIT 协议，免费且作为开源学习使用。 -->

# Features

- [介绍](#介绍)
- [特性](#特性)
- [原理](#原理)
- [在线开发](#在线开发)
- [安装运行](#安装依赖)
  - [克隆项目](#克隆项目)
  - [环境配置](#环境配置)
  - [前端网页](#前端)
  - [后端服务](#后端)
- [打包部署](#打包)
  - [使用 Docker 部署](#使用-docker)
    - [Docker 参数示例](#docker-参数示例)
    - [Docker build \& Run](#docker-build--run)
    - [Docker compose](#docker-compose)
  - [使用 Vercel 部署](#使用-Vercel-部署)
    - [Vercel 环境变量](#Vercel-环境变量)
  - [手动打包](#手动打包)
    - [前端网页](#前端网页-1)
    - [后端服务](#后端服务-1)
- [附加说明](#附加说明)
- [常见问题](#常见问题)
- [参与贡献](#参与贡献)
- [感谢](#感谢)
- [赞助](#赞助)
- [License](#license)

## 📖 介绍

ChatGPT-Plus 客户端是官方 ChatGPT API 的应用程序。该应用程序是对 OpenAI 的[ChatGPT](https://openai.com/blog/chatgpt)的官方 API 的封装应用。

<!-- ChatGPT-Plus client for the official ChatGPT API. This Application is a web wrapper around [ChatGPT](https://openai.com/blog/chatgpt) by [OpenAI](https://openai.com). -->

## ✨ 特性

- 📦 一个完整的 ChatGPT 客户端。
- 🚀 使用 Nextjs & Nestjs 构建，快速启动。
- 📱 响应式设计，支持移动端访问。
- 🌈 支持多种主题, 白天/夜间模式。
- 🌍 国际化支持，目前支持中文和英文。
- 📦 支持自定义提示词，查看在线推荐提示词
- 🎨 使用 CSS-in-JS 技术，支持主题定制。
- 📦 支持 Docker & Vercel 部署。

## 🔬 原理

提供两种方式进行访问，要在 Node.js 中使用此模块，您需要在两种方法之间选择：

| 方法                        | 免费？ | 健壮？  | 质量？                  |
| --------------------------- | ------ | ------- | ----------------------- |
| `ChatGPTAPI`                | ❌ 否  | ✅ 是   | ✅️ 真实的 ChatGPT 模型 |
| `ChatGPTUnofficialProxyAPI` | ✅ 是  | ☑️ 可能 | ✅ 真实的 ChatGPT       |

1. `ChatGPTAPI` - 使用带有官方 OpenAI 聊天完成 API（官方、强大的方法，但不免费）的`gpt-3.5-turbo-0301`模型。您可以覆盖模型、完成参数和系统消息，以完全自定义您的助手。

2. `ChatGPTUnofficialProxyAPI` - 使用非官方代理服务器以绕过 Cloudflare 的方式访问 ChatGPT 的后端 API（使用真实的 ChatGPT，比较轻量级，但依赖第三方服务器且有速率限制）。

这两种方法具有非常相似的 API，因此在它们之间切换应该很简单。

注意：我们强烈建议使用`ChatGPTAPI`，因为它使用 OpenAI 官方支持的 API。在未来的发布版本中，我们可能会停止对`ChatGPTUnofficialProxyAPI`的支持。

> 该请求原理采用的是 [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api)提供的功能模块.

## 💻 在线开发

你可以使用 Gitpod 进行在线开发：

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/zhpd/chatgpt-plus)

或者克隆到本地开发，按照以下步骤进行：

## 🚀 安装运行

### 克隆项目

```bash
# clone the project
git clone https://github.com/zhpd/chatgpt-plus.git
```

> 如果没有 git 环境，可以直接下载 zip 包，解压后进入项目目录

### 环境配置

#### Node v14+

> 本项目基于 Node.js 进行开发，需要 Node.js 14.0+ 环境。Make sure you're using `node >= 18` so `fetch` is available (or `node >= 14` if you install a [fetch polyfill](https://github.com/developit/unfetch#usage-as-a-polyfill)).

#### Api Key / AccessToken

本项目使用的是 OpenAI 官方提供的 API，需要申请 Api Key 和 AccessToken

> - OpenAI 官方注册申请地址：[https://platform.openai.com/](https://platform.openai.com/)，需要科学上网
> - 通过其他方式获取 `ApiKey` 或 `AccessToken` [点击查看](#附加内容)

申请成功后，将 APIKey 和 AccessToken 填写到 `chatgpt-plus/service/.env` 文件中

#### 可选 VSCode

> 推荐使用 [VSCode](https://code.visualstudio.com/) 编辑器进行开发，安装插件 `ESLint` 和 `Prettier`，并在设置中开启 `Format On Save`

### 前端网页

#### 环境变量-前端

配置端口和接口请求地址在根目录.env 里。
可直接复制根目录下的.env.example 文件进行修改，文件名修改为.env）

| 环境变量名 | 默认值                  | 说明     |
| ---------- | ----------------------- | -------- |
| `PORT`     | `3000`                  | 端口     |
| `API_URL`  | `http://localhost:3002` | 接口地址 |

<details>
<summary> 配置文件</summary>

可直接复制根目录下的.env.example 文件进行修改，文件名修改为.env

```env
# port
PORT=3000

# api url
API_URL=http://localhost:3002

```

</details>

#### 运行代码

```bash
# enter the project directory
cd chatgpt-plus
# install dependency
npm install
# develop
npm run dev
```

> 运行启动成功后，可在浏览器打开 http://localhost:3000 查看效果

### 后端服务

#### 环境变量-后端

配置端口和 ApiKey、AccessToken 在 service 目录下.env 里

| 环境变量名            | 默认值                                      | 说明              |
| --------------------- | ------------------------------------------- | ----------------- |
| `PORT`                | `3002`                                      | 端口              |
| `OPENAI_API_KEY`      | -                                           | API_KEY           |
| `OPENAI_ACCESS_TOKEN` | -                                           | ACCESS_TOKEN      |
| `API_REVERSE_PROXY`   | `https://bypass.duti.tech/api/conversation` | [代理](#反向代理) |
| `TIMEOUT_MS`          | 60000                                       | 超时毫秒数        |

<details>
<summary> 配置文件</summary>

可直接复制 service 目录下的.env.example 文件进行修改，文件名修改为.env

```env
# service/.env
# OpenAI API Key - https://platform.openai.com/overview
OPENAI_API_KEY=

# change this to an `accessToken` extracted from the ChatGPT site's `https://chat.openai.com/api/auth/session` response
OPENAI_ACCESS_TOKEN=

# Reverse Proxy default 'https://bypass.duti.tech/api/conversation'
API_REVERSE_PROXY=

# timeout
TIMEOUT_MS=100000

```

</details>

#### 运行代码

```bash
# enter the project directory
cd chatgpt-plus
# enter the service directory
cd service
# install dependency
npm install
# develop
npm run dev
```

> 运行启动成功后，后端服务便可正常运行

## 📦 打包部署

### 使用 Docker 部署

#### Docker 参数示例

```bash
 待补充
```

### 使用 Vercel 部署

#### Vercel 参数示例

```bash
 待补充
```

### 手动打包

#### 前端网页

- 代码打包
  - 进入项目根文件夹
  - 修改根目录下 `.env` 文件中的 `API_URL` 为你的实际后端接口公网地址
  - 运行 `npm install` 安装依赖
  - 运行 `npm run build` 打包代码
- 运行部署
  - 将 `dist` 文件夹内的文件复制到你网站 `前端服务` 的目录下
  - 进入 `dist` 文件夹
  - 运行 `npm run start` 启动服务

#### 后端服务

- 代码打包
  - 进入 `service` 文件夹
  - 运行 `npm install` 安装依赖
  - 运行 `npm run build` 打包代码
- 运行部署
  - 将 `service/dist` 文件夹内的文件复制到你网站 `后端服务` 的目录下
  - 进入 `service/dist` 文件夹
  - 运行 `npm run start` 启动服务

> **备注**: 如果不想进行打包，可以直接复制 `service`文件夹 到服务器上运行 `npm install` 和 `npm run start` 也可以启动服务

## ℹ️ 附加内容

### 获取密钥 API Key

<details>
<summary>配置文件</summary>

您可以通过给后端服务.env 配置`OPENAI_API_KEY`密钥进行访问：

```env
# R OpenAI API Key
OPENAI_API_KEY =
```

</details>

本项目使用的是 OpenAI 官方提供的 API，需要先申请 OpenAI 账号

- OpenAI 官方注册申请地址：[https://platform.openai.com/](https://platform.openai.com/)，需要科学上网
- 注册成功后，通过[https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) 获取 API Key，需要科学上网

### 获取访问令牌 accessToken

<details>
<summary>配置文件</summary>

您可以通过给后端服务.env 配置`OPENAI_ACCESS_TOKEN`访问令牌访问：

```env
# change this to an `accessToken` extracted from the ChatGPT
OPENAI_ACCESS_TOKEN =
```

</details>

您需要从 ChatGPT Web 应用程序获取一个 OpenAI 访问令牌。您可以使用以下任何方法之一，这些方法需要一个`email`和`password`，并返回一个访问令牌：

- - Node.js 库
  - [ericlewis/openai-authenticator](https://github.com/ericlewis/openai-authenticator)
  - [michael-dm/openai-token](https://github.com/michael-dm/openai-token)
  - [allanoricil/chat-gpt-authenticator](https://github.com/AllanOricil/chat-gpt-authenticator)

- - Python 库
  - [acheong08/OpenAIAuth](https://github.com/acheong08/OpenAIAuth)

_这些库与使用电子邮件和密码进行身份验证的帐户配合使用（例如，它们不支持通过 Microsoft / Google 进行身份验证的帐户）。_

另外，您可以通过登录 ChatGPT Web 应用程序并打开`https://chat.openai.com/api/auth/session`来手动获取一个`accessToken`，该链接将返回一个 JSON 对象，其中包含您的`accessToken`字符串。

**访问令牌有效期为数天。**

> **注意**：使用反向代理将使您的访问令牌暴露给第三方。这不会产生任何不利影响，但在使用此方法之前，请考虑风险。

### 反向代理

<details>
<summary>配置文件</summary>

您可以通过给后端服务.env 配置`API_REVERSE_PROXY`代理地址覆盖反向代理：

```env
# Reverse Proxy
API_REVERSE_PROXY =
```

</details>

社区成员运行的已知反向代理包括：

| 反向代理 URL                                      | 作者                                         | 速率限制                     | 最后检查日期 |
| ------------------------------------------------- | -------------------------------------------- | ---------------------------- | ------------ |
| `https://bypass.churchless.tech/api/conversation` | [@acheong08](https://github.com/acheong08)   | 5 req / 10 seconds by IP     | 3/24/2023    |
| `https://api.pawan.krd/backend-api/conversation`  | [@PawanOsman](https://github.com/PawanOsman) | 50 req / 15 seconds (~3 r/s) | 3/23/2023    |

注：目前不公布反向代理工作方式的信息，以防止 OpenAI 禁用访问。

## ❓ 常见问题

Q: 如果只使用前端页面，在哪里改请求接口？

A: 根目录下 `.env` 文件中的 `API_URL` 字段。

Q: 前端没有打字机效果？

A: 一种可能原因是经过 Nginx 反向代理，开启了 buffer，则 Nginx 会尝试从后端缓冲一定大小的数据再发送给浏览器。请尝试在反代参数后添加 `proxy_buffering off;`，然后重载 Nginx。其他 web server 配置同理。

## 🤝 参与贡献

<!-- 贡献之前请先阅读 [贡献指南](./CONTRIBUTING.md) -->

感谢所有做过贡献的人!

<a href="https://github.com/zhpd/chatgpt-plus/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=zhpd/chatgpt-plus" />
</a>

## 🙏 感谢

- 非常感谢项目支持者和所有其他贡献者 💪
- 非常感谢最初构建的参考项目[@transitive-bullshit](https://github.com/transitive-bullshit)的[chatgpt-api](https://github.com/danielgross)和[@Chanzhaoyu](https://github.com/Chanzhaoyu)的[chatgpt-web](https://github.com/Chanzhaoyu/chatgpt-web)提供的思路。👍
- 非常感谢[OpenAI](https://openai.com) 创建的 [ChatGPT](https://openai.com/blog/chatgpt/) 🔥

## 💰 赞助

如果您觉得本项目对您有帮助，可以帮忙点个 Star ⭐️，或者分享给您的朋友，您的支持是我最大的动力！

## 📜 License

MIT © [zhpd](./license)

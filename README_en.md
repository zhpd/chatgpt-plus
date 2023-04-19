<p align="center">
  <a href="/">
    <img width="100" src="https://imgmo.com/images/2023/04/08/298d94cf1fb9dea25ed74e3564a38c40.png">
  </a>
</p>

<h1 align="center">ChatGPT-Plus</h1>

<div align="center">

ChatGPT-Plus is an application utilizing the official ChatGPT API.

<!-- ChatGPT-Plus application that uses the official ChatGPT API. -->

[Demo](https://chatgpt-plus.app/) / [Report Issues](https://github.com/zhpd/chatgpt-plus/issues) / [Development](https://gitpod.io/#https://github.com/zhpd/chatgpt-plus) / [Deployment Vercel](https://vercel.com/new/clone?repository-url=https://github.com/zhpd/chatgpt-plus)

[简体中文](./README.md) | [English](./README_en.md)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zhpd/chatgpt-plus)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/zhpd/chatgpt-plus)

<p align="center">Do you like this project? Please give it a Star ⭐️<br/>or share it with your friends to help improve it!</p>

</div>

[![](https://imgmo.com/images/2023/04/08/3615c13916e244e4aced2cffe3e2e29e.png)](https://github.com/zhpd/chatgpt-plus)

[![](https://imgmo.com/images/2023/04/08/105a342e5e099df7dd2546c69e5528a2.png)](https://github.com/zhpd/chatgpt-plus)


<!-- | [Spanish](./README-sp_MX.md) | [日本語](./README-ja_JP.md) -->

<!-- > Statement: This project is only released on Github, is based on MIT, is free, and serves as an open source learning use. -->

# Features

- [Introduction](#Introduction)
- [Features](#Features)
- [Principle](#Principle)
- [Online Development](#Online)
- [Installation and Operation](#Installation)
  - [Clone Project](#Clone)
  - [Environment Configuration](#Environment)
  - [Front-end Page](#Front-end)
  - [Back-end Service](#Back-end)
- [Package Deployment](#Packaging)
  - [Deploy using Docker](#Packaging)
    <!-- - [Docker compose](#docker-compose) -->
  - [Deploy using Vercel](#Packaging)
    <!-- - [Vercel环境变量](#Vercel环境变量) -->
  - [Manual Packaging](#ManualPackaging)
    - [Front-end Page](#Front-end-Page)
    - [Back-end Service](#Back-endService)
- [Additional Information](#Additional)
- [FAQ](#FAQ)
- [Contribute](#Contribute)
- [Thanks](#Thanks)
- [Sponsorship](#Sponsorship)
- [License](#License)

## 📖Introduction

ChatGPT-Plus client is an application utilizing the official ChatGPT API from OpenAI's [ChatGPT](https://openai.com/blog/chatgpt).

<!-- ChatGPT-Plus client for the official ChatGPT API. This Application is a web wrapper around [ChatGPT](https://openai.com/blog/chatgpt) by[OpenAI](https://openai.com). -->

## ✨Features

- 📦A complete ChatGPT client.
- 🚀Built using Nextjs & Nestjs, fast to start.
- 📱Responsive design, supports mobile access.
- 🌈Supports multiple themes, light/dark modes.
- 🌍Internationalization support. Chinese and English are supported.
- 📦Supports custom prompt words, view online recommended prompt words.
- 🎨Uses CSS-in-JS technology, supports theme customization.
- 📦Supports Docker & Vercel deployment.

## 🔬Principle

There are two methods provided for accessing the ChatGPT API. To use this module in Node.js, you must choose between two methods:

| Method                      | Free?  | Robust? | Quality?                  |
| --------------------------- | ------ | ------- | ------------------------- |
| `ChatGPTAPI`                | ❌ No | ✅ Yes  | ✅️ Real ChatGPT model |
| `ChatGPTUnofficialProxyAPI` | ✅ Yes | ☑️ Maybe | ✅ Real ChatGPT       |

1. `ChatGPTAPI` - Uses the `gpt-3.5-turbo-0301` model with the official OpenAI ChatGPT API (official and powerful, but not free). You can override the model, completion parameters, and system messages to fully customize your assistant.

2. `ChatGPTUnofficialProxyAPI` - Use an unofficial proxy server to access the backend API of ChatGPT by bypassing Cloudflare (lightweight compared to `ChatGPTAPI`, but relies on third-party servers and has rate limiting).

These two methods have very similar APIs, so switching between them should be straightforward.

Note: We strongly recommend using `ChatGPTAPI` because it uses the API supported by OpenAI. We may stop supporting `ChatGPTUnofficialProxyAPI` in future releases.

> The request principle uses the functional module provided by [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api).

## 💻Online Development

You can use Gitpod for online development:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/zhpd/chatgpt-plus)

Alternatively, clone to local development and follow the steps below:

## 🚀Installation and Operation

### Clone Project

```bash
# clone the project
git clone https://github.com/zhpd/chatgpt-plus.git
```

> If you do not have a git environment, you can directly download the zip package, unzip it and enter the project directory

### Environment Configuration

#### Node v14+

> This project is developed based on Node.js, which requires Node.js 14.0+ environment. Make sure you're using `node >= 18` so `fetch` is available (or `node >= 14` if you install a [fetch polyfill](https://github.com/developit/unfetch#usage-as-a-polyfill)).

#### Api Key / AccessToken

The project uses the API officially provided by OpenAI and requires an Api Key and AccessToken.

> - OpenAI official registration application address: [https://platform.openai.com/](https://platform.openai.com/), which requires scientific Internet access
> - Obtain `ApiKey` or `AccessToken` through other methods [Click Here to View](#Additional-Information)

After successful application, fill in the APIKey and AccessToken in `chatgpt-plus/service/.env` file.

#### Optional: VSCode

> It is recommended to use the [VSCode](https://code.visualstudio.com/) editor for development, install the `ESLint` and` Prettier` plugins, and enable `Format On Save` in the settings.


### Front-end Page

#### Environmental Variables - Front-end

Configure the port and interface request address in the root directory .env file.
You can copy the `.env.example` file in the root directory and modify it directly (rename the file to `.env`)

| Environment Variable | Default Value           | Description           |
| -------------------- | ----------------------- | --------------------- |
| `PORT`               | `3000`                  | The port number       |
| `NEXT_PUBLIC_API_URL`| `http://localhost:3002` | The API endpoint URL  |

<details>
<summary> Configuration File</summary>

Modify the existing `.env.example` in the root directory directly and change the file name to `.env`.

```env
# port
PORT=3000

# api url
NEXT_PUBLIC_API_URL=http://localhost:3002

```
</details>

#### Run the Code
```bash
# enter the project directory
cd chatgpt-plus
# install dependency
npm install
# develop
npm run dev
```

> After running successfully, you can access it through `http://localhost:3000`.

### Backend Service

#### Environment Variables - Backend Service
Configure the port and API Key/AccessToken in `.env` under the `service` folder.

| Environment Variable | Default Value                                            | Description                              |
| -------------------- | ---------------------------------------------------------| -----------------------------------------|
| `PORT`               | `3002`                                                   | The port number                          |
| `OPENAI_API_KEY`     | -                                                        | [API_KEY](#get-api-key)                  |
| `OPENAI_ACCESS_TOKEN`| -                                                        | [ACCESS_TOKEN](#get-access-token)        |
| `API_REVERSE_PROXY`  | `https://api.pawan.krd/backend-api/conversation`          | [Proxy](#reverse-proxy)                  |
| `TIMEOUT_MS`         | 60000                                                    | Timeout in milliseconds                  |

<details>
<summary> Configuration File</summary>

Modify the existing `.env.example` in the `service` directory directly and change the file name to `.env`.

```env
# service/.env
# OpenAI API Key - https://platform.openai.com/overview
OPENAI_API_KEY=

# change this to an `accessToken` extracted from the ChatGPT site's `https://chat.openai.com/api/auth/session` response.
OPENAI_ACCESS_TOKEN=

# Reverse Proxy default 'https://bypass.churchless.tech/api/conversation'
API_REVERSE_PROXY=

# timeout
TIMEOUT_MS=100000

```

</details>

#### Run the Code
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

> After running successfully, the backend service can run normally.

## 📦Packaging and deploying

### Docker

Docker environment is required for deployment using Docker.

#### Docker Parameter Example

Use the configuration file in the `docker-compose` folder to pull and run.

### Vercel

Deploy with a single click with Vercel.

#### Vercel Environment Variables

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zhpd/chatgpt-plus)

### Manual Packaging

#### Front-end Web Packaging

- Code packaging
  - Enter the root folder of the project
  - Modify `API_URL` in `.env` file in the root directory to your actual backend interface public network address
  - run `npm install` to install the dependency
  - run `npm run build` to package the code.
- Running and deployment
  - Copy the files in the `dist` folder to the `Front-end Service` directory on your website
  - Enter the `dist` folder
  - run `npm run start` to start the service

#### Backend Service Packaging

- Code packaging
  - Enter the `service` folder
  - run `npm install` to install the dependency
  - run `npm run build` to package the code.
- Running and deployment
  - Copy the files in the `service/dist` folder to the `Backend Service` directory on your website
  - Enter the `service/dist` folder
  - run `npm run start` to start the service

> **Note**: If you do not want to package, you can directly copy the `service` folder to the server to run `npm install` and `npm run start` to start the service.

## ℹ️Additional Content

### Get API key

<details>
<summary>Configuration File</summary>

You can access it by setting the `OPENAI_API_KEY` key in env for backend service:

```env
# R OpenAI API Key
OPENAI_API_KEY =
```
</details>

This project uses the OpenAI API provided by the official website, so you first need to apply for an OpenAI account.

- OpenAI Official Account Registration Address: [https://platform.openai.com/](https://platform.openai.com/)
- After successful registration, obtain the API key through [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys).

### Get Access Token

<details>
<summary>Configuration File</summary>

You can access it by setting the `OPENAI_ACCESS_TOKEN` key in env for backend service:

```env
# change this to an `accessToken` extracted from the ChatGPT
OPENAI_ACCESS_TOKEN =
```

</details>

You need to get an OpenAI access token from the ChatGPT web application. You can use either of the following methods, which require an `email` and `password` and return an access token:

- Node.js Libraries
  - [ericlewis/openai-authenticator](https://github.com/ericlewis/openai-authenticator)
  - [michael-dm/openai-token](https://github.com/michael-dm/openai-token)
  - [allanoricil/chat-gpt-authenticator](https://github.com/AllanOricil/chat-gpt-authenticator)

- Python Libraries 
  - [acheong08/OpenAIAuth](https://github.com/acheong08/OpenAIAuth)

_Although these libraries work with accounts authenticated with an email and password (for example, they do not support accounts authenticated via Microsoft/Google)._

In addition, you can manually obtain an `accessToken` by logging in to the ChatGPT Web application and opening `https://chat.openai.com/api/auth/session`, which will return a JSON object containing your `accessToken` string.

_The access token has an expiration time of several days._

> Note: Using reverse proxies exposes your access token to a third party. This does not have any adverse effects, but consider the risks before using this method.

### Reverse Proxy
<details>
<summary> Configuration File</summary>

You can overwrite the reverse proxy by adding the `API_REVERSE_PROXY` key in env for the backend service:

```env
# Reverse Proxy
API_REVERSE_PROXY =
```
</details>

Known reverse proxies run by community members include:

| Reverse Proxy URL                                                       | Author                                                  | Throttle rate                | Last Checked |
| -----------------------------------------------------------------------| --------------------------------------------------------| ----------------------------| ------------ |
| `https://bypass.churchless.tech/api/conversation`                       | [@acheong08](https://github.com/acheong08)               | 5 req/10 seconds by IP       | 3/24/2023    |
| `https://api.pawan.krd/backend-api/conversation`                        | [@PawanOsman](https://github.com/PawanOsman)             | 50 req / 15 seconds (~3 r/s) | 3/23/2023    |


Note: Information on the reverse proxy working method is currently not disclosed to prevent OpenAI from disabling access.

## ❓FAQ

Q: If I only use the front-end page, where can I change the request interface?

A: In the `.env` file in the root directory, modify the `API_URL` field.

Q: Why is there no typewriter effect on the front-end?

A: One possible reason is that when using Nginx reverse proxy, if the buffer is enabled, Nginx will attempt to buffer a certain amount of data from the backend before sending it to the browser. Try adding `proxy_buffering off;` after the reverse proxy parameters, and then reload Nginx. Similar configuration for other web servers.

## 🤝Contributing

<!-- Please read the [Contribution Guidelines](./CONTRIBUTING.md) before contributing. -->

Thanks to all the contributors who have contributed to this project!

<a href="https://github.com/zhpd/chatgpt-plus/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=zhpd/chatgpt-plus" />
</a>

## 🙏Acknowledgments

- Many thanks to the supporters and all other contributors to the project! 💪
- Special thanks to the original reference projects created by [@transitive-bullshit](https://github.com/transitive-bullshit) [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api) and [@Chanzhaoyu](https://github.com/Chanzhaoyu) [chatgpt-web](https://github.com/Chanzhaoyu/chatgpt-web) for providing ideas.👍
- Many thanks to [OpenAI](https://openai.com) for creating [ChatGPT](https://openai.com/blog/chatgpt/) 🔥

## 💰Sponsorship

If you find this project helpful, please give it a Star ⭐️ or share it with your friends. Your support is my greatest motivation!

## 📜License

MIT © [zhpd](./license)


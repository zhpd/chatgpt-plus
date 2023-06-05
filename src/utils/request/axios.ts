import axios, { type AxiosResponse } from 'axios'
import storage from '../storage'

const service = axios.create({
  baseURL: '/',
  timeout: 60000,
})

service.interceptors.request.use(
  async (config) => {
    const token: string | '' = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : ''
    if (token) config.headers.Authorization = `Bearer ${token}`
    // 如果设置里baseURL, 则需要设置变量
    const backend_base_url = await storage.get('backend_base_url')
    if (backend_base_url) {
      config.baseURL = backend_base_url
    }
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200) return response

    throw new Error(response.status.toString())
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service

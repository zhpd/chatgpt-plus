import axios, { type AxiosResponse } from 'axios'

const service = axios.create({
  baseURL: '/',
  timeout: 60000,
})

service.interceptors.request.use(
  (config) => {
    const token: string | '' = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : ''
    if (token) config.headers.Authorization = `Bearer ${token}`
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

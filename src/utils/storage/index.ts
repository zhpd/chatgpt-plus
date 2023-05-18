// data storage
let storage = {
  // get
  get: async (key: string): Promise<any> => {
    if (!key) {
      return
    }
    let val = null
    if (typeof window !== 'undefined') {
      // 获取数据类型
      let type = window.localStorage.getItem(key + '_typeof')
      switch (type) {
        case 'boolean':
          val = window.localStorage.getItem(key)
          val = val === 'true'
          break
        case 'number':
          val = window.localStorage.getItem(key)
          val = Number(val)
          break
        case 'string':
          val = window.localStorage.getItem(key)
          val = String(val)
          break
        case 'object':
          val = window.localStorage.getItem(key)
          if (val) {
            val = JSON.parse(val)
          }
          break
        default:
          val = window.localStorage.getItem(key)
          break
      }
    }
    console.log('data get ', typeof val, key, val)
    return val
  },
  // set
  set: async (key: string, value: any): Promise<boolean> => {
    if (!key) {
      return false
    }
    console.log('data set ', typeof value, key, value)
    if (typeof window !== 'undefined') {
      switch (typeof value) {
        case 'boolean':
          window.localStorage.setItem(key, value ? 'true' : 'false')
          break
        case 'number':
          window.localStorage.setItem(key, String(value))
          break
        case 'string':
          window.localStorage.setItem(key, value)
          break
        case 'object':
          window.localStorage.setItem(key, JSON.stringify(value))
          break
        default:
          window.localStorage.setItem(key, String(value))
          break
      }
      // 记录数据类型
      window.localStorage.setItem(key + '_typeof', typeof value)
    }
    return true
  },
  // delete
  delete: async (key: string): Promise<boolean> => {
    if (!key) {
      return false
    }
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key)
      return true
    }
    return false
  },
  // has
  has: async (key: string): Promise<boolean> => {
    if (!key) {
      return false
    }
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key) !== null
    }
    return false
  },
  // clear
  clear: async (): Promise<boolean> => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear()
      return true
    }
    return false
  },
}
export default storage

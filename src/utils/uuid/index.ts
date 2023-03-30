// javascript
import { nanoid } from 'nanoid'

// 将nanoid转换为uuidv4格式
const uuidv4 = () => {
  // 生成21个字符的 nanoid
  const randomId = nanoid(32).replace(/[-_]/g, '')
  return randomId.substring(0, 8) + '-' + randomId.substring(8, 12) + '-' + '4' + randomId.substring(13, 16) + '-' + 'a' + randomId.substring(16, 20) + '-' + randomId.substring(20)
}

export { uuidv4, nanoid }

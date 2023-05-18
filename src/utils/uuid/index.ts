// javascript
import { nanoid } from 'nanoid'

// 将nanoid转换为uuidv4格式
const uuidv4 = () => {
  // 生成长度为 32 的随机字符串
  const randomString = nanoid();
  // 将随机字符串转换为 UUID 格式
  const uuid = `${randomString.slice(0, 8)}-${randomString.slice(8, 12)}-${randomString.slice(12, 16)}-${randomString.slice(16, 20)}-${randomString.slice(20)}`;
  return uuid
}

export { uuidv4, nanoid }

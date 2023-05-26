import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
// import path from 'path'
// 导入语言枚举
// const LanguageList = ['zh_CN', 'zh_TW', 'en_US']
import { LanguageList } from '@/config/constant'

const resources = () => {
  const _resources: any = {}
  for (const lang of LanguageList) {
    // 只加载简体中文，繁体中文，英文
    if (lang?.value !== 'zh_CN' && lang?.value !== 'zh_TW' && lang?.value !== 'en_US') continue
    _resources[lang?.value] = {
      translation: require(`./${lang?.value}.json`),
    }
  }
  return _resources
}

// init i18next
i18next.use(initReactI18next)
i18next.init(
  {
    resources: resources(),
    fallbackLng: {
      default: [LanguageList?.[0]?.value],
    },
    defaultNS: 'translation',
    ns: [],
    detection: {
      caches: ['localStorage', 'sessionStorage', 'cookie'],
    },
    debug: false,
  },
  () => {
    console.log('i18next init', i18next.t('title'))
  }
)
export default i18next

export const changeLanguage = (val: string | undefined) => {
  i18next.changeLanguage(val)
}

export function useTranslation(ns = [], options = {}) {
  return {
    t: i18next.t,
    i18n: i18next,
  }
}

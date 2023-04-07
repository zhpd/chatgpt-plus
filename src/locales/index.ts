import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
// import path from 'path'

const locales = ['zh-CN', 'en-US']

const resources = () => {
  const _resources: any = {}
  for (const lang of locales) {
    _resources[lang] = {
      translation: require(`./${lang}.json`),
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
      default: [locales?.[0]],
    },
    defaultNS: 'translation',
    ns: [],
    detection: {
      caches: ['localStorage', 'sessionStorage', 'cookie'],
    },
  },
  () => {
    console.log('i18next init')
    console.log('i18next title', i18next.t('title'))
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

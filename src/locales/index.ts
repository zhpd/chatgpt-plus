import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import nextI18NextConfig from '@/../next-i18next.config'
import path from 'path'
import { UserConfig } from 'next-i18next'

const resources = () => {
  const _resources: any = {}
  for (const lang of nextI18NextConfig.i18n.locales) {
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
      default: [nextI18NextConfig.i18n.defaultLocale],
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

export const i18NextConfig: UserConfig = {
  // defaultNS: '',
  // localePath: (locale: string, namespace: string, missing: boolean): string => {
  //   return path.resolve(`./src/locales/${locale}.json`)
  // },
  // localeStructure: '{{lng}}',
  // ns: [],
  ...nextI18NextConfig,
}

export function useTranslation(ns = [], options = {}) {
  return {
    t: i18next.t,
    i18n: i18next,
  }
}

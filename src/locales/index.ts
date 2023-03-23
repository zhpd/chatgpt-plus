import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import nextConfig from '@/../next.config'

const resources = () => {
  const _resources: any = {}
  for (const lang of nextConfig.i18n.locales) {
    _resources[lang] = {
      translation: require(`./${lang}.json`),
    }
  }
  return _resources
}

const i18n = i18next
i18n.use(initReactI18next)
i18n.init({
  resources: resources(),
  fallbackLng: {
    default: [nextConfig.i18n.defaultLocale],
  },
  detection: {
    caches: ['localStorage', 'sessionStorage', 'cookie'],
  },
})
export default i18n

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
// JSON 리소스를 직접 임포트하여 SSR 및 초기 로딩 시 누락 방지
import koTranslation from '../../public/locales/ko/translation.json'
import enTranslation from '../../public/locales/en/translation.json'

// 초기 언어 설정 (클라이언트에서만 접근 가능)
function getInitialLanguage(): string {
  if (typeof window === 'undefined') {
    return 'ko' // 서버 사이드에서는 기본값 사용
  }
  
  try {
    const savedLang = window.localStorage.getItem('lang')
    if (savedLang === 'ko' || savedLang === 'en') {
      return savedLang
    }
    // 브라우저 언어 감지
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('en')) {
      return 'en'
    }
  } catch {
    // localStorage 접근 실패 시 기본값 사용
  }
  
  return 'ko'
}

i18n
  // 언어 감지 플러그인
  .use(LanguageDetector)
  // react-i18next 플러그인
  .use(initReactI18next)
  // i18next 초기화
  .init({
    // 리소스를 직접 주입하여 백엔드 로딩 문제 해결
    resources: {
      ko: { translation: koTranslation },
      en: { translation: enTranslation },
    },
    // 지원 언어
    supportedLngs: ['ko', 'en'],
    // 기본 언어 (fallback)
    fallbackLng: 'ko',
    // 초기 언어 설정
    lng: getInitialLanguage(),
    // 디버그 모드 (개발 환경에서만 활성화)
    debug: process.env.NODE_ENV === 'development',
    
    // React 설정
    react: {
      useSuspense: false, // Next.js App Router와 호환성을 위해 false로 설정
    },

    // 언어 감지 옵션 (LangProvider에서 직접 관리하므로 비활성화)
    detection: {
      // LangProvider에서 언어를 직접 관리하므로 감지 비활성화
      order: [],
      caches: [],
    },



    // 기본 네임스페이스
    defaultNS: 'translation',
    ns: ['translation'],

    // 보간 옵션
    interpolation: {
      escapeValue: false, // React는 이미 XSS 방지 기능이 있음
    },
  })

export default i18n


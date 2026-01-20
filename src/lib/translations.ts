// 서버 사이드에서 사용할 번역 데이터
// 검색엔진이 크롤링할 때 실제 텍스트를 볼 수 있도록 서버에서 직접 로드
import fs from 'fs'
import path from 'path'
import { cookies } from 'next/headers'

// 번역 파일을 서버에서 직접 읽기
function loadTranslation(locale: 'ko' | 'en' = 'ko') {
  try {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'translation.json')
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error(`Failed to load translation file for locale: ${locale}`, error)
    return {}
  }
}

// 캐시된 번역 데이터 (로케일별로 캐시)
const cachedTranslations: Record<string, Record<string, any>> = {}

export function getTranslation(locale: 'ko' | 'en' = 'ko') {
  if (!cachedTranslations[locale]) {
    cachedTranslations[locale] = loadTranslation(locale)
  }
  return cachedTranslations[locale]
}

// 서버 컴포넌트에서 사용할 수 있는 언어 감지 함수
export async function getServerLocale(): Promise<'ko' | 'en'> {
  try {
    const cookieStore = await cookies()
    const langCookie = cookieStore.get('lang')
    if (langCookie && (langCookie.value === 'ko' || langCookie.value === 'en')) {
      return langCookie.value as 'ko' | 'en'
    }
  } catch {
    // 쿠키 접근 실패 시 기본값 사용
  }
  return 'ko'
}

export function t(key: string, locale?: 'ko' | 'en'): string | string[] | any {
  // locale이 제공되지 않으면 기본값 사용 (서버 컴포넌트에서는 getServerLocale 사용 권장)
  const finalLocale = locale || 'ko'
  const translations = getTranslation(finalLocale)
  const keys = key.split('.')
  let value: any = translations
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k as keyof typeof value]
    } else {
      return key // 키를 찾을 수 없으면 키 자체를 반환
    }
  }
  
  // string, array, 또는 다른 타입 모두 반환 가능
  return value !== undefined ? value : key
}


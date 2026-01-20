"use client"

import { useEffect, useState } from "react"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"
import { useLang } from "@/components/i18n/lang-provider"

export function useT() {
  const { lang, setLang } = useLang()
  const { t, i18n, ready } = useTranslation()
  const [isLanguageChanging, setIsLanguageChanging] = useState(false)

  // LangProvider의 언어 상태와 i18next 언어를 동기화
  useEffect(() => {
    // i18n이 초기화되지 않았으면 대기
    if (!i18n.isInitialized) {
      return
    }

    // 현재 언어와 LangProvider의 언어가 다르면 변경
    if (i18n.language !== lang) {
      setIsLanguageChanging(true)
      i18n
        .changeLanguage(lang)
        .then(() => {
          // 언어 변경 완료 확인
          if (process.env.NODE_ENV === 'development') {
            console.log(`Language changed to: ${lang}`, i18n.getResourceBundle(lang, 'translation'))
          }
          // 언어 변경 완료 후 약간의 지연을 두어 리소스가 완전히 로드되도록 함
          setTimeout(() => {
            setIsLanguageChanging(false)
          }, 100)
        })
        .catch((err) => {
          console.error('Failed to change language:', err)
          setIsLanguageChanging(false)
        })
    } else {
      // 언어가 이미 일치하면 변경 중 상태 해제
      if (isLanguageChanging) {
        setIsLanguageChanging(false)
      }
    }
  }, [lang, i18n, isLanguageChanging])

  return {
    lang,
    setLang,
    t,
    ready: ready && i18n.isInitialized,
  }
}


"use client"

import { useEffect, useState } from "react"
import { LangProvider, type Lang } from "./lang-provider"

export function LangProviderWrapper({ children }: { children: React.ReactNode }) {
  // 서버 사이드 렌더링을 위해 기본값을 "ko"로 설정
  // 클라이언트에서 하이드레이션될 때 실제 언어로 업데이트됨
  const [initialLang, setInitialLang] = useState<Lang>("ko")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    setIsClient(true)
    let detectedLang: Lang = "ko"
    
    try {
      const savedLang = window.localStorage.getItem("lang")
      if (savedLang === "ko" || savedLang === "en") {
        detectedLang = savedLang
      } else {
        // localStorage에 저장된 언어가 없으면 브라우저 언어 감지
        const browserLang = navigator.language.toLowerCase()
        if (browserLang.startsWith("en")) {
          detectedLang = "en"
        }
      }
    } catch {
      // localStorage 접근 실패 시 기본값 사용
    }

    setInitialLang(detectedLang)
  }, [])

  // 서버 사이드 렌더링 시에도 LangProvider를 제공하여 오류 방지
  // 클라이언트에서 하이드레이션될 때 실제 언어로 업데이트됨
  return <LangProvider lang={initialLang}>{children}</LangProvider>
}


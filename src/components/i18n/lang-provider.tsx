"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export type Lang = "ko" | "en"

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({
  lang: initialLang,
  children,
}: {
  lang: Lang
  children: React.ReactNode
}) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    setLangState(initialLang)
  }, [initialLang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem("lang", next)
      // 쿠키에도 저장하여 서버 컴포넌트에서 접근 가능하도록 함
      document.cookie = `lang=${next}; path=/; max-age=31536000; SameSite=Lax`
    } catch {
      // ignore
    }
  }, [])

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) {
    throw new Error("useLang must be used within LangProvider")
  }
  return ctx
}



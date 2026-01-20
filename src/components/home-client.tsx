"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState, useTransition, useRef } from "react"

import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { HistorySection } from "@/components/history-section"
import { MissionSection } from "@/components/mission-section"
import { VisionSection } from "@/components/vision-section"
import { ValuesSection } from "@/components/values-section"
import { CISection } from "@/components/ci-section"
import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import { useT } from "@/components/i18n/use-t"

interface HomeClientProps {
  initialLang?: string
}

export default function HomeClient({ initialLang }: HomeClientProps) {
  const { lang, setLang } = useT()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [showSplash, setShowSplash] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // [수정] 마운트 시점에 단 한 번만 initialLang과 현재 상태 동기화
  // 이후 스플래시에서 사용자가 수동으로 언어를 바꾸면 이 로직이 다시 실행되지 않음
  const hasInitializedLang = useRef(false)
  useEffect(() => {
    if (!hasInitializedLang.current && initialLang && lang !== initialLang) {
      setLang(initialLang as any)
      hasInitializedLang.current = true
    }
  }, [initialLang, lang, setLang])

  const handleDismissSplash = () => {
    setShowSplash(false)

    // 스플래시가 닫힐 때 현재 선택된 언어에 맞는 URL로 이동
    if (lang === "en") {
      const newPath = pathname?.startsWith("/en") ? pathname : `/en${pathname === "/" ? "" : pathname}`
      startTransition(() => {
        router.push(newPath)
      })
    } else {
      const newPath = pathname?.startsWith("/en")
        ? pathname.replace(/^\/en/, "") || "/"
        : pathname
      startTransition(() => {
        router.push(newPath)
      })
    }
  }

  useEffect(() => {
    const hash = window.location.hash
    const scrollTarget = sessionStorage.getItem("scrollToSection")
    const forceSplash = sessionStorage.getItem("forceSplash")
    const hasVisited = sessionStorage.getItem("hasVisited")

    setIsInitialized(true)

    if (scrollTarget || hash) {
      sessionStorage.removeItem("forceSplash")
      setShowSplash(false)

      const target = scrollTarget || hash.substring(1)
      setTimeout(() => {
        const element = document.getElementById(target)
        if (element) {
          const headerOffset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
          window.scrollTo({ top: offsetPosition, behavior: "auto" })
        }
      }, 10)

      if (scrollTarget) sessionStorage.removeItem("scrollToSection")
      return
    }

    if (forceSplash === "true") {
      sessionStorage.removeItem("forceSplash")
      setShowSplash(true)
      return
    }

    if (!hasVisited) {
      sessionStorage.setItem("hasVisited", "true")
      setShowSplash(true)
      return
    }

    setShowSplash(false)
  }, [])

  useEffect(() => {
    const handleShowSplash = () => {
      setShowSplash(true)
    }

    window.addEventListener("show-splash", handleShowSplash)
    return () => window.removeEventListener("show-splash", handleShowSplash)
  }, [])

  if (!isInitialized) return null

  return (
    <div className="min-h-screen">
      <main>
        {showSplash && (
          <div className="fixed inset-0 z-[9999]">
            {/* key={lang}을 제거하여 언어 변경 시에도 애니메이션이 끊기지 않도록 함 */}
            <HeroSection onClick={handleDismissSplash} />
          </div>
        )}

        <AboutSection />
        <HistorySection />
        <MissionSection />
        <VisionSection />
        <ValuesSection />
        <CISection />
      </main>

      <Footer />
      <TopButton />
    </div>
  )
}
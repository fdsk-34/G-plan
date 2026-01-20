"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useT } from "@/components/i18n/use-t"

export function TopButton() {
  const { t } = useT()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // 스크롤 위치가 300px 이상일 때 버튼 표시
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", toggleVisibility)

    // 초기 상태 확인
    toggleVisibility()

    // 클린업 함수
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 md:bottom-12 md:right-12 z-40 rounded-full shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 bg-[#FF7A00] hover:bg-[#E66E00] text-white size-12 sm:size-14 p-0 group overflow-hidden border-2 border-white/20"
          aria-label={t("topButton.scrollToTop")}
        >
          <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-y-1 transition-transform duration-300" />
        </Button>
      )}
    </>
  )
}


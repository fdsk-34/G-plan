"use client"

import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import { MapPin, Train } from "lucide-react"
import { useT } from "@/components/i18n/use-t"
import { useEffect } from "react"

interface ContactPageClientProps {
  lang?: "ko" | "en"
}

export default function ContactPageClient({ lang = "ko" }: ContactPageClientProps) {
  const { t, setLang } = useT()
  
  useEffect(() => {
    if (lang) {
      setLang(lang)
    }
  }, [lang, setLang])
  
   // 핵심: 구글 지도 언어 파라미터 (hl=ko 또는 hl=en)/
    const mapLang = lang === "en" ? "en" : "ko"
    const officeAddress = t("pages.contact.address")
    const encodedAddress = encodeURIComponent(officeAddress)
    

    return (
      <div className="min-h-screen bg-white">
        <main>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-b from-gray-50 to-white pb-16 sm:pb-20 pt-24 sm:pt-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-5xl text-center">
                <div className="mb-6 sm:mb-8 inline-flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl sm:rounded-3xl bg-gray-900 shadow-lg">
                  <MapPin className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" />
                </div>
                <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 px-4">{t("pages.contact.title")}</h1>
                <div className="mx-auto mb-6 sm:mb-8 h-1 w-16 sm:w-24 bg-gray-900"></div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-gray-600 px-4">
                  {t("pages.contact.subtitle")}
                </p>
              </div>
            </div>
          </section>
  
          {/* Map Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-6 flex items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t("pages.contact.mapTitle")}</h2>
            <div className="ml-2 sm:ml-4 h-px flex-1 bg-gradient-to-r from-orange-400 to-transparent"></div>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            {/* API 키가 필요 없는 표준 구글 맵 임베드 방식 */}
            <iframe
              src={`https://www.google.com/maps?q=${encodedAddress}&output=embed&hl=${mapLang}`}
              width="100%"
              height="300"
              className="sm:h-[400px] md:h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={lang === "en" ? "GPLAN Location Map" : "GPLAN 위치 지도"}
            />
          </div>
        </div>
      </section>

        {/* Address Section */}
        <section className="bg-white py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 sm:mb-6 flex items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t("pages.contact.addressTitle")}</h2>
              <div className="ml-2 sm:ml-4 h-px flex-1 bg-gradient-to-r from-orange-400 to-transparent"></div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6 md:p-8">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
                </div>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-900 leading-relaxed break-words">
                  {t("pages.contact.address")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Public Transportation Section */}
        <section className="bg-white py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 sm:mb-6 flex items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t("pages.contact.transportationTitle")}</h2>
              <div className="ml-2 sm:ml-4 h-px flex-1 bg-gradient-to-r from-orange-400 to-transparent"></div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6 md:p-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Train className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-base sm:text-lg font-semibold text-gray-900">{t("pages.contact.subway")}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">{t("pages.contact.subwayDescription")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <TopButton />
    </div>
  )
}

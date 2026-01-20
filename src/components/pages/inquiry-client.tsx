"use client"

import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import { Phone, Mail, MessageSquare } from "lucide-react"
import { useT } from "@/components/i18n/use-t"
import { useEffect } from "react"

interface InquiryPageClientProps {
  lang?: "ko" | "en"
}

export default function InquiryPageClient({ lang = "ko" }: InquiryPageClientProps) {
  const { t, setLang } = useT()
  
  useEffect(() => {
    if (lang) {
      setLang(lang)
    }
  }, [lang, setLang])
  
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl bg-gray-900 mb-6 sm:mb-8 shadow-lg">
                <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight px-4">{t("pages.inquiry.title")}</h1>
              <div className="w-16 sm:w-24 h-1 bg-gray-900 mx-auto mb-6 sm:mb-8"></div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed font-light px-4">
                {String(t("pages.inquiry.subtitle")).split('\n').map((line: string, i: number) => (
                  <span key={i}>
                    {line}
                    {i < t("pages.inquiry.subtitle").split('\n').length - 1 && <br className="hidden sm:block" />}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t("pages.inquiry.methodsTitle")}</h2>
                <div className="w-12 sm:w-16 h-1 bg-gray-900 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Phone Contact */}
                <div className="group relative p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:shadow-xl">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gray-900 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{t("pages.inquiry.phone")}</h3>
                    <a
                      href="tel:0507-1346-6756"
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 hover:text-gray-600 transition-colors inline-block min-h-[44px] flex items-center justify-center px-2"
                    >
                      0507-1346-6756
                    </a>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 sm:mt-3 md:mt-4">{t("pages.inquiry.phoneHours")}</p>
                  </div>
                </div>

                {/* Email Contact */}
                <div className="group relative p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:shadow-xl">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gray-900 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{t("pages.inquiry.email")}</h3>
                    <a
                      href="mailto:sypark@gplanworld.com"
                      className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors inline-block break-all min-h-[44px] flex items-center justify-center px-2"
                    >
                      sypark@gplanworld.com
                    </a>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 sm:mt-3 md:mt-4">{t("pages.inquiry.emailHours")}</p>
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

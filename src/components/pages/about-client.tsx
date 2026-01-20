"use client"

import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import { Card, CardContent } from "@/components/ui/card"
import { useT } from "@/components/i18n/use-t"
import { useEffect } from "react"

interface AboutPageClientProps {
  lang?: "ko" | "en"
}

export default function AboutPageClient({ lang = "ko" }: AboutPageClientProps) {
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
        <section className="relative bg-gradient-to-b from-gray-50 to-white pb-16 sm:pb-20 pt-24 sm:pt-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                {t("about.title")}
              </h1>
              <div className="mx-auto mb-6 sm:mb-8 h-1 w-16 sm:w-24 bg-gray-900"></div>
            </div>
          </div>
        </section>

        {/* About Content Section */}
        <section className="py-12 sm:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <Card className="shadow-sm before:hidden border-0 border-l-4 border-orange-500 pl-3 sm:pl-4">
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4 leading-relaxed text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                    <p>{t("about.description1")}</p>
                    <p>
                      {t("about.description2")}
                    </p>
                    <p>
                      {t("about.description3")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <TopButton />
    </div>
  )
}

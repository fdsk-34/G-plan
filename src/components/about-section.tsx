"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useT } from "@/components/i18n/use-t"

export function AboutSection() {
  const { t } = useT()
  return (
    <section id="about" className="py-20 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 sm:mb-8">
            {/* SEO 최적화: 회사 소개 섹션의 메인 제목 (h2 사용) */}
            <h2 className="font-bold tracking-tight text-gray-900 mb-4 text-3xl sm:text-4xl md:text-5xl">{t("about.title")}</h2>
            
          </div>
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
  )
}

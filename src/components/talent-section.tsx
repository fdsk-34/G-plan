"use client"

import { useT } from "@/components/i18n/use-t"

export function TalentSection() {
  const { t } = useT()
  const talents = [
    {
      title: t("talent.gather.title"),
      subtitle: t("talent.gather.subtitle"),
      description: t("talent.gather.description"),
    },
    {
      title: t("talent.growth.title"),
      subtitle: t("talent.growth.subtitle"),
      description: t("talent.growth.description"),
    },
    {
      title: t("talent.give.title"),
      subtitle: t("talent.give.subtitle"),
      description: t("talent.give.description"),
    },
    {
      title: t("talent.grace.title"),
      subtitle: t("talent.grace.subtitle"),
      description: t("talent.grace.description"),
    },
  ]

  return (
    <section id="talent" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t("talent.title")}</h2>
            
          </div>

          <div className="mb-10 sm:mb-16 p-6 sm:p-10 md:p-12 bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight px-2">
                {String(t("talent.mainTitle"))
                  .split('\n')
                  .map((line: string, i: number, arr: string[]) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br className="hidden sm:block" />}
                  </span>
                ))}
              </h3>
              <div className="space-y-3 sm:space-y-4 text-gray-600">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  {t("talent.description1")}
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  {t("talent.description2")}
                </p>
              </div>
              <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 pt-4 border-t border-gray-200">
                {t("talent.footer")}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
            {talents.map((talent, index) => (
              <div
                key={index}
                className="group p-6 sm:p-8 bg-white border border-gray-200 rounded-xl sm:rounded-2xl hover:border-gray-900 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg sm:rounded-xl bg-gray-900 text-white font-bold text-xl sm:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {talent.title[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{talent.title}</h3>
                      <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">{talent.subtitle}</p>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-600">{talent.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

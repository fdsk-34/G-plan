"use client"

import { Users, TrendingUp, Heart, Sparkles, type LucideIcon } from "lucide-react"
import { useT } from "@/components/i18n/use-t"

type ValueItem = {
  title: string
  subtitle: string
  description: string
  accent: string
  icon: LucideIcon
}

export function ValuesSection() {
  const { t } = useT()
  const values: ValueItem[] = [
    {
      title: t("values.gather.title"),
      subtitle: t("values.gather.subtitle"),
      description: t("values.gather.description"),
      accent: "bg-slate-900",
      icon: Users,
    },
    {
      title: t("values.growth.title"),
      subtitle: t("values.growth.subtitle"),
      description: t("values.growth.description"),
      accent: "bg-slate-700",
      icon: TrendingUp,
    },
    {
      title: t("values.give.title"),
      subtitle: t("values.give.subtitle"),
      description: t("values.give.description"),
      accent: "bg-slate-600",
      icon: Heart,
    },
    {
      title: t("values.grace.title"),
      subtitle: t("values.grace.subtitle"),
      description: t("values.grace.description"),
      accent: "bg-slate-500",
      icon: Sparkles,
    },
  ]

  return (
    <section id="core-values" className="py-20 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10 sm:mb-16">
            <h3 className="font-bold tracking-tight text-gray-900 mb-4 text-3xl sm:text-4xl md:text-5xl">{t("values.title")}</h3>
            
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-bold px-4">{t("values.subtitle")}</p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4 mb-10 sm:mb-16">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-400"
                >
                  <div className={`h-0.5 ${value.accent}`}></div>

                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="mb-4 sm:mb-6 inline-flex p-2 sm:p-3 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-7 md:w-7 text-gray-700" />
                    </div>

                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{value.title}</h3>
                      <div className="inline-block px-2 sm:px-3 py-1 rounded-md bg-gray-900 text-white text-xs font-semibold tracking-wide">
                        {value.subtitle}
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm font-bold">{value.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="relative rounded-xl p-3 sm:p-4 md:p-6 overflow-hidden bg-white border border-gray-200">
            <div className="relative flex flex-wrap items-center justify-center gap-0.5 sm:gap-1 md:gap-2 text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold px-2 sm:px-4">
              <span className="whitespace-nowrap text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold">
                <span className="text-[#FF7A00]">G</span>
                <span className="text-[#004457]">PLAN</span>
              </span>
              <span className="text-gray-400 mx-0.5 sm:mx-1 text-xs sm:text-sm md:text-base lg:text-lg">=</span>
              <span className="text-gray-900 whitespace-nowrap break-words">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-extrabold text-[#FF7A00]">G</span>ather
              </span>
              <span className="bg-background text-card-foreground text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-extrabold">&</span>
              <span className="text-gray-900 whitespace-nowrap break-words">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-extrabold text-[#FF7A00]">G</span>rowth
              </span>
              <span className="bg-background text-card-foreground text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-extrabold">&</span>
              <span className="text-gray-900 whitespace-nowrap break-words">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-extrabold text-[#FF7A00]">G</span>ive
              </span>
              <span className="bg-background text-card-foreground text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-extrabold">&</span>
              <span className="text-gray-900 whitespace-nowrap break-words">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-extrabold text-[#FF7A00]">G</span>race
              </span>
              <span className="whitespace-nowrap ml-0.5 sm:ml-1 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-extrabold text-[#004457]">
                PLAN
              </span>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 md:mt-16 text-center px-4">
            <div className="inline-block border-2 border-gray-900 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 md:px-10 md:py-6 lg:px-12 lg:py-8 shadow-sm bg-background">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 leading-relaxed">
                {t("values.footer")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { imagePaths } from "@/lib/image-paths"
import { useT } from "@/components/i18n/use-t"

export function CISection() {
  const { t } = useT()
  return (
    <section id="ci" className="py-20 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-4">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 inline-block">
              {t("ci.title")}
            </h3>
          </div>

          <div className="mb-12 sm:mb-20 pt-8 sm:pt-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">{t("ci.brandMessage")}</h3>

            <div className="max-w-5xl mx-auto px-4">
              <div className="relative">
                <div className="absolute -left-2 sm:-left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-[#004457] to-[#FF7A00] rounded-full"></div>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed text-gray-700 pl-4 sm:pl-6 md:pl-8">
                  {t("ci.brandMessageText")}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12 sm:mb-16 pt-8 sm:pt-12 border-t border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-start lg:items-center">
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <Image
                  src={imagePaths.brand.ciVariations}
                  alt="GPLAN Logo Variations"
                  width={320}
                  height={430}
                  className="h-auto w-auto max-w-[200px] sm:max-w-[280px] md:max-w-[320px] rounded-lg"
                />
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-6 text-gray-600 leading-relaxed px-4 lg:px-0">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold">
                  {t("ci.ciDescription")}
                </p>
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="border-l-4 border-gray-900 pl-2 sm:pl-3 md:pl-4">
                    <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">{t("ci.gPlanStructure.title")}</h4>
                    <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed">
                      {t("ci.gPlanStructure.description")}
                    </p>
                  </div>
                  <div className="border-l-4 border-gray-900 pl-2 sm:pl-3 md:pl-4">
                    <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">{t("ci.plusSymbol.title")}</h4>
                    <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed">
                      {t("ci.plusSymbol.description")}
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-900 pt-1 sm:pt-2">
                  {t("ci.visionStatement")}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12 sm:mb-20 pt-10 sm:pt-16 border-t border-gray-100">
            <div className="text-center mb-10 sm:mb-16 px-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{t("ci.colorIdentity.title")}</h3>
              <p className="text-sm sm:text-base text-gray-600">{t("ci.colorIdentity.subtitle")}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-12 max-w-4xl mx-auto px-4">
              {/* Main Color Card */}
              <div className="group">
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-full h-40 sm:h-56 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#004457] via-[#00566D] to-[#6B8C93] shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500"></div>
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/0 to-white/10"></div>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{t("ci.colorIdentity.primary.title")}</h4>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">{t("ci.colorIdentity.primary.name")}</p>
                  </div>

                  <div className="space-y-2 sm:space-y-3 py-4 sm:py-5 border-y border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hex</span>
                      <span className="font-mono text-xs sm:text-sm text-gray-900">#004457</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">RGB</span>
                      <span className="font-mono text-xs sm:text-sm text-gray-900">0, 68, 87</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">CMYK</span>
                      <span className="font-mono text-xs sm:text-sm text-gray-900">100, 22, 0, 66</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">Brand Values</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#004457]/5 border border-[#004457]/20 text-[#004457] rounded-lg text-xs sm:text-sm font-medium">
                        {t("ci.colorIdentity.primary.values.trust")}
                      </span>
                      <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#004457]/5 border border-[#004457]/20 text-[#004457] rounded-lg text-xs sm:text-sm font-medium">
                        {t("ci.colorIdentity.primary.values.expertise")}
                      </span>
                      <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#004457]/5 border border-[#004457]/20 text-[#004457] rounded-lg text-xs sm:text-sm font-medium">
                        {t("ci.colorIdentity.primary.values.stability")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent Color Card */}
              <div className="group">
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-full h-40 sm:h-56 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF9D3D] shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500"></div>
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/0 to-white/10"></div>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{t("ci.colorIdentity.accent.title")}</h4>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">{t("ci.colorIdentity.accent.name")}</p>
                  </div>

                  <div className="space-y-2 sm:space-y-3 py-4 sm:py-5 border-y border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hex</span>
                      <span className="font-mono text-xs sm:text-sm text-gray-900">#FF7A00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">RGB</span>
                      <span className="font-mono text-xs sm:text-sm text-gray-900">255, 122, 0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">CMYK</span>
                      <span className="font-mono text-xs sm:text-sm text-gray-900">0, 52, 100, 0</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">Brand Values</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FF7A00]/5 border border-[#FF7A00]/20 text-[#FF7A00] rounded-lg text-xs sm:text-sm font-medium">
                        {t("ci.colorIdentity.accent.values.energy")}
                      </span>
                      <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FF7A00]/5 border border-[#FF7A00]/20 text-[#FF7A00] rounded-lg text-xs sm:text-sm font-medium">
                        {t("ci.colorIdentity.accent.values.positivity")}
                      </span>
                      <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FF7A00]/5 border border-[#FF7A00]/20 text-[#FF7A00] rounded-lg text-xs sm:text-sm font-medium">
                        {t("ci.colorIdentity.accent.values.creativity")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

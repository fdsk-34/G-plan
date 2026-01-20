"use client"

import Image from "next/image"
import { getImagePaths } from "@/lib/image-paths"
import { useT } from "@/components/i18n/use-t"

export function MissionSection() {
  const { t, lang } = useT()
  const imagePaths = getImagePaths(lang)
  
  return (
    <section id="mission" className="py-20 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Section title */}
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-3">{t("mission.title")}</h3>
            
          </div>

          {/* Mission image */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg aspect-square">
              <Image
                src={imagePaths.sections.mission}
                alt={t("mission.alt")}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Mission description */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6 text-center max-w-3xl mx-auto font-bold">
            <p className="leading-relaxed text-gray-900 text-sm sm:text-base md:text-lg lg:text-xl">
              {t("mission.description1")}
            </p>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
              {t("mission.description2")}
            </p>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
              {t("mission.description3")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

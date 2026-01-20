"use client"

import Image from "next/image"
import { imagePaths } from "@/lib/image-paths"
import { useT } from "@/components/i18n/use-t"

export function VisionSection() {
  const { t } = useT()
  return (
    <section id="vision" className="py-20 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 sm:mb-12 text-center">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">{t("vision.title")}</h3>
            
          </div>

          <div className="space-y-8 sm:space-y-12">
            {/* Main vision statement */}
            <div className="text-center space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight px-4">
                {t("vision.mainStatement")}
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto px-4 whitespace-pre-line">
                {t("vision.description")}
              </p>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* We Make Bliss image and description */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-center px-4">
                <Image
                  src={imagePaths.sections.vision}
                  alt="We Make Bliss"
                  width={700}
                  height={140}
                  className="h-auto w-auto max-w-[280px] sm:max-w-[450px] md:max-w-[600px]"
                />
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed text-gray-500 text-center max-w-3xl mx-auto px-4">
                {t("vision.blissDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useT } from "@/components/i18n/use-t"

type CTASectionProps = {
  title: string
  description: string
  buttonText?: string
  buttonHref?: string
  className?: string
}

export function CTASection({ 
  title, 
  description, 
  buttonText, 
  buttonHref = "/inquiry",
  className = "" 
}: CTASectionProps) {
  const { t } = useT()
  const defaultButtonText = buttonText || t("cta.defaultButton")
  return (
    <section className={`py-12 sm:py-24 bg-white ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl bg-gray-900 p-8 sm:p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-4">
                {title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed px-4">
                {description}
              </p>
              <div className="mt-6 sm:mt-8">
                <Link href={buttonHref}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base sm:text-lg px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-white text-gray-900 hover:bg-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[44px]"
                  >
                    {defaultButtonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


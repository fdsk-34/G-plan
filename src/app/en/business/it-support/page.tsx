"use client"

import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import { Code, Database, Globe, TrendingUp, Shield, Users, Clock } from "lucide-react"
import { PageHeroSection } from "@/components/sections/page-hero-section"
import { ServiceCard } from "@/components/sections/service-card"
import { FeatureCard } from "@/components/sections/feature-card"
import { CTASection } from "@/components/sections/cta-section"
import { SectionHeader } from "@/components/sections/section-header"
import { getImagePaths } from "@/lib/image-paths"
import { useT } from "@/components/i18n/use-t"
import { useEffect } from "react"

export default function EnITSupportPage() {
  const { t, setLang, lang } = useT()
  const imagePaths = getImagePaths(lang)
  
  useEffect(() => {
    setLang('en')
  }, [setLang])
  
  return (
    <div className="min-h-screen bg-white">
      <main>
        <PageHeroSection
          icon={Code}
          title={t("pages.itSupport.title")}
          description={
            <>
              {String(t("pages.itSupport.subtitle")).split('\n').map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i < t("pages.itSupport.subtitle").split('\n').length - 1 && <br className="hidden sm:block" />}
                </span>
              ))}
            </>
          }
        />

        <section className="py-12 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <SectionHeader title={t("pages.itSupport.servicesTitle")} />

              <div className="space-y-6 sm:space-y-8">
                <ServiceCard
                  icon={Database}
                  title={t("pages.itSupport.coreSystemsTitle")}
                  description={t("pages.itSupport.coreSystemsDescription")}
                />
                <ServiceCard
                  icon={Code}
                  title={t("pages.itSupport.integrationTitle")}
                  description={t("pages.itSupport.integrationDescription")}
                />
                <ServiceCard
                  icon={Globe}
                  title={t("pages.itSupport.websiteTitle")}
                  description={t("pages.itSupport.websiteDescription")}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <SectionHeader
                title={t("pages.itSupport.rpaTitle")}
                description={t("pages.itSupport.rpaDescription")}
              />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <SectionHeader title={t("pages.itSupport.featuresTitle")} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <FeatureCard
                  icon={TrendingUp}
                  text={t("pages.itSupport.features.feature1")}
                />
                <FeatureCard
                  icon={Shield}
                  text={t("pages.itSupport.features.feature2")}
                />
                <FeatureCard
                  icon={Users}
                  text={t("pages.itSupport.features.feature3")}
                />
                <FeatureCard
                  icon={Clock}
                  text={t("pages.itSupport.features.feature4")}
                />
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title={t("pages.itSupport.ctaTitle")}
          description={t("pages.itSupport.ctaDescription")}
        />
      </main>
      <Footer />
      <TopButton />
    </div>
  )
}
